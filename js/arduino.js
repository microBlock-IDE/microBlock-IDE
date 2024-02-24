// Arduino Board Manager
const arduin_cli_name = {
    darwin: "arduino-cli",
    linux: "arduino-cli-ubuntu-x64",
    win32: "arduino-cli.exe"
};
if (typeof path === "undefined") { // non electron handle
    path = null;
}
const isInstalledVersion = (sharedObj?.rootPath?.indexOf("\\AppData\\Local") > 0) || false;
const USERDATA_PATH = (os?.platform() === "win32" && isInstalledVersion) ? remote?.app?.getPath('userData') : path?.normalize(sharedObj.rootPath + "/..");

const ARDUINO_HOME_PATH = isInstalledVersion ? USERDATA_PATH : path?.normalize(USERDATA_PATH + "/Arduino");
const ARDUINO_DATA_PATH = ARDUINO_HOME_PATH;
const ARDUINO_DOWNLOAD_PATH = path?.normalize(ARDUINO_HOME_PATH + "/staging");
const ARDUINO_USER_PATH = path?.normalize(ARDUINO_HOME_PATH + "/user");

const ARDUINO_SKETCH_PATH = path?.normalize(ARDUINO_HOME_PATH + "/sketch");

const ARDUINO_CLI_PATH = path?.normalize(sharedObj.rootPath + "/../bin/arduino-cli/" + arduin_cli_name[os.platform()]) || null;
const ARDUINO_CONFIG_FILE = isInstalledVersion ? path?.normalize(USERDATA_PATH + "/settings.yaml") : path?.normalize(sharedObj.rootPath + "/../bin/arduino-cli/settings.yaml") || null;
const ARDUINO_CLI_OPTION = `--config-file "${ARDUINO_CONFIG_FILE}"`;

const arduino_dir_init = (additional_urls) => {
    const fs = nodeFS;
    for (const directoryPath of [ ARDUINO_HOME_PATH, ARDUINO_DATA_PATH, ARDUINO_DOWNLOAD_PATH, ARDUINO_USER_PATH]) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    // Write new configs file
    nodeFS?.writeFileSync(ARDUINO_CONFIG_FILE, 
`directories:
  data: ${JSON.stringify(ARDUINO_DATA_PATH)}
  downloads: ${JSON.stringify(ARDUINO_DOWNLOAD_PATH)}
  user: ${JSON.stringify(ARDUINO_USER_PATH)}
board_manager:
  additional_urls: ${JSON.stringify(additional_urls || "")}
updater:
  enable_notification: false
`, err => {
        if (err) {
            console.error("write ardunio configs fail", err);
        }
    });
}

let arduino_is_busy = false;
function arduino_busy(is_busy) {
    arduino_is_busy = is_busy;
}

const runGetOutput = async cmd => {
    console.log(cmd);
    arduinoConsoleTerm.writeln(cmd);
    /*const { stdout, stderr } = await execAsync(cmd);
    console.log(stdout);
    arduinoConsoleTerm.writeln(stdout.replace(/\n/g, "\r\n"));
    */
    return new Promise((resolve, reject) => {
        const proc = spawn(cmd, [], { shell: true });

        let stdout = "", stderr = "";
        proc.stdout.on("data", data => {
            console.log("stdout:", data.toString());
            arduinoConsoleTerm.write(data.toString());
            stdout += data.toString();
        });

        proc.stderr.on("data", data => {
            console.warn("stderr:", data.toString());
            arduinoConsoleTerm.write(data.toString());
            stderr += data.toString();
        });

        proc.on("exit", code => {
            console.log("arduino-cli error code", code);
            if (code == 0) {
                let out_json = {};
                if (cmd.indexOf("--format json") >= 0) {
                    try {
                        out_json = JSON.parse(stdout);
                    } catch(e) {
                        console.warn("parse json fail", stdout);
                    }
                }
                resolve({ stdout, stderr, out_json });
            } else {
                reject({ stdout, stderr });
            }
        });
    });
};

