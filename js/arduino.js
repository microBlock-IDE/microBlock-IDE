// Arduino Board Manager
const arduin_cli_name = {
    darwin: "arduino-cli",
    linux: "arduino-cli-ubuntu-x64",
    win32: "arduino-cli.exe"
};
const ARDUINO_CLI_PATH = path.normalize(sharedObj.rootPath + "/../bin/arduino-cli/" + arduin_cli_name[os.platform()]);

let arduino_is_busy = false;
function arduino_busy(is_busy) {
    arduino_is_busy = is_busy;
}

async function arduino_board_init() {
    arduino_busy(true);

    const { fqbn, platform } = boards.find(board => board.id === boardId);

    const runGetOutput = async cmd => {
        console.log(cmd);
        arduinInitTerm.writeln(cmd);
        /*const { stdout, stderr } = await execAsync(cmd);
        console.log(stdout);
        arduinInitTerm.writeln(stdout.replace(/\n/g, "\r\n"));
        */
        const { stdout, stderr } = await (new Promise((resolve, reject) => {
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
                    resolve({ stdout, stderr });
                } else {
                    reject({ stdout, stderr });
                }
            });
        }));

        return { stdout, stderr };
    };

    statusLog(`Update board index...`);
    await runGetOutput(`${ARDUINO_CLI_PATH} core update-index`); // update board index

    { // check board are installed
        statusLog(`Check board are install...`);
        const { stdout, stderr } = await runGetOutput(`${ARDUINO_CLI_PATH} board listall ${fqbn}`);
        if (stdout.indexOf(fqbn) > 0) {
            statusLog(`Ready to upload !`);
            console.log(`board ${fqbn} installed, skip install platform`);
        } else {
            console.log(`not found board are ${fqbn} install so install/update platform`);
            
            const platform_id = platform.id;

            // check platform are installed
            statusLog(`Check platform ${platform_id} are install...`);
            const { stdout, stderr } = await runGetOutput(`${ARDUINO_CLI_PATH} core list`);
            if (stdout.indexOf(platform_id) > 0) { // found in install list
                statusLog(`Updating platform ${platform_id}...`);
                console.log(`platform ${platform_id} installed but board not found so update platform`);
                const { stdout, stderr } = await runGetOutput(`${ARDUINO_CLI_PATH} core upgrade ${platform_id}`);
                statusLog(`Update platform ${platform_id} done`);
            } else { // not found in install list
                statusLog(`Installing platform ${platform_id}...`);
                console.log(`platform ${platform_id} not install so install platform`);
                const { stdout, stderr } = await runGetOutput(`${ARDUINO_CLI_PATH} core install ${platform_id}`);
                statusLog(`Install platform ${platform_id} done`);
            }
        }
    }

    arduino_busy(false);
}

async function arduino_upload(code) {
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

    // Build
    statusLog(`Building...`);
    await (new Promise((resolve, reject) => {
        const proc = spawn(`${ARDUINO_CLI_PATH} compile -b ${fqbn} "${sketch_dir}" -v`, [], { shell: true });

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

    // Disconnect Serial port
    const beforeAutoConnectFlag = autoConnectFlag;
    if (serialPort) {
        autoConnectFlag = false;
        serialPort.close();
        serialPort = null;
    }

    // Upload
    statusLog(`Uploading...`);
    try {
        await (new Promise((resolve, reject) => {
            const proc = spawn(`${ARDUINO_CLI_PATH} upload -b ${fqbn} -p ${portName} "${sketch_dir}" -v`, [], { shell: true });

            proc.stdout.on("data", data => {
                console.log("stdout:", data.toString());
                // $("#upload-console-log").append(`<span>${data.toString()}</span>`);
                uploadTerm.write(data.toString());
            });
    
            proc.stderr.on("data", data => {
                console.warn("stderr:", data.toString());
                // $("#upload-console-log").append(`<span class="e">${data.toString()}</span>`);
                uploadTerm.write(data.toString());
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
    } catch(e) {
        throw e;
    } finally {
        // Connact Serial again
        autoConnectFlag = beforeAutoConnectFlag;
        autoConnectCheck();
    }
}
