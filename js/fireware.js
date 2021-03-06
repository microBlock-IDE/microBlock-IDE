let uf2MountPath = "";

let firewareUpgradeFlow = async () => {
    let board = boards.find(board => board.id === boardId);
    
    $("#firmware-version-select").html("");
    for (let index in board.firmware) {
        $("#firmware-version-select").append(`<option value="${index}">${board.firmware[index].name}</option>`);
    }

    if (board.chip && board.chip === "RP2") {
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
    const chipId = (board.chip && board.chip) || "ESP32";

    let fwIndex = +$("#firmware-version-select").val();
    let fwPath = board.firmware[fwIndex].path;
    fwPath = fwPath.startsWith("/") ? sharedObj.rootPath + fwPath : `${sharedObj.rootPath}/boards/${boardId}/${fwPath}`;
    fwPath = path.normalize(fwPath);
    
    if (chipId === "ESP32") { // ESP32
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
            "--flash_freq",  "80m",
            "--flash_size",  "detect",
            "0x1000", fwPath
        ];
        // console.log(arg);
        
        let esptool = spawn(esptoolPath, arg);

        esptool.stdout.on("data", (data) => {
            console.log("stdout:", data.toString());

            let line = data.toString();
            line = line.substring(line.lastIndexOf("\n"));
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
    } else if (chipId === "RP2") {
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