async function arduino_board_init() {
    arduino_busy(true);

    const { fqbn, platform, depends } = boards.find(board => board.id === boardId);

    arduino_dir_init(platform?.package_index || "");

    const updateBoardIndex = async () => {
        statusLog(`Updating board index`);
        try {
            await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} core update-index`); // update board index
        } catch(e) {
            NotifyW("Update board index fail");
            statusLog(`Update board index fail`);
            console.warn(e);
        }
    }

    const checkBoardAreInstalled = async () => {
        statusLog(`Checking board`);
        const { out_json } = await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} board listall ${fqbn} --format jsonmini`);
        return out_json?.boards?.findIndex(list => list?.fqbn === fqbn) >= 0;
    }

    if (!(await checkBoardAreInstalled())) { // check board are installed
        await updateBoardIndex();

        if (!(await checkBoardAreInstalled())) { // check board are installed (after update board index)
            console.log(`not found board are ${fqbn} install so install/update platform`);
            
            const platform_id = platform.id;

            // check platform are installed
            statusLog(`Checking platform ${platform_id}`);
            const { out_json } = await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} core list --format jsonmini`);
            // console.log(out_json);
            if (out_json?.findIndex(list => list?.id === platform_id) >= 0) { // found in install list
                statusLog(`Updating platform ${platform_id}`);
                // console.log(`platform ${platform_id} installed but board not found so update platform`);
                await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} core upgrade ${platform_id}`);
                statusLog(`Update platform ${platform_id} done`);
            } else { // not found in install list
                statusLog(`Installing platform ${platform_id}`);
                // console.log(`platform ${platform_id} not install so install platform`);
                await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} core install ${platform_id}`);
                statusLog(`Install platform ${platform_id} done`);
            }
        }
    }
    
    if (Array.isArray(depends) && depends.length > 0) {
        await arduino_check_and_install_library(depends);
    }

    statusLog(`Ready to upload !`);

    arduino_busy(false);
}

let updated_lib_index = false;

async function arduino_check_and_install_library(depends) {
    if (!Array.isArray(depends)) {
        return;
    }

    const installed_list = (await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} lib list --format jsonmini`)).out_json.map(a => a.library).map(a => a.name + "@" + a.version);
    // console.log("lib installed list", installed_list);

    const to_install_list = depends.filter(a => installed_list.indexOf(a) < 0);
    // console.log("lib todo install", to_install_list);

    if ((to_install_list.length > 0) && (!updated_lib_index)) { // Update lib index
        statusLog(`Update library index`);
        try {
            await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} lib update-index`);
            updated_lib_index = true;
        } catch (e) {
            NotifyW("Update library index fail");
            statusLog(`Update library index fail`);
            console.warn(e);
        }
        statusLog(`Updated library index`);
    }

    for (const lib_name of to_install_list) {
        // Install lib
        statusLog(`Installing ${lib_name}`);
        try {
            await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} lib install \"${lib_name}\"`);
        } catch(e) {
            NotifyW(`Install library ${lib_name} fail`);
            statusLog(`Install library index fail`);
            console.warn(e);
        }
        statusLog(`Installed ${lib_name}`);
    }
}

async function arduino_upload(code) {
    if (arduino_is_busy) {
        throw "Arduino init now, wait finish at soon~"
    }

    const { skipSerialPortSelect } = boards.find(board => board.id === boardId);

    let portName = serialPort?.path || null;
    if (!portName && !skipSerialPortSelect) {
        try {
            portName = await showPortSelect();
        } catch(e) {
            NotifyE("You not select port");
            console.log(e);
            throw "You not select port";
        }
    }

    // Make sketch
    const fs = nodeFS;
	
    // Remove old sketch and make again
    const deleteFolderRecursive = function (directoryPath) {
        if (fs.existsSync(directoryPath)) {
            fs.readdirSync(directoryPath).forEach((file, index) => {
                const curPath = path.join(directoryPath, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                    // recurse
                    deleteFolderRecursive(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(directoryPath);
        }
    };
    deleteFolderRecursive(ARDUINO_SKETCH_PATH);
    fs.mkdirSync(ARDUINO_SKETCH_PATH, { recursive: true });

    // write .ino file
    fs.writeFileSync(path.normalize(ARDUINO_SKETCH_PATH + "/sketch.ino"), code, {
      encoding: "utf8",
    });

    const { fqbn, board_option } = boards.find(board => board.id === boardId);

    // Disconnect Serial port
    const beforeAutoConnectFlag = autoConnectFlag;
    if (serialPort) {
        autoConnectFlag = false;
        serialPort.close();
        serialPort = null;
    }

    // Build
    statusLog(`Building`);
    await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} compile -b ${fqbn}${(board_option && ` --board-options "${board_option}"`) || ""} "${ARDUINO_SKETCH_PATH}" -v`);

    // Upload
    statusLog(`Uploading`);
    try {
        await runGetOutput(`"${ARDUINO_CLI_PATH}" ${ARDUINO_CLI_OPTION} upload -b ${fqbn} -p ${portName}${(board_option && ` --board-options "${board_option}"`) || ""} "${ARDUINO_SKETCH_PATH}" -v`);
    } catch(e) {
        throw e;
    } finally {
        // Connact Serial again
        autoConnectFlag = beforeAutoConnectFlag;
        autoConnectCheck();
    }
}
