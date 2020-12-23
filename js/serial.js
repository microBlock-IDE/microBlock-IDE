let serialPort = null;

let writer = null, reader = null;

let loopReadFlag = false;

let serialLastData = "";

let RawREPLMode = false;

let microPythonIsReadyNextCommand = () => serialLastData.endsWith((!RawREPLMode) ? ">>> " : ">");
let waitMicroPythonIsReadyNextCommand = async (timeout) => {
    while (timeout > 0) {
        if (microPythonIsReadyNextCommand()) {
            return true;
        } else {
            await sleep(100);
            timeout -= 100;
        }
    }
    return false;
}

let sendCmd = async (cmd, data) => {
    let encodeData = new TextEncoder("utf-8").encode(data);
    let content = [];
    content.push(cmd);
    if (typeof data !== "undefined") {
        content.push((encodeData.length >> 8) & 0xFF);
        content.push(encodeData.length & 0xFF);
        content = content.concat(Array.from(encodeData));
        let dataSum = 0;
        for (let index=0;index<encodeData.length;index++) {
            dataSum += encodeData[index];
            dataSum = dataSum & 0xFF;
        }
        content.push(dataSum);
    }
    await writeSerialBytes(content);
}

let uploadFileLog = { };
let serialUploadFile = async (fileName, content) => {
    if (content.length == 0) {
        content = "#No Code";
    }

    let fileMD5 = md5(content);
    if (typeof uploadFileLog[fileName] === "string") {
        if (uploadFileLog[fileName] === fileMD5) {
            // console.log(`${fileName} not change, Skip it`);
            // return;
        }
    }

    statusLog("Uploading " + fileName);

    await sendCmd(0x10, fileName);

    let errorCount = 0;
    while(errorCount < 20) {
        await sleep(50);
        // console.log(JSON.stringify(serialLastData));
        if (serialLastData.endsWith(`set path to ${fileName}\r\n`)) {
            // console.log("Open file OK!");
            serialLastData = "";
            break;
        }
        errorCount++;
    }

    if (errorCount >= 20) {
        console.error("Error, set path fail !", fileName);
        return;
    }

    errorCount = 0;
    for (const chunkContent1 of content.match(/.{1,10000}/gs)) {
        serialLastData = "";
        await sendCmd(0x11, chunkContent1);

        while(errorCount < 100) {
            await sleep(50);
            //console.log(JSON.stringify(serialLastData));
            if (serialLastData.endsWith("write end\r\n")) {
                // console.log("Open file OK!");
                serialLastData = "";
                break;
            }
            errorCount++;
        }
        if (errorCount >= 100) {
            console.error("Error, write file fail !", fileName);
            return;
        }
    }

    uploadFileLog[fileName] = fileMD5;
}

let serialConnectWeb = async () => {
    navigator.serial.ondisconnect = () => {
        NotifyW("Serial port disconnect");
        $("#port-name").text(`DISCONNECT`);
        statusLog("Serial port disconnect");
        $("#disconnect-device").hide();
        $("#connect-device").show();
        serialPort = null;
        if (dashboardIsReady) {
            dashboardWin.serialStatusUpdate("disconnect");
        }
        term.dispose();
        term = null;
    }

    try {
        serialPort = await navigator.serial.requestPort();
    } catch(e) {
        NotifyE("You not select port");
        console.log(e);
        return false;
    }

    try {
        await serialPort.open({ baudrate: 115200 });
    } catch(e) {
        if (e.toString().indexOf("required member baudRate is undefined") >= 0) { // New version of Google Chrome ?
            try {
                await serialPort.open({ baudRate: 115200 });
            } catch(e) {
                NotifyE("Can't open serial port, some program use this port ?");
                console.log(e);
                serialPort = null;
                
                return false;
            }
        } else {
            NotifyE("Can't open serial port, some program use this port ?");
            console.log(e);
            serialPort = null;
            
            return false;
        }
    }

    NotifyS("Serial port connected");
    statusLog("Serial port connected");
    $("#port-name").text(`CONNECTED`);
    if (dashboardIsReady) {
        dashboardWin.serialStatusUpdate("connected");
    }
    
    writer = serialPort.writable.getWriter();
    // reader = serialPort.readable.getReader();

    term = new Terminal();
    if (!fitAddon) fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.open($("#terminal > section")[0]);
    try {
        fitAddon.fit();
    } catch(e) {
        
    }

    serialPort.readable.pipeTo(new WritableStream({
        write(chunk) {
            for (let key of chunk) {
                // term.write(String.fromCharCode(key));
                term.write(String.fromCharCode(key));
                serialLastData += String.fromCharCode(key);
            }
            if (serialLastData.length > 50) {
                serialLastData = serialLastData.substring(serialLastData.length - 10, serialLastData.length);
            }
            if (dashboardIsReady) {
                dashboardWin.streamDataIn(chunk);
            }        
        }
    }));

    term.onData((data) => {
        writeSerial(data);
    });

    $("#disconnect-device").show();
    $("#connect-device").hide();

    return true;
}

