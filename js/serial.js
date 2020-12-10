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

    console.log(fileName, fileName.length);

    sendCmd = (cmd, data) => {
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
        writeSerialBytes(content);
    }

    /*
    await writeSerialByte(0x10); // set path
    await sleep(50);
    await writeSerialBytes([ (fileName.length >> 8) & 0xFF, fileName.length & 0xFF ]); // Data size
    await sleep(50);
    await writeSerial(fileName); // Path
    await sleep(50);
    await writeSerialByte(calcCheckSUM(fileName));
    await sleep(50);
    */

    sendCmd(0x10, fileName);

    // await sleep(100);

    let firstWriteFlag = true;
    let errorCount = 0;
    serialLastData = "";
    for (const chunkContent1 of content.match(/.{1,10000}/gs)) {
        let cUTF8 = chunkContent1.match(/[\u007F-\uFFFF]/g);
        let dataSize = chunkContent1.length + (cUTF8 ? cUTF8.length * 2 : 0);
/*
        await writeSerialByte(0x11); // write content
        await writeSerialBytes([ (dataSize >> 8) & 0xFF, dataSize & 0xFF ]); // Data size
        // await sleep(50);
        // await writeSerial(chunkContent1); // Data
        await writeSerialBytes(new TextEncoder("utf-8").encode(chunkContent1));
        // await sleep(500);
        await writeSerialByte(calcCheckSUM(chunkContent1));
*/
        sendCmd(0x11, chunkContent1);
        // await sleep(500);
        // console.log(dataSize, chunkContent1);

        while(errorCount < 20) {
            await sleep(200);
            //console.log(JSON.stringify(serialLastData));
            if (serialLastData.endsWith("write end\r\n")) {
                // console.log("Open file OK!");
                serialLastData = "";
                break;
            }
            errorCount++;
        }
        if (errorCount >= 20) {
            console.error("Error, write file fail !", fileName);
            return;
        }


        // await writeSerialNewLine(`f = open("${fileName}", "${firstWriteFlag ? 'w' : 'a'}")`);
        /*while(errorCount < 20) {
            await writeSerialNewLine(`f = open("${fileName}", "${firstWriteFlag ? 'w' : 'a'}");w=f.write;p=print`);
            await sleep(isElectron ? 50 : 100);
            // console.log(serialLastData);
            if (serialLastData.match(/OK[^>]*>$/gm)) {
                // console.log("Open file OK!");
                serialLastData = "";
                break;
            }
            errorCount++;
        }
        if (errorCount >= 20) {
            console.error("Error, open file fail !", fileName);
            return;
        }*/
        /*
        for (const chunkContent2 of chunkContent1.match(/.{1,100}/gs)) {
            errorCount = 0;
            while(errorCount < 20) {
                // await writeSerialNewLine(`f.write(${JSON.stringify(chunkContent2)})`);
                await writeSerialNewLine(`p(w(${JSON.stringify(chunkContent2).replace(/[\u007F-\uFFFF]/g, chr => "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4))}))`);
                await sleep(isElectron ? 10 : 100);

                let writeOKFlag = false;
                for (let x=0;x<5;x++) {
                    // console.log("Last data:", serialLastData);
                    if (serialLastData.match(/OK[0-9]{1,3}[^>]*>/gm)) {
                        let n = /OK([0-9]{1,3})[^>]*>/gm.exec(serialLastData);
                        if (n) {
                            let cUTF8 = chunkContent2.match(/[\u007F-\uFFFF]/g);
                            let sendN = chunkContent2.length + (cUTF8 ? cUTF8.length * 2 : 0);
                            if (+n[1] === sendN) {
                                // console.log("Write file OK!");
                                serialLastData = "";
                                writeOKFlag = true;
                            } else {
                                console.warn("Data lost ? Send:", sendN, "Ros:", +n[1]);
                            }
                        } else {
                            console.warn("Why not match ?");
                        }
                        break;
                    }
                    await writeSerialNewLine(" ");
                    await sleep(100);
                }
                if (writeOKFlag) {
                    break;
                }
                console.warn("Write fail !, Try");
                errorCount++;
            }
            if (errorCount >= 20) {
                console.error("Write fail", chunkContent2);
                return;
            }
        }
        errorCount = 0;
        while(errorCount < 20) {
            await writeSerialNewLine(`f.close()`);
            await sleep(isElectron ? 300 : 500);
            // console.log(serialLastData);
            if (serialLastData.match(/OK[^>]*>$/gm)) {
                // console.log("Close file OK!");
                serialLastData = "";
                break;
            }
            errorCount++;
        }
        if (errorCount >= 20) {
            console.error("Error, Close file fail !", fileName);
            return;
        }
        firstWriteFlag = false;
        */
    }

    // await writeSerialBytes([ 0, 0 ]); // END of data

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
            serialPort = new serialAPI(portName, { baudRate: !uploadMode ? 115200 : 921600 }, err => {
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
/*
    if (!serialLastData.endsWith(">>>") && serialLastData.endsWith(">")) { // Raw REPL mode ?
        okFlag = false;
        for (let i=0;i<5;i++) {
            await writeSerialByte(2); // Ctrl + B, Exit Raw REPL
            await sleep(100);
            RawREPLMode = false;
            if (microPythonIsReadyNextCommand()) {
                okFlag = true;
                break;
            }
        }
    }
    
    okFlag = false;
    for (let i=0;i<100;i++) {
        await writeSerialByte(3); // Ctrl + C
        await sleep(100);
        if (microPythonIsReadyNextCommand()) {
            okFlag = true;
            break;
        }
    }

    if (!okFlag) {
        NotifyE("Upload fail: Access to MicroPython error");
        statusLog("Upload Fail");
        $("#upload-program").removeClass("loading");
        if (isElectron) {
            firewareUpgradeFlow();
        }
        return;
    }
*/
    /*
    okFlag = false;
    for (let i=0;i<100;i++) {
        await writeSerialByte(4); // Ctrl + D, Soft Reset than main.py will run
        await sleep(200);
        if (microPythonIsReadyNextCommand()) {
            okFlag = true;
            break;
        }
    }

    if (!okFlag) {
        NotifyE("Upload fail: Soft Reset MicroPython fail !");
        $("#upload-program").removeClass("loading");
        return;
    }
    */
     /*
    await writeSerialByte(4);
    await sleep(100);
*/
    t0 = (new Date()).getTime();

    serialLastData = "";
    await boardReset();
    
    while (!serialLastData.endsWith("WUP\r\n")) {
        console.log(serialLastData);
        await sleep(50);
    }

    okFlag = false;
    for (let i=0;i<100;i++) {
        serialLastData = "";
        await writeSerialBytes([ 0x1F, 0xF1, 0xFF ]); // Sync bytes
        await sleep(50);
        if (serialLastData.endsWith("wait upload\n") >= 0) {
            console.log("Go to upload OK!");
            break;
        }
    }

    await sleep(200);
/*
    await writeSerialByte(7); // Path size
    await writeSerial("main.py"); // Path

    await sleep(1000);

    await writeSerialBytes([ 0, 10 ]); // Data size
    await sleep(1000);
    await writeSerial("0123456789"); // Data

    await sleep(1000);

    await writeSerialBytes([ 0, 10 ]); // Data size
    await sleep(1000);
    await writeSerial("0123456789"); // Data

    await sleep(1000);

    await writeSerialBytes([ 0, 10 ]); // Data size
    await sleep(1000);
    await writeSerial("0123456789"); // Data

    return;*/
/*
    let serialUploadFile = async (filePath, code) => {
        console.log("Start upload", filePath);

        // let filePath = "main.py";

        serialLastData = "";

        await writeSerialByte(filePath.length); // Path size
        await writeSerial(filePath); // Path

        await writeSerialBytes([ (code.length >> 8) & 0xFF, code.length & 0xFF ]); // Data size
        await writeSerial(code); // Data

        while (!serialLastData.endsWith("K")) {
            console.log(serialLastData);
            await sleep(10);
        }

        serialLastData = "";

        await writeSerialBytes([ 0, 0 ]); // END of data
        /* await writeSerialByte(0); // END of file select */
/*
        while (!serialLastData.endsWith("F")) {
            console.log(serialLastData);
            await sleep(10);
        }

        console.log("END of upload");
    }*/

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

    // await writeSerialByte(0); // END of file select

    sendCmd(0xFF);

    while (!serialLastData.endsWith("run mode\r\n")) {
        await sleep(10);
    }

    console.log("Time:", (new Date()).getTime() - t0, "ms");

    return;
    /*
    okFlag = false;
    for (let i=0;i<100;i++) {
        await writeSerialByte(3); // Ctrl + C
        await sleep(100);
        if (microPythonIsReadyNextCommand()) {
            okFlag = true;
            break;
        }
    }

    if (!okFlag) {
        NotifyE("Upload fail: Access to MicroPython error");
        statusLog("Upload Fail");
        $("#upload-program").removeClass("loading");
        return;
    }

    if (typeof skipFirmwareUpgrade === "undefined") skipFirmwareUpgrade = false;

    if (boardId && !skipFirmwareUpgrade) {
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
        }
    }

    for (let i=0;i<100;i++) {
        await writeSerialByte(1); // Ctrl + A, Enter to Raw REPL
        await sleep(50);
        RawREPLMode = true;
        if (microPythonIsReadyNextCommand()) {
            okFlag = true;
            break;
        }
    }
    
    if (!okFlag) {
        NotifyE("Upload fail: Enter to Raw REPL fail");
        statusLog("Upload Fail");
        $("#upload-program").removeClass("loading");
        return;
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

    await writeSerialByte(2); // Ctrl + B, Exit from Raw REPL

    RawREPLMode = false;

    await writeSerialNewLine(`exec(open("main.py", "r").read(),globals())`);
    // await writeSerialByte(4); // Ctrl + D, Soft Reset than main.py will run
    
    $("#upload-program").removeClass("loading");

    NotifyS("Upload successful");
    statusLog("Upload Successful");*/
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
