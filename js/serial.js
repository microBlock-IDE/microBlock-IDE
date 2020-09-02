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

let serialUploadFile = async (fileName, content) => {
    if (content.length == 0) {
        content = "#No Code";
    }

    let firstWriteFlag = true;
    for (const chunkContent1 of content.match(/.{1,500}/gs)) {
        // await writeSerialNewLine(`f = open("${fileName}", "${firstWriteFlag ? 'w' : 'a'}")`);
        await writeSerialNewLine(`f = open("${fileName}", "${firstWriteFlag ? 'w' : 'a'}");w=f.write`);
        for (const chunkContent2 of chunkContent1.match(/.{1,100}/gs)) {
            // await writeSerialNewLine(`f.write(${JSON.stringify(chunkContent2)})`);
            await writeSerialNewLine(`w(${JSON.stringify(chunkContent2)})`);
            await sleep(100);
        }
        await writeSerialNewLine(`f.close()`);
        await sleep(500);
        firstWriteFlag = false;
    }
}

let serialConnect = async () => {
    navigator.serial.ondisconnect = () => {
        NotifyW("Serial port disconnect");
        serialPort = null;
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
        NotifyE("Can't open serial port, some program use this port ?");
        console.log(e);
        serialPort = null;
        
        return false;
    }

    NotifyS("Serial port connected");

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
            if (serialLastData.length > 10) {
                serialLastData = serialLastData.substring(serialLastData.length - 10, serialLastData.length);
            }
        }
    }));

    term.onData((data) => {
        writeSerial(data);
    });

    return true;
}

$("#upload-program").click(async function() {
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
    }

    console.log(code);

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
        NotifyE("Upload fail: Access to MicroPython error");
        $("#upload-program").removeClass("loading");
        return;
    }

    await writeSerialByte(1); // Ctrl + A, Enter to Raw REPL
    await sleep(50);
    RawREPLMode = true;
    if (!microPythonIsReadyNextCommand()) {
        NotifyE("Upload fail: Enter to Raw REPL fail");
        $("#upload-program").removeClass("loading");
        return;
    }

    let uploadModuleList = findIncludeModuleNameInCode(code);

    // console.log(uploadModuleList);

    if (uploadModuleList.length > 0) {
        let listAllModule = [];
        for (const extensionId of fs.ls("/extension")) {
            for (const filePath of fs.walk(`/extension/${extensionId}/modules`)) {
                let fileFullPath = `/extension/${extensionId}/modules/${filePath.replace(/^\//gm, "")}`;
                if (fileFullPath.endsWith(".py") || fileFullPath.endsWith(".mpy")) {
                    listAllModule.push(fileFullPath);
                }
            }
        }
        // console.log(listAllModule);

        for (const moduleWillUpload of uploadModuleList) {
            let modulePath = listAllModule.find((moduleFile) => moduleFile.replace(/\..+$/, "").endsWith(moduleWillUpload));
            if (modulePath) {
                await serialUploadFile(modulePath.replace(/^.*[\\\/]/, ''), fs.read(modulePath));
            } else {
                console.warn("not found module", moduleWillUpload);
            }
        }
    }

    await serialUploadFile("main.py", code);

    await writeSerialByte(2); // Ctrl + B, Exit from Raw REPL

    // await writeSerialNewLine(`exec(open("main.py", "r").read(),globals())`);
    await writeSerialByte(4); // Ctrl + D, Soft Reset than main.py will run
    
    $("#upload-program").removeClass("loading");

    NotifyS("Upload successful");
});

async function writeSerial(text) {
    data = new TextEncoder("utf-8").encode(text);
    buff = new ArrayBuffer(data.length);
    view = new Uint8Array(buff);
    view.set(data);
    await writer.write(buff);
    // console.log(buff);
}

let writeSerialNewLine = (text) => writeSerial(text + ((!RawREPLMode) ? "\r\n" : "\4"));

async function writeSerialByte(data) {
    buff = new ArrayBuffer(1);
    view = new Uint8Array(buff);
    view[0] = data;
    await writer.write(buff);
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
    "_onewire", "inisetup", "uerrno", "urequests",
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
