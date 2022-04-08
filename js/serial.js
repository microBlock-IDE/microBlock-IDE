let serialPort = null;
let writer = null, reader = null;
let serialLastData = "";

let RawREPLMode = false;

let microPythonIsReadyNextCommand = () => {
    return serialLastData.endsWith((!RawREPLMode) ? ">>> " : ">");
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
        if (e.toString().indexOf("Failed to read the 'baudRate' property") >= 0) { // New version of Google Chrome ?
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
            console.log("Error in try 2", e);
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
            if (!firmwareUpdateMode) {
                for (let key of chunk) {
                    term.write(String.fromCharCode(key));
                    serialLastData += String.fromCharCode(key);
                }
                if (serialLastData.length > 300) {
                    serialLastData = serialLastData.substring(serialLastData.length - 300, serialLastData.length);
                }
                if (dashboardIsReady) {
                    dashboardWin.streamDataIn(chunk);
                }
            } else {
                inputBuffer = inputBuffer.concat(Array.from(chunk));
                console.log(inputBuffer);
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
        if (!firmwareUpdateMode) {
            term.write(chunk);
            serialLastData += chunk;
            if (serialLastData.length > 300) {
                serialLastData = serialLastData.substring(serialLastData.length - 300, serialLastData.length);
            }
            if (sharedObj.dashboardWin) {
                sharedObj.dashboardWin.webContents.send("serial-data-in", chunk);
            }
        } else {
            inputBuffer = inputBuffer.concat(Array.from(chunk));
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

let boardReset = (enterToBootMode) => { // Hard-reset
    if (typeof enterToBootMode === "undefined") {
        enterToBootMode = false;
    }

    return new Promise(async resolve => {
        if (!enterToBootMode) {
            if (!isElectron) { // Web
                await serialPort.setSignals({ // EN = 1, BOOT = 1
                    dataTerminalReady: true,
                    requestToSend: true
                });
                await serialPort.setSignals({ // EN = 0, BOOT = 1
                    dataTerminalReady: false,
                    requestToSend: true
                });
                await serialPort.setSignals({ // EN = 1, BOOT = 1
                    dataTerminalReady: true,
                    requestToSend: true
                });
                resolve();
            } else { // Electron
                serialPort.set({ // EN = 1, BOOT = 1
                    dtr: true,
                    rts: true
                }, () => 
                    serialPort.set({ // EN = 0, BOOT = 1
                        dtr: false,
                        rts: true
                    }, async () => {
                        await sleep(50);
                        serialPort.set({ // EN = 1, BOOT = 1
                            dtr: true,
                            rts: true
                        }, resolve)
                    })
                );
            }
        } else {
            if (!isElectron) { // Web
                await serialPort.setSignals({ // EN = 1, BOOT = 0
                    dataTerminalReady: 0,
                    requestToSend: 1
                });
                await sleep(50);
                await serialPort.setSignals({ // EN = 0, BOOT = 1
                    dataTerminalReady: 1,
                    requestToSend: 0
                });
                await sleep(500);
                await serialPort.setSignals({ // EN = 1, BOOT = 1
                    dataTerminalReady: 0,
                    requestToSend: 0
                });
                await sleep(100);
                resolve();
            } else { // Electron
                console.log("Try to BOOT mode");
                serialPort.set({ // EN = 1, BOOT = 0
                    dtr: 0,
                    rts: 1
                }, async () => {
                    await sleep(300);
                    serialPort.set({ // EN = 0, BOOT = 1
                        dtr: 1,
                        rts: 0
                    }, async () => {
                        // await sleep(50);
                        serialPort.set({ // EN = 1, BOOT = 1
                            dtr: 0,
                            rts: 0
                        }, resolve)
                    });
                });
            }
        }
    });
}

class UploadOnBoot {
    constructor() {
        
    }

    async start() {
        serialLastData = "";
        await boardReset();
        if (!await this.checkEndWith("wait upload\r\n", 50, 50)) {
            throw "wait upload keyword timeout, only can use old method ?";
        }

        serialLastData = "";
        await writeSerialBytes([ 0x1F, 0xF1, 0xFF ]); // Sync bytes
        if (!await this.checkEndWith("upload mode\r\n", 100, 30)) {
            throw "Send sync bytes fail";
        }
    }

    async getFirmwareInfo() {
        serialLastData = "";
        await this.sendCmd(0x01);
        if (!await this.checkEndWith("\r\n", 50, 30)) {
            throw "Device not respond";
        }

        let checkVersion = /MicroPython\s+([^\s]+)\s+on\s+([0-9\-]+);\s?(.+)\s+with\s+([^\s]+)$/m.exec(serialLastData);
        if (!checkVersion) {
            throw "Check version fail";
        }

        return { 
            version: checkVersion[1],
            date: checkVersion[2],
            board: checkVersion[3],
            cpu: checkVersion[4]
        };
    }

    async upload(fileName, content) {
        if (content.length == 0) {
            content = "#No Code";
        }

        serialLastData = "";
        await this.sendCmd(0x10, fileName);
        if (!await this.checkEndWith(`set path to ${fileName}\r\n`, 50, 20)) {
            throw "Set path fail !";
        }

        for (const chunkContent of content.match(/.{1,10000}/gs)) {
            serialLastData = "";
            await this.sendCmd(0x11, chunkContent);
            if (!await this.checkEndWith("write end\r\n", 50, 100)) {
                throw "Error, write file fail !";
            }
        }
    }

    async end() {
        serialLastData = "";
        await this.sendCmd(0xFF);
        if (!await this.checkIndexOf("exit upload mode\r\n", 50, 50)) {
            throw "exit upload mode fail";
        }
    }

    async sendCmd(cmd, data) {
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

    async checkEndWith(str, delay=100, max_try=10) {
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await sleep(delay);
            if (serialLastData.endsWith(str)) {
                okFlag = true;
                break;
            }
        }
        return okFlag;
    }

    async checkIndexOf(str, stop=100, max_try=10) {
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await sleep(stop);
            if (serialLastData.indexOf(str) >= 0) {
                okFlag = true;
                break;
            }
        }
        return okFlag;
    }
};

class UploadViaREPL {
    constructor() {
        RawREPLMode = false;
    }

    async start() {
        if (!serialLastData.endsWith(">>>") && serialLastData.endsWith(">")) { // Raw REPL mode ?
            serialLastData = "";
            RawREPLMode = true;
            await this.sendByteLoopWaitNextCommand(2, 100, 5); // Ctrl + B, Exit Raw REPL
        }
        RawREPLMode = false;

        serialLastData = "";
        if (!await this.sendByteLoopWaitNextCommand(3, 100, 100)) { // Ctrl + C
            throw "Access to MicroPython error";
        }

        serialLastData = "";
        await writeSerialByte(4); // Soft reset
        await sleep(300);

        // serialLastData = "";
        if (!await this.sendByteLoopWaitNextCommand(3, 100, 100)) { // Ctrl + C
            throw "Exit main program error";
        }

        let checkVersion = /MicroPython\s+([^\s]+)\s+on\s+([0-9\-]+);\s?(.+)\s+with\s+([^\s]+)$/m.exec(serialLastData);
        if (checkVersion) {
            this.firmwareInfo = { 
                version: checkVersion[1],
                date: checkVersion[2],
                board: checkVersion[3],
                cpu: checkVersion[4]
            };
        }

        RawREPLMode = true;
        if (!await this.sendByteLoopWaitNextCommand(1, 50, 100)) { // Ctrl + A, Enter to Raw REPL
            throw "Enter to Raw REPL fail";
        }
    }

    async getFirmwareInfo() {
        return this.firmwareInfo;
    }

    async upload(fileName, content) {
        if (content.length == 0) {
            content = "#No Code";
        }

        let board = boards.find(board => board.id === boardId);
        const chipId = board?.chip || "ESP32";

        let firstWriteFlag = true;
        serialLastData = "";
        let chunkContent1Array = [];
        if (chipId === "ESP32") {
            chunkContent1Array = content.match(/.{1,500}/gs);
        } else if (chipId === "RP2") {
            chunkContent1Array = content.match(/.{1,2048}/gs);
        }
        for (const chunkContent1 of chunkContent1Array) {
            serialLastData = "";
            if (!await this.sendLineLoopWaitMatch(`f = open("${fileName}", "${firstWriteFlag ? 'w' : 'a'}");w=f.write;p=print`, /OK[^>]*>$/gm, isElectron ? 50 : 100, 20)) {
                throw `open file ${fileName} fail !`;
            }

            if (chipId === "ESP32") {
                for (const chunkContent2 of chunkContent1.match(/.{1,100}/gs)) {
                    serialLastData = "";
                    if (!await this.sendLineLoopWaitMatch(`p(w(${JSON.stringify(chunkContent2).replace(/[\u007F-\uFFFF]/g, chr => "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4))}))`, /OK[0-9]{1,3}[^>]*>/gm, isElectron ? 50 : 100, 20)) {
                        throw `write ${chunkContent2.length} fail !`
                    }
        
                    let n = /OK([0-9]{1,3})[^>]*>/gm.exec(serialLastData);
                    if (!n) {
                        throw "Match fail";
                    }

                    let cUTF8 = chunkContent2.match(/[\u007F-\uFFFF]/g);
                    let sendN = chunkContent2.length + (cUTF8 ? cUTF8.length * 2 : 0);
                    if (+n[1] !== sendN) {
                        throw `Data lost ? Send: ${sendN}, Ros: ${+n[1]}`;
                    }
                }
            } else if (chipId === "RP2") {
                serialLastData = "";
                if (!await this.sendLineLoopWaitMatch(`p(w(${JSON.stringify(chunkContent1).replace(/[\u007F-\uFFFF]/g, chr => "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4))}))`, /OK[0-9]{1,3}[^>]*>/gm, isElectron ? 50 : 100, 20)) {
                    throw `write ${chunkContent2.length} fail !`
                }

                let n = /OK([0-9]{1,4})[^>]*>/gm.exec(serialLastData);
                if (!n) {
                    throw "Match fail";
                }

                let cUTF8 = chunkContent1.match(/[\u007F-\uFFFF]/g);
                let sendN = chunkContent1.length + (cUTF8 ? cUTF8.length * 2 : 0);
                if (+n[1] !== sendN) {
                    throw `Data lost ? Send: ${sendN}, Ros: ${+n[1]}`;
                }
            }

            serialLastData = "";
            if (!await this.sendLineLoopWaitMatch(`f.close()`, /OK[^>]*>$/gm, isElectron ? 300 : 500, 20)) {
                throw `close file ${fileName} fail !`;
            }

            firstWriteFlag = false;
            
        }
    }

    async end() {
        await writeSerialByte(2); // Ctrl + B, Exit from Raw REPL

        RawREPLMode = false;   
        
        let board = boards.find(board => board.id === boardId);
        if (board?.chip === "RP2") {
            await writeSerialByte(4); // Soft reset
            await sleep(300);
        } else {
            await this.writeSerialNewLine(`exec(open("main.py", "r").read(),globals())`);
        }
    }

    async sendByteLoopWaitNextCommand(data, delay=100, max_try=5) {
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await writeSerialByte(data);
            await sleep(delay);
            if (microPythonIsReadyNextCommand()) {
                okFlag = true;
                break;
            }
            
        }
        return okFlag;
    }

    async sendLineLoopWaitMatch(line, regex, delay=100, max_try=5) {
        await this.writeSerialNewLine(line);
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await sleep(delay);
            if (serialLastData.match(regex)) {
                okFlag = true;
                break;
            }
        }
        return okFlag;
    }

    writeSerialNewLine(text) {
        writeSerial(text + ((!RawREPLMode) ? "\r\n" : "\x04"));
    }
};

let realDeviceUploadFlow = async (code) => {
    if (!serialPort) {
        if (!await serialConnect()) {
            $("#upload-program").removeClass("loading");
            return;
        }
        await sleep(300);
    }

    let filesUpload = [];

    let uploadModuleList = findIncludeModuleNameInCode(code);

    // console.log(uploadModuleList);

    if (uploadModuleList.length > 0) {
        for (const extensionId of fs.ls("/extension")) {
            for (const filePath of fs.walk(`/extension/${extensionId}/modules`)) {
                let fileName = filePath.replace(/^\//gm, "");
                if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
                    if (uploadModuleList.indexOf(fileName.replace(/\..+$/, "")) >= 0) {
                        filesUpload.push({
                            file: filePath.replace(/^.*[\\\/]/, ''),
                            content: fs.read(`/extension/${extensionId}/modules/${fileName}`)
                        });
                    }
                }
            }
        }

        if (isElectron) {
            let extensionDir = sharedObj.extensionDir;
            for (const extensionId of nodeFS.ls(extensionDir)) {
                for (const filePath of (await nodeFS.walk(`${extensionDir}/${extensionId}/modules`))) {
                    let fileName = path.basename(filePath);
                    if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
                        if (uploadModuleList.indexOf(fileName.replace(/\..+$/, "")) >= 0) {
                            filesUpload.push({
                                file: filePath.replace(/^.*[\\\/]/, ''),
                                content: (await readFileAsync(filePath)).toString()
                            });
                        }
                    }
                }
            }
        }
    }

    filesUpload.push({
        file: "main.py",
        content: code
    });

    try {
        let method;

        const enterToREPL = async () => {
            method = new UploadViaREPL();
            try {
                await method.start();
            } catch (e) {
                firewareUpgradeFlow();
                throw e;
            }
        };

        let board = boards.find(board => board.id === boardId);
        if (board.uploadMode && board.uploadMode === "REPL") {
            await enterToREPL();
        } else {
            method = new UploadOnBoot();

            try {
                await method.start();
            } catch (e) {
                NotifyW("Switch to upload via RawREPL [RECOMMENDED Upgrade fireware]");
                await enterToREPL();
            }
        }

        if (typeof skipFirmwareUpgrade === "undefined") skipFirmwareUpgrade = false;

        // Check MicroPython version
        if (boardId && !skipFirmwareUpgrade) {
            let info = await method.getFirmwareInfo();
            console.log("firmware info", info);

            let board = boards.find(board => board.id === boardId);
            if (typeof board.firmware[0].version !== "undefined") {
                if (board.firmware[0].version !== info.version) {
                    if (typeof board.firmware[0].date !== "undefined") {
                        let dbFwDate = new Date(board.firmware[0].date).getTime();
                        let currentFwDate = new Date(info.date).getTime();
                        if (currentFwDate < dbFwDate) {
                            if (isElectron) {
                                firewareUpgradeFlow();
                            }
                            throw "Upload fail: MicroPython fireware is out of date";
                        }
                    }
                }
            }
        }

        for (let a of filesUpload) {
            statusLog(`Uploading ${a.file}`);
            await method.upload(a.file, a.content);
        }

        await method.end();  
    } catch(e) {
        throw e;
    }
}

