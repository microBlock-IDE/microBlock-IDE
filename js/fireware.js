let uf2MountPath = "";
let firmwareUpdateMode = false;
let windowFirewareUpdate = null;

let firewareUpgradeFlow = async () => {
    let board = boards.find(board => board.id === boardId);
    
    $("#firmware-version-select").html(board.firmware.map((a, index) => `<option value="${index}">${a.name}</option>`));

    if ((!isElectron) && (board?.chip === "ESP32")) {
        const w = 600, h = 460;
        const y = (window.top.outerHeight / 2) + window.top.screenY - (h / 2);
        const x = (window.top.outerWidth / 2) + window.top.screenX - (w / 2);
        windowFirewareUpdate = window.open(
            "/firmware.html?board=" + encodeURI(boardId) + "&firmware=" + encodeURI(JSON.stringify(board.firmware)),
            "Firmware Update",
            `width=600,height=500,top=${y},left=${x}`
        );
        return;
    } else {
        if (board?.chip === "RP2") {
            $("#install-firmware-button").prop("disabled", true);
            $("#firmware-upgrade-dialog .note-for-rp2").show();

            const checkRP2DriveAvailable = async () => {
                const drives = await nodeDiskInfo.getDiskInfo();
                const RP2DriveInfo = drives.find(a => a.filesystem === "Removable Disk" && a.blocks === 134066176);
                if (RP2DriveInfo) {
                    const mount = RP2DriveInfo.mounted;
                    if (nodeFS.existsSync(path.join(mount, "/INFO_UF2.TXT"))) {
                        console.log("RP2 Drive info", RP2DriveInfo);
                        uf2MountPath = mount;
                        $("#firmware-upgrade-dialog .note-for-rp2").hide();
                        $("#install-firmware-button").prop("disabled", false);
                        return;
                    }
                }

                setTimeout(checkRP2DriveAvailable, 100);
            };

            checkRP2DriveAvailable();
        } else {
            $("#install-firmware-button").prop("disabled", false);
            $("#firmware-upgrade-dialog .note-for-rp2").hide();
        }
    }

    $("#firmware-upgrade-dialog article").hide();
    $("#firmware-upgrade-dialog article.todo").show();
    $("#firmware-upgrade-dialog").show();
};

