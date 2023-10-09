// Arduino Board Manager
const arduin_cli_name = {
    darwin: "arduino-cli",
    linux: "arduino-cli-ubuntu-x64",
    win32: "arduino-cli.exe"
};
const ARDUINO_CLI_PATH = path.normalize(sharedObj.rootPath + "/../bin/arduino-cli/" + arduin_cli_name[os.platform()]);

async function arduino_board_init() {
    const { fqbn, platform } = boards.find(board => board.id === boardId);

    { // update board index
        const { stdout, stderr } = await execAsync(`${ARDUINO_CLI_PATH} core update-index`);
        console.log(stdout);
    }

    { // check board are installed
        const { stdout, stderr } = await execAsync(`${ARDUINO_CLI_PATH} board listall ${fqbn}`);
        if (stdout.indexOf(fqbn) > 0) {
            console.log(`board ${fqbn} installed, skip install platform`);
        } else {
            console.log(`not found board are ${fqbn} install so install/update platform`);
            
            const platform_id = platform.id;

            // check platform are installed
            const { stdout, stderr } = await execAsync(`${ARDUINO_CLI_PATH} core list ${platform_id}`);
            if (stdout.indexOf(platform_id) > 0) { // found in install list
                console.log(`platform ${platform_id} installed but board not found so update platform`);
                const { stdout, stderr } = await execAsync(`${ARDUINO_CLI_PATH} core upgrade ${platform_id}`);
            } else { // not found in install list
                console.log(`platform ${platform_id} not install so install platform`);
                const { stdout, stderr } = await execAsync(`${ARDUINO_CLI_PATH} core install ${platform_id}`);
            }
        }
    }
}