$("#upload-program").click(async function() {
    statusLog("Start Upload");
    t0 = (new Date()).getTime();

    // setTimeout(() => $("#upload-program").addClass("loading"), 1);
    $("#upload-program").addClass("loading");

    let code;
    if (useMode === "block") {
        code = Blockly.Python.workspaceToCode(blocklyWorkspace);
    } else if (useMode === "code") {
        code = editor.getValue();
    }

    console.log(code);

    try {
        if (deviceMode === MODE_REAL_DEVICE) {
            await realDeviceUploadFlow(code);
        } else if (deviceMode === MODE_SIMULATOR) {
            let simSystem = domSimulatorIframe.contentWindow.simSystem;
            if (simSystem) {
                simSystem.runCode(code);
            } else {
                console.warn("Connect to domSimulatorIframe error");
            }
        }

        timeDiff = (new Date()).getTime() - t0;
        console.log("Time:", timeDiff, "ms");
        NotifyS("Upload Successful");
        statusLog(`Upload successful with ${timeDiff} mS`);
    } catch(e) {
        NotifyE("Upload Fail !");
        statusLog(`Upload fail because ${e}`);
        console.warn(e);
    }
    

    $("#upload-program").removeClass("loading");
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
        await new Promise(resolve => {
            serialPort.write(buff, () => {
                resolve();
            });
        });
    }
}

async function writeSerialByte(data) {
    if (!isElectron) {
        let buff = new Uint8Array([ data ]);
        await writer.write(buff);
    } else {
        let b = Buffer.from([ data ]);
        await (new Promise(resolve => serialPort.write(Buffer.from(b), resolve)));
    }
}

async function writeSerialBytes(data) {
    if (!isElectron) {
        await writer.write(new Uint8Array(data));
    } else {
        let b = Buffer.from(data);
        let writeSize = 0;
        while(writeSize < b.length) {
            const len = Math.min(1024, b.length - writeSize);
            const block = b.slice(writeSize, writeSize + len);
            await new Promise(resolve => serialPort.write(block, resolve));
            console.log(block);
            writeSize += len;
        }
    }
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
    "btree", "uio", "ustruct",
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