let showPortSelect = () => {
    return (new Promise(async (resolve, reject) => {
        $("#port-list").html("");
        for (let port of (await serialAPI.list())) {
            $("#port-list").append(`<li data-port="${port.path}"><i class="fab fa-usb"></i> ${port.path} - ${port.manufacturer}</li>`);
        }

        $("#port-list > li").click(function() {
            $("#github-repository-list > li").removeClass("active");
            $(this).addClass("active");
        });

        $("#port-select-button").click(function() {
            let select_port = $("#port-list > li.active").attr("data-port");
            if (select_port) {
                resolve(select_port);
            } else {
                reject("not_select");
            }
            $("#port-select-dialog").hide();
        });  
        
        $("#port-select-dialog .close-btn").click(() => {
            reject("cancle");
            $("#port-select-dialog").hide();
        });
        
        $("#port-select-dialog").show();
    }));
}

let serialConnectElectron = async (portName = "", autoConnect = false, uploadMode = false) => {
    if (!portName) {
        try {
            portName = await showPortSelect();
        } catch(e) {
            NotifyE("You not select port");
            console.log(e);
            return false;
        }
    }

    try {
        await (new Promise((resolve, reject) => {
            serialPort = new serialAPI(portName, { baudRate: 115200 }, err => {
                if (err) reject(err);
                else resolve();
            });
        }));
    } catch(e) {
        if (!autoConnect) NotifyE("Can't open serial port, some program use this port ?");
        console.log(e);
        serialPort = null;
        
        return false;
    }

    NotifyS("Serial port connected");
    statusLog("Serial port connected");
    $("#port-name").text(`CONNECTED (${portName})`);
    if (sharedObj.dashboardWin) {
        sharedObj.dashboardWin.webContents.send("serial-status", "connected");
    }
    
    // Fixed ESP32 go to Bootloader Mode after press Reset Button
    serialPort.set({
        dtr: true,
        rts: true
    });

    serialPort.on("close", () => {
        NotifyW("Serial port disconnect");
        $("#port-name").text(`DISCONNECT`);
        $("#disconnect-device").hide();
        $("#connect-device").show();
        if (sharedObj.dashboardWin) {
            sharedObj.dashboardWin.webContents.send("serial-status", "disconnect");
        }
        serialPort = null;
        term.dispose();
        term = null;
    });

    term = new Terminal();
    if (!fitAddon) fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.open($("#terminal > section")[0]);
    try {
        fitAddon.fit();
    } catch(e) {
        
    }

    serialPort.on("data", (chunk) => {
        term.write(chunk);
        serialLastData += chunk;
        if (serialLastData.length > 300) {
            serialLastData = serialLastData.substring(serialLastData.length - 300, serialLastData.length);
        }
        if (sharedObj.dashboardWin) {
            sharedObj.dashboardWin.webContents.send("serial-data-in", chunk);
        }
    });

    term.onData((data) => {
        writeSerial(data);
    });

    $("#disconnect-device").show();
    $("#connect-device").hide();

    skipFirmwareUpgrade = false;

    return true;
}

let serialConnect = () => {
    uploadFileLog = { };
    return (!isElectron) ? serialConnectWeb() : serialConnectElectron()
};

let boardReset = () => { // Hard-reset
    return new Promise(resolve => 
        serialPort.set({ // EN = 1, BOOT = 1
            dtr: true,
            rts: true
        }, () => 
            serialPort.set({ // EN = 0, BOOT = 1
                dtr: false,
                rts: true
            }, () => 
                serialPort.set({ // EN = 1, BOOT = 1
                    dtr: true,
                    rts: true
                }, resolve)
            )
        )
    );
}

