// Arduino Board Manager
const arduin_cli_name = {
    darwin: "arduino-cli",
    linux: "arduino-cli-ubuntu-x64",
    win32: "arduino-cli.exe"
};
const ARDUINO_CLI_PATH = path.normalize(sharedObj.rootPath + "/../bin/arduino-cli/" + arduin_cli_name[os.platform()]);
const ARDUINO_CONFIG_FILE = path.normalize(sharedObj.rootPath + "/../bin/arduino-cli/settings.yaml");
const ARDUINO_CLI_OPTION = `--config-file "${ARDUINO_CONFIG_FILE}"`;

let arduino_is_busy = false;
function arduino_busy(is_busy) {
    arduino_is_busy = is_busy;
}

async function arduino_board_init() {
    arduino_busy(true);

    const { fqbn, platform, depends } = boards.find(board => board.id === boardId);

    const runGetOutput = async cmd => {
        console.log(cmd);
        arduinInitTerm.writeln(cmd);
        /*const { stdout, stderr } = await execAsync(cmd);
        console.log(stdout);
        arduinInitTerm.writeln(stdout.replace(/\n/g, "\r\n"));
        */
        return new Promise((resolve, reject) => {
            const proc = spawn(cmd, [], { shell: true });

            let stdout = "", stderr = "";
            proc.stdout.on("data", data => {
                console.log("stdout:", data.toString());
                arduinInitTerm.write(data.toString().replace(/\n/g, "\r\n"));
                stdout += data.toString();
            });

            proc.stderr.on("data", data => {
                console.warn("stderr:", data.toString());
                arduinInitTerm.write(data.toString().replace(/\n/g, "\r\n"));
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

    statusLog(`Update board index...`);
    try {
        await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} core update-index`); // update board index
    } catch(e) {
        NotifyW("Update board index fail");
        statusLog(`Update board index fail`);
        console.warn(e);
    }

    { // check board are installed
        statusLog(`Check board are install...`);
        const { out_json } = await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} board listall ${fqbn} --format jsonmini`);
        // if (stdout.indexOf(fqbn) > 0) {
        if (out_json?.boards?.findIndex(list => list?.fqbn === fqbn) >= 0) {
            statusLog(`Ready to upload !`);
            console.log(`board ${fqbn} installed, skip install platform`);
        } else {
            console.log(`not found board are ${fqbn} install so install/update platform`);
            
            const platform_id = platform.id;

            // check platform are installed
            statusLog(`Check platform ${platform_id} are install...`);
            const { out_json } = await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} core list --format jsonmini`);
            console.log(out_json);
            if (out_json?.findIndex(list => list?.id === platform_id) >= 0) { // found in install list
                statusLog(`Updating platform ${platform_id}...`);
                console.log(`platform ${platform_id} installed but board not found so update platform`);
                const { stdout, stderr } = await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} core upgrade ${platform_id}`);
                statusLog(`Update platform ${platform_id} done`);
            } else { // not found in install list
                statusLog(`Installing platform ${platform_id}...`);
                console.log(`platform ${platform_id} not install so install platform`);
                const { stdout, stderr } = await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} core install ${platform_id}`);
                statusLog(`Install platform ${platform_id} done`);
            }
        }
    }

    // Update lib index
    statusLog(`Update library index...`);
    try {
        await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} lib update-index`);
    } catch(e) {
        NotifyW("Update library index fail");
        statusLog(`Update library index fail`);
        console.warn(e);
    }

    if (depends) {
        await arduino_check_and_install_library(depends);
    }

    arduino_busy(false);
}

async function arduino_check_and_install_library(depends) {
    if (!Array.isArray(depends)) {
        return;
    }

    const runGetOutput = async cmd => {
        console.log(cmd);
        arduinInitTerm.writeln(cmd);
        /*const { stdout, stderr } = await execAsync(cmd);
        console.log(stdout);
        arduinInitTerm.writeln(stdout.replace(/\n/g, "\r\n"));
        */
        return new Promise((resolve, reject) => {
            const proc = spawn(cmd, [], { shell: true });

            let stdout = "", stderr = "";
            proc.stdout.on("data", data => {
                console.log("stdout:", data.toString());
                arduinInitTerm.write(data.toString().replace(/\n/g, "\r\n"));
                stdout += data.toString();
            });

            proc.stderr.on("data", data => {
                console.warn("stderr:", data.toString());
                arduinInitTerm.write(data.toString().replace(/\n/g, "\r\n"));
                stderr += data.toString();
            });

            proc.on("exit", code => {
                console.log("arduino-cli error code", code);
                if (code == 0) {
                    let out_json = {};
                    try {
                        out_json = JSON.parse(stdout);
                    } catch(e) {

                    }
                    resolve({ stdout, stderr, out_json });
                } else {
                    reject({ stdout, stderr });
                }
            });
        });
    };

    for (const lib_name of depends) {
        const [ name, version ] = lib_name.split("@");
        const { out_json } = await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} lib list "${name}" --format jsonmini`);
        if ((out_json.length == 0) || (out_json?.[0]?.library?.version !== version)) { // Check version
            // Install lib
            statusLog(`Install ${lib_name}...`);
            try {
                await runGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} lib install \"${lib_name}\"`);
            } catch(e) {
                NotifyW(`Update library ${lib_name} fail`);
                statusLog(`Update library index fail`);
                console.warn(e);
            }
        }
    }
}

async function arduino_upload(code) {
    if (arduino_is_busy) {
        throw "Arduino init now, wait finish at soon~"
    }

    let portName = serialPort?.path || null;
    if (!portName) {
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
    const sketch_dir = path.normalize(sharedObj.rootPath + "/../sketch");

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
    deleteFolderRecursive(sketch_dir);
    fs.mkdirSync(sketch_dir, { recursive: true });

    // write .ino file
    fs.writeFileSync(path.normalize(sketch_dir + "/sketch.ino"), code, {
      encoding: "utf8",
    });

    const { fqbn } = boards.find(board => board.id === boardId);

    const runAndGetOutput = async cmd => (new Promise((resolve, reject) => {
        uploadTerm.writeln(cmd);
        const proc = spawn(cmd, [], { shell: true });

        proc.stdout.on("data", data => {
            console.log("stdout:", data.toString());
            // $("#upload-console-log").append(`<span>${data.toString()}</span>`);
            uploadTerm.write(data.toString().replace(/\n/g, "\r\n"));
        });

        proc.stderr.on("data", data => {
            console.warn("stderr:", data.toString());
            // $("#upload-console-log").append(`<span class="e">${data.toString()}</span>`);
            uploadTerm.write(data.toString().replace(/\n/g, "\r\n"));
        });

        proc.on("exit", code => {
            console.log("arduino-cli error code", code);
            if (code == 0) {
                resolve();
            } else {
                reject();
            }
        });
    }));

    // Build
    statusLog(`Building...`);
    await runAndGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} compile -b ${fqbn} "${sketch_dir}" -v`);

    // Disconnect Serial port
    const beforeAutoConnectFlag = autoConnectFlag;
    if (serialPort) {
        autoConnectFlag = false;
        serialPort.close();
        serialPort = null;
    }

    // Upload
    statusLog(`Uploading`);
    try {
        await runAndGetOutput(`${ARDUINO_CLI_PATH} ${ARDUINO_CLI_OPTION} upload -b ${fqbn} -p ${portName} "${sketch_dir}" -v`);
    } catch(e) {
        throw e;
    } finally {
        // Connact Serial again
        autoConnectFlag = beforeAutoConnectFlag;
        autoConnectCheck();
    }
}