$("#install-firmware-button").click(async () => {
    $("#firmware-upgrade-dialog article.todo").hide();
    $("#firmware-upgrade-dialog  .progress-box > .back-drop").width(0);
    $("#firmware-upgrade-dialog article.doing").show();

    $("#firmware-upgrade-dialog .close-btn").hide();

    let board = boards.find(board => board.id === boardId);
    const chipId = board?.chip || "ESP32";

    let fwIndex = +$("#firmware-version-select").val();
    let fwPath = board.firmware[fwIndex].path;
    if (!isElectron) {
        fwPath = fwPath.startsWith("/") ? fwPath : `/boards/${boardId}/${fwPath}`;
    } else {
        fwPath = fwPath.startsWith("/") ? sharedObj.rootPath + fwPath : `${sharedObj.rootPath}/boards/${boardId}/${fwPath}`;
        fwPath = path.normalize(fwPath);
    }
    
    if (chipId === "ESP32") { // ESP32
        if (!isElectron) {
            let data = null;
            if (!isElectron) {
                data = await (await fetch(fwPath)).arrayBuffer();
            } else {
                data = await readFileAsync(fwPath);
            }
            console.log(typeof data, data);
            
            if (!serialPort) {
                if (!await serialConnect()) {
                    return;
                }
                await sleep(300);
            }

            const debugMsg = (...args) => {
                function getStackTrace() {
                    let stack = new Error().stack;
                    stack = stack.split("\n").map(v => v.trim());
                    for (let i = 0; i < 3; i++) {
                        stack.shift();
                    }
            
                    let trace = [];
                    for (let line of stack) {
                        line = line.replace("at ", "");
                        trace.push({
                            "func": line.substr(0, line.indexOf("(") - 1),
                            "pos": line.substring(line.indexOf(".js:") + 4, line.lastIndexOf(":"))
                        });
                    }
            
                    return trace;
                }
            
                let stack = getStackTrace();
                stack.shift();
                let top = stack.shift();
                let prefix = '[' + top.func + ":" + top.pos + '] ';
                for (let arg of args) {
                    if (typeof arg == "string") {
                        console.log(prefix + arg);
                    } else if (typeof arg == "number") {
                        console.log(prefix + arg);
                    } else if (typeof arg == "boolean") {
                        console.log(prefix + arg ? "true" : "false");
                    } else if (Array.isArray(arg)) {
                        console.log(prefix + "[" + arg.map(value => espTool.toHex(value)).join(", ") + "]");
                    } else if (typeof arg == "object" && (arg instanceof Uint8Array)) {
                        console.log(prefix + "[" + Array.from(arg).map(value => espTool.toHex(value)).join(", ") + "]");
                    } else {
                        console.log(prefix + "Unhandled type of argument:" + typeof arg);
                        console.log(arg);
                    }
                    prefix = "";  // Only show for first argument
                }
            }

            firmwareUpdateMode = true;

            const logMsg = a => {
                console.log(a);
                $("#firmware-upgrade-dialog .progress-box > .caption").text(a);
            };

            const espTool = new EspLoader({
                updateProgress: (part, percentage) => {
                    $("#firmware-upgrade-dialog  .progress-box > .back-drop").width(`${+percentage}%`);
                },
                logMsg,
                debugMsg,
                debug: true
            });

            if (writer) {
                writer.releaseLock();
                writer = null;
            }
            
            let synced = false;
            for (let i=0;i<20;i++) {
                logMsg("Enter to Bootloader...");
                if (!await espTool.connect()) { // Reset & Enter to boot mode
                    continue;
                }

                await sleep(500); // Wait ESP32 work

                try {
                    logMsg("Sync...");
                    await espTool.sync(); // Sync bootloader
                } catch(e) {
                    continue;
                }

                synced = true;
                break;
            }

            if (!synced) {
                throw "Connect fail";
            }

            console.log("Connected to", await espTool.chipName());
            console.log("MAC Address:", espTool.macAddr());

            const espToolStub = await espTool.runStub(); // Upload and run Stub

            // await espToolStub.setBaudrate(921600);
            
            console.log("eraseFlash");
            logMsg("Erase Flash...");
            await espToolStub.eraseFlash();

            const file = board.firmware[fwIndex].path;
            console.log("flashData", file);
            
            await espToolStub.flashData(data, 0x1000, file);

            console.log("disconnect");
            await espTool.disconnect(); // Reset & exit boot mode

            espTool.setPortBaudRate(115200);

            writer = serialPort.writable.getWriter();
            firmwareUpdateMode = false;

            const code = 0;

            $("#firmware-upgrade-dialog article.done .icon").hide();
            if (code === 0) {
                $("#firmware-upgrade-dialog article.done .icon.success").show();
                $("#firmware-upgrade-status").text("Firmware Upgrade Successful");
                $("#firmware-upgrade-dialog .upload-btn").show();
            } else {
                $("#firmware-upgrade-dialog article.done .icon.fail").show();
                $("#firmware-upgrade-status").text("Firmware Upgrade Fail with code " + code);
                $("#firmware-upgrade-dialog .upload-btn").hide();
            }

            $("#firmware-upgrade-dialog article.doing").hide();
            $("#firmware-upgrade-dialog article.done").show();

            $("#firmware-upgrade-dialog .close-btn").show();
        } else {
            let comPort;
            if (serialPort) {
                comPort = serialPort.path;
                beforeAutoConnectFlag = autoConnectFlag;
                autoConnectFlag = false;
                serialPort.close();
            } else {
                try {
                    console.log("Show");
                    comPort = await showPortSelect();
                    console.log(comPort);
                } catch(e) {
                    return;
                }
            }

            let esptoolName = {
                darwin: "esptool",
                linux: "esptool-ubuntu-x64",
                win32: "esptool.exe"
            };
            let esptoolPath = path.normalize(sharedObj.rootPath + "/../bin/esptool/" + esptoolName[os.platform()]);
            let arg = [
                "--chip",        "esp32",
                "--port",        comPort,
                "--baud",        "115200",
                "write_flash",
                "--compress",
                "--erase-all",
                "--flash_mode",  "dio",
                "--flash_freq",  "40m",
                "--flash_size",  "detect",
                "0x1000", fwPath
            ];
            // console.log(arg);
            
            let esptool = spawn(esptoolPath, arg);

            esptool.stdout.on("data", (data) => {
                console.log("stdout:", data.toString());

                let line = data.toString();
                line = line.substring(line.lastIndexOf(os.platform() !== "darwin" ? "\n" : "\r"));
                line = line.trim();

                $("#firmware-upgrade-dialog .progress-box > .caption").text(line);
                
                let percent = /\((\d+)\s?%\)$/.exec(line);
                if (percent) {
                    $("#firmware-upgrade-dialog  .progress-box > .back-drop").width(`${+percent[1]}%`);
                }
            });
            
            esptool.stderr.on("data", (data) => {
                console.log("stderr:", data.toString());
            });
            
            esptool.on("exit", (code) => {
                console.warn("esptool error code", code);

                $("#firmware-upgrade-dialog article.done .icon").hide();
                if (code === 0) {
                    $("#firmware-upgrade-dialog article.done .icon.success").show();
                    $("#firmware-upgrade-status").text("Firmware Upgrade Successful");
                    $("#firmware-upgrade-dialog .upload-btn").show();
                } else {
                    $("#firmware-upgrade-dialog article.done .icon.fail").show();
                    $("#firmware-upgrade-status").text("Firmware Upgrade Fail with code " + code);
                    $("#firmware-upgrade-dialog .upload-btn").hide();
                }

                $("#firmware-upgrade-dialog article.doing").hide();
                $("#firmware-upgrade-dialog article.done").show();

                $("#firmware-upgrade-dialog .close-btn").show();

                if (code === 0) {
                    serialConnectElectron(comPort);
                }
            });
        }
    } else if (chipId === "RP2") {
        //if (!isElectron) {
            ((uri, name) => {
                var link = document.createElement("a");
                // If you don't know the name or want to use
                // the webserver default set name = ''
                link.setAttribute('download', name);
                link.href = uri;
                document.body.appendChild(link);
                link.click();
                link.remove();
            })(fwPath, "firmware.uf2");

            $("#firmware-upgrade-dialog article.done .icon").hide();
            $("#firmware-upgrade-dialog article.done .icon.success").show();
            $("#firmware-upgrade-status").text("Firmware Upgrade Successful");
            $("#firmware-upgrade-dialog .upload-btn").show();

            $("#firmware-upgrade-dialog article.doing").hide();
            $("#firmware-upgrade-dialog article.done").show();

            $("#firmware-upgrade-dialog .close-btn").show();
/*        } else {
            const sourceFile = fwPath;
            const destFile = path.join(uf2MountPath, "/firmware.uf2");

            nodeFS.stat(sourceFile, function(err, stat){
                const filesize = stat.size
                let bytesCopied = 0
            
                const readStream = nodeFS.createReadStream(sourceFile)
            
                readStream.on('data', function(buffer){
                bytesCopied += buffer.length;
                const porcentage = ((bytesCopied/filesize)*100).toFixed(2);

                $("#firmware-upgrade-dialog .progress-box > .caption").text(`${porcentage}% (${bytesCopied} / ${filesize})`);
                $("#firmware-upgrade-dialog  .progress-box > .back-drop").width(`${porcentage}%`);
                });

                readStream.on('end', function(){
                    $("#firmware-upgrade-dialog article.done .icon").hide();
                    $("#firmware-upgrade-dialog article.done .icon.success").show();
                    $("#firmware-upgrade-status").text("Firmware Upgrade Successful");
                    $("#firmware-upgrade-dialog .upload-btn").show();

                    $("#firmware-upgrade-dialog article.doing").hide();
                    $("#firmware-upgrade-dialog article.done").show();

                    $("#firmware-upgrade-dialog .close-btn").show();
                });

                readStream.pipe(nodeFS.createWriteStream(destFile));
            });
        }*/
    }
});

$("#firmware-upgrade-dialog .upload-btn").click(() => {
    $("#upload-program").click();
    $("#firmware-upgrade-dialog .close-btn").click();
});

$("#firmware-upgrade-dialog .close-btn").click(() => $("#firmware-upgrade-dialog").hide());

let skipFirmwareUpgrade = false;
$("#continue-upload").click(() => {
    skipFirmwareUpgrade = true;
    $("#firmware-upgrade-dialog .close-btn").click();
    $("#upload-program").click();
});

// setTimeout(() => firewareUpgradeFlow(), 500);