$("#upload-program").click(async function() {
    statusLog("Start Upload");

    setTimeout(() => $("#upload-program").addClass("loading"), 1);

    RawREPLMode = false;

    let code;
    if (useMode === "block") {
        code = Blockly.Python.workspaceToCode(blocklyWorkspace);
    } else if (useMode === "code") {
        code = editor.getValue();
    }
    if (!serialPort) {
        if (!await serialConnect()) {
            $("#upload-program").removeClass("loading");
            return;
        }
        await sleep(300);
    }

    console.log(code);

    let okFlag;

    t0 = (new Date()).getTime();

    serialLastData = "";
    await boardReset();
    
    okFlag = false;
    for (let i=0;i<50;i++) {
        await sleep(50);
        if (serialLastData.endsWith("wait upload\r\n")) {
            serialLastData = "";
            okFlag = true;
            break;
        }
    }

    if (!okFlag) {
        console.warn("wait upload keyword timeout, only can use old method ?");
        return;
    }

    okFlag = false;
    for (let i=0;i<30;i++) {
        serialLastData = "";
        await writeSerialBytes([ 0x1F, 0xF1, 0xFF ]); // Sync bytes
        await sleep(100);
        if (serialLastData.endsWith("upload mode\r\n")) {
            okFlag = true;
            break;
        }
    }

    if (!okFlag) {
        console.warn("Send sync bytes fail");
        return;
    }

    if (typeof skipFirmwareUpgrade === "undefined") skipFirmwareUpgrade = false;

    // Check MicroPython version
    if (boardId && !skipFirmwareUpgrade) {
        serialLastData = "";

        for (let i=0;i<30;i++) {
            serialLastData = "";
            await sendCmd(0x01);
            await sleep(50);
            if (serialLastData.endsWith("\r\n")) {
                break;
            }
        }

        let board = boards.find(board => board.id === boardId);
        let checkVersion = /^MicroPython\s+([^\s]+)\s+on\s+([0-9\-]+);\s?([^\s]+)\s+with\s+([^\s]+)$/m.exec(serialLastData);
        if (checkVersion) {
            let info = { 
                version: checkVersion[1],
                date: checkVersion[2],
                board: checkVersion[3],
                cpu: checkVersion[4]
            };
            console.log("firmware info", info);
            if (typeof board.firmware[0].version !== "undefined") {
                if (board.firmware[0].version !== info.version) {
                    if (typeof board.firmware[0].date !== "undefined") {
                        let dbFwDate = new Date(board.firmware[0].date).getTime();
                        let currentFwDate = new Date(info.date).getTime();
                        if (currentFwDate < dbFwDate) {
                            NotifyE("Upload fail: MicroPython fireware is out of date");
                            statusLog("Upload Fail");
                            $("#upload-program").removeClass("loading");
                            firewareUpgradeFlow();
                            return;
                        }
                    }
                }
            }
        } else {
            console.warn("Check version fail");
        }
    }

    
    

    let uploadModuleList = findIncludeModuleNameInCode(code);

    // console.log(uploadModuleList);

    if (uploadModuleList.length > 0) {
        for (const extensionId of fs.ls("/extension")) {
            for (const filePath of fs.walk(`/extension/${extensionId}/modules`)) {
                let fileName = filePath.replace(/^\//gm, "");
                if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
                    if (uploadModuleList.indexOf(fileName.replace(/\..+$/, "")) >= 0) {
                        await serialUploadFile(filePath.replace(/^.*[\\\/]/, ''), fs.read(`/extension/${extensionId}/modules/${fileName}`));
                    }
                }
            }
        }

        if (isElectron) {
            let extensionDir = `${rootPath}/../extension`;
            for (const extensionId of nodeFS.ls(extensionDir)) {
                for (const filePath of (await nodeFS.walk(`${extensionDir}/${extensionId}/modules`))) {
                    let fileName = path.basename(filePath);
                    if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
                        if (uploadModuleList.indexOf(fileName.replace(/\..+$/, "")) >= 0) {
                            await serialUploadFile(filePath.replace(/^.*[\\\/]/, ''), (await readFileAsync(filePath)).toString());
                        }
                    }
                }
            }
        }
    }

    await serialUploadFile("main.py", code);

    serialLastData = "";
    await sendCmd(0xFF);

    okFlag = false;
    for (let i=0;i<50;i++) {
        await sleep(50);
        if (serialLastData.indexOf("exit upload mode\r\n") >= 0) {
            okFlag = true;
            break;
        }
    }

    if (!okFlag) {
        console.warn("exit upload mode fail");
    }

    timeDiff = (new Date()).getTime() - t0;
    console.log("Time:", timeDiff, "ms");

    $("#upload-program").removeClass("loading");

    NotifyS("Upload Successful");
    statusLog(`Upload successful with ${timeDiff} mS`);
});

