
let firewareUpgradeFlow = async () => {
    let board = boards.find(board => board.id === boardId);
    
    $("#firmware-version-select").html("");
    for (let index in board.firmware) {
        $("#firmware-version-select").append(`<option value="${index}">${board.firmware[index].name}</option>`);
    }

    $("#firmware-upgrade-dialog article").hide();
    $("#firmware-upgrade-dialog article.todo").show();
    $("#firmware-upgrade-dialog").show();
};

$("#install-firmware-button").click(async () => {
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

    $("#firmware-upgrade-dialog article.todo").hide();
    $("#firmware-upgrade-dialog  .progress-box > .back-drop").width(0);
    $("#firmware-upgrade-dialog article.doing").show();

    $("#firmware-upgrade-dialog .close-btn").hide();

    let board = boards.find(board => board.id === boardId);
    let fwIndex = +$("#firmware-version-select").val();
    let fwPath = board.firmware[fwIndex].path;
    fwPath = fwPath.startsWith("/") ? sharedObj.rootPath + fwPath : `${sharedObj.rootPath}/boards/${boardId}/${fwPath}`;
    fwPath = path.normalize(fwPath);

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
