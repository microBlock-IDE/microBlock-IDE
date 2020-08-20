let serialPort = null;

let writer = null, reader = null;

let loopReadFlag = false;

let handleSerialRead = async () => {
    /* if (loopReadFlag) return;
    loopReadFlag = true; */

    // while (1) {
    /*
    reader.read().then(({ value, done }) => {
        // const { value, done } = await reader.read();
        // if (done) break;
        console.log(value);
        if (done) return;
        
        // let string = "";
        for (let key of value) {
            if (key >= 32 && key <= 126 || key == 13 || key == 10) {
                $("#terminal > section")[0].textContent += String.fromCharCode(key);
            } else {
                console.log(key);
            }
        }
        /*
        if (value >= 32 && value <= 126) {
            string += String.fromCharCode(value);
        } else if () {
            
        }
        // var string = new TextDecoder("ascii").decode(value);
        // console.log(string);
        $("#terminal > section")[0].textContent += string;
        $("#terminal > section").scrollTop($("#terminal > section")[0].scrollHeight);
        */
    //}
        //handleSerialRead();
    //});
};

let microPythonIsReadyNextCommand = () => $("#terminal > section").text().endsWith(">>> ");
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
    for (let i=0;i<100;i++) {
        await writeSerialByte(3); // Ctrl + C
        await sleep(50);
        if (microPythonIsReadyNextCommand()) {
            break;
        }
    }

    let firstWriteFlag = true;
    for (const chunkContent1 of content.match(/.{1,500}/gs)) {
        await writeSerialNewLine(`f = open("${fileName}", "${firstWriteFlag ? 'w' : 'a'}")`);
        for (const chunkContent2 of chunkContent1.match(/.{1,100}/gs)) {
            await writeSerialNewLine(`f.write(${JSON.stringify(chunkContent2)})`);
            await sleep(100);
        }
        await writeSerialNewLine(`f.close()`);
        await sleep(500);
        firstWriteFlag = false;
    }
}

$("#upload-program").click(async function() {
    setTimeout(() => $("#upload-program").addClass("loading"), 1);

    uploadModuleList = null;
    uploadModuleList = [];

    let code;
    if (useMode === "block") {
        code = Blockly.Python.workspaceToCode(blocklyWorkspace);
    } else if (useMode === "code") {
        code = editor.getValue();
    }
    if (!serialPort) {
        navigator.serial.ondisconnect = () => {
            NotifyW("Serial port disconnect");
            serialPort = null;
            $("#clear-terminal").click();
        }
        try {
            serialPort = await navigator.serial.requestPort();
        } catch(e) {
            NotifyE("Upload fail, you not select port");
            console.log(e);
            $("#upload-program").removeClass("loading");
            return;
        }

        try {
            await serialPort.open({ baudrate: 115200 });
        } catch(e) {
            NotifyE("Upload fail, can't open serial port, some program use this port ?");
            console.log(e);
            serialPort = null;
            $("#upload-program").removeClass("loading");
            return;
        }

        NotifyS("Serial port connected");

        writer = serialPort.writable.getWriter();
        // reader = serialPort.readable.getReader();

        serialPort.readable.pipeTo(new WritableStream({
            write(chunk) {
                // console.log(chunk);
                // console.log(new TextDecoder("ascii").decode(chunk));
                
                for (let key of chunk) {
                    if (key >= 32 && key <= 126 || key == 13 || key == 10) {
                        $("#terminal > section")[0].textContent += String.fromCharCode(key);
                    } else {
                        // console.log(key);
                    }
                }

                $("#terminal > section").scrollTop($("#terminal > section")[0].scrollHeight);
                // updateTerminalCurser();
            }
        }));

        // handleSerialRead();

        // console.log(reader);
    }

    // console.log(uploadModuleList);

    let listAllModule = [];
    for (const extensionId of fs.ls("/extension")) {
        for (const filePath of fs.walk(`/extension/${extensionId}/modules`)) {
            listAllModule.push(`/extension/${extensionId}/modules/${filePath.replace(/^\//gm, "")}`);
        }
    }
    // console.log(listAllModule);

    for (const moduleWillUpload of uploadModuleList) {
        let modulePath = listAllModule.find((moduleFile) => moduleFile.endsWith(moduleWillUpload));
        if (modulePath) {
            await serialUploadFile(moduleWillUpload, fs.read(modulePath));
        } else {
            console.warn("not found module", moduleWillUpload);
        }
    }

    await serialUploadFile("main.py", code);

    await writeSerialNewLine(`exec(open("main.py", "r").read(),globals())`);
    
    $("#upload-program").removeClass("loading");

    NotifyS("Upload successful");
    
/*
    console.log("Close port");
    serialPort.close();*/
});

async function writeSerial(text) {
    data = new TextEncoder("utf-8").encode(text);
    buff = new ArrayBuffer(data.length);
    view = new Uint8Array(buff);
    view.set(data);
    await writer.write(buff);
    // console.log(buff);
}

let writeSerialNewLine = (text) => writeSerial(text + "\r\n");

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