async function writeSerial(text) {
    if (!isElectron) {
        data = new TextEncoder("utf-8").encode(text);
        buff = new ArrayBuffer(data.length);
        view = new Uint8Array(buff);
        view.set(data);
        await writer.write(buff);
    } else {
        let buff = Buffer.from(text, 'binary');
        console.log(buff);
        t1 = (new Date()).getTime();
        await new Promise(resolve => {
            console.log("Write", serialPort.write(buff, () => {
                console.log("Write OK", (new Date()).getTime() - t1);
                resolve();
            }));
        });
    }
    // console.log(buff);
}

let writeSerialNewLine = (text) => writeSerial(text + ((!RawREPLMode) ? "\r\n" : "\4"));

async function writeSerialByte(data) {
    if (!isElectron) {
        buff = new ArrayBuffer(1);
        view = new Uint8Array(buff);
        view[0] = data;
        await writer.write(buff);
    } else {
        let b = Buffer.from([ data ]);
        console.log(b);
        await (new Promise(resolve => serialPort.write(Buffer.from(b), resolve)));
    }
    // console.log(buff);
}

async function writeSerialBytes(data) {
    if (!isElectron) {
        buff = new ArrayBuffer(data.length);
        view = new Uint8Array(buff);
        for (let i;i<data.length;i++) {
            view[i] = data[i];
        }
        await writer.write(buff);
    } else {
        let b = Buffer.from(data);
        console.log(b);
        await new Promise(resolve => serialPort.write(b, resolve));
    }
    // console.log(buff);
}

let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

let moduleBuiltIn = [
    "framebuf", "ucryptolib", "urandom",
    "_boot", "gc", "uctypes", "ure",
    "_onewire", "inisetup", "uerrno",
    "_thread", "machine", "uhashlib", "uselect",
    "_webrepl", "math", "uhashlib", "usocket",
    "apa106", "micropython", "uheapq", "ussl",
    "btree", "neopixel", "uio", "ustruct",
    "builtins", "network", "ujson", "utime",
    "cmath", "ntptime", "umqtt/robust", "utimeq",
    "dht", "onewire", "umqtt/simple", "uwebsocket",
    "ds18x20", "sys", "uos", "uzlib",
    "esp", "uarray", "upip", "webrepl",
    "esp32", "ubinascii", "upip_utarfile", "webrepl_setup",
    "flashbdev", "ucollections", "upysh", "websocket_helper",
    "time", 
];

let findIncludeModuleNameInCode = (code) => {
    const regex = /^\s*?(?:import|from)\s+([^\s]+)/mg;

    let moduleList = [];
    let m;

    while ((m = regex.exec(code)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        let moduleName = m[1];
        if (moduleList.indexOf(moduleName) < 0) {
            moduleList.push(moduleName);
        }
    }

    moduleList = moduleList.filter((moduleName) => moduleBuiltIn.indexOf(moduleName) < 0);

    return moduleList;
}

$("#connect-device").click(async () => {
    if (!serialPort) {
        if (await serialConnect()) {
            let okFlag;
            okFlag = false;
            for (let i=0;i<100;i++) {
                await writeSerialByte(3); // Ctrl + C
                await sleep(50);
                if (microPythonIsReadyNextCommand()) {
                    okFlag = true;
                    break;
                }
            }

            if (!okFlag) {
                NotifyE("Access to MicroPython error");
                return;
            }
        }
    } else {

    }
});

$("#disconnect-device").click(async () => {
    if (serialPort) {
        autoConnectFlag = false;
        if (!isElectron) {

        } else {
            serialPort.close();
        }
    }
});
