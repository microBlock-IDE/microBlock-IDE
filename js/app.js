

// Block Tree to Category
for (let category of blocksTree) {
    $("#blockCategoryList").append(`
        <li data-name="${category.name}">
            <div class="icon"><img src="${category.icon}" alt=""></div>
            <div class="label">${category.name}</div>
        </li>
    `);
}

let changeToolbox = (categoryName) => {
    let category = blocksTree.find(obj => obj.name == categoryName);
    let toolboxTextXML = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">`;
    if (typeof category.blocks === "object") {
        for (let block of category.blocks) {
            if (typeof block === "object") {
                toolboxTextXML += block.xml;
            } else {
                if (typeof Blockly.Blocks[block].xml !== "undefined") {
                    toolboxTextXML += Blockly.Blocks[block].xml;
                } else {
                    toolboxTextXML += `<block type="${block}"></block>`;
                }
            }
        }
    } else if (typeof category.blocks === "function") {
        let xmlList = category.blocks(blocklyWorkspace);
        for (let xml of xmlList) {
            toolboxTextXML += Blockly.Xml.domToText(xml);
        }
    }
    toolboxTextXML += `</xml>`;
    let toolboxXML = Blockly.Xml.textToDom(toolboxTextXML);
    console.log(toolboxXML);
    blocklyWorkspace.updateToolbox(toolboxXML);

    $("#blockCategoryList > li").removeClass("active").css({ color: "" });
    $(`#blockCategoryList > li[data-name='${categoryName}']`).addClass("active").css({ 
        color: category.color
    });

    blocklyWorkspace.scrollbar.resize();
}

$("#blockCategoryList > li").click(function() {
    changeToolbox($(this).attr("data-name"));
});

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');

var blocklyWorkspace = Blockly.inject(blocklyDiv, {
    media: 'blockly/media/',
    toolbox: document.getElementById('toolbox'),
    grid : {
		spacing : 25, 
		length : 1, 
		colour : '#888', 
		snap : true
    },
    trashcan : true,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 2,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    scrollbars : true,
    comments : true, 
	disable : true, 
    maxBlocks : Infinity, 
    rtl : false, 
    oneBasedIndex : false, 
    sounds : true, 
});

var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(blocklyWorkspace);
};

window.addEventListener('resize', onresize, false);
onresize();

changeToolbox(blocksTree[0].name);

/* Auto Save to localStorage */
let oldCode = localStorage.getItem("autoSaveCode");
if (typeof oldCode === "string") {
    try {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(oldCode), blocklyWorkspace);
    } catch (e) {
        console.log(e);
    }
}
delete oldCode;

blocklyWorkspace.addChangeListener(() => {
    try {
        var xmlText = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(blocklyWorkspace));
        localStorage.setItem("autoSaveCode", xmlText);
    } catch (e) {
        console.log(e);
    }
});
/* -------------- */

let serialPort = null;

let writer = null, reader = null;

let loopReadFlag = false;

let handleSerialRead = async () => {
    if (loopReadFlag) return;
    loopReadFlag = true;

    while (1) {
        const { value, done } = await reader.read()
        if (done) break;
        // console.log(value);
        var string = new TextDecoder("ascii").decode(value);
        // console.log(string);
        $("#terminal > section")[0].textContent += string;
        $("#terminal > section").scrollTop($("#terminal > section")[0].scrollHeight);
    }
};

$("#upload-program").click(async function() {
    let code = Blockly.Python.workspaceToCode(blocklyWorkspace);
    if (!serialPort) {
        try {
            serialPort = await navigator.serial.requestPort();
        } catch(e) {
            alert("Upload fail, you not select port");
            console.log(e);
            return;
        }

        try {
            await serialPort.open({ baudrate: 115200 });
        } catch(e) {
            alert("Upload fail, can't open serial port, some program use this port ?");
            console.log(e);
            serialPort = null;
            return;
        }

        console.log("Port opened");

        if (!writer) writer = serialPort.writable.getWriter();
        if (!reader) reader = serialPort.readable.getReader();

        handleSerialRead();

        // console.log(reader);
    }

    for (let i=0;i<5;i++) {
        await writeSerial("\x03");
        await sleep(50);
    }

    await writeSerialNewLine(`f = open("main.py", "w")`);
    for (const chunkCode of code.match(/.{1,100}/gs)) {
        await writeSerialNewLine(`f.write(${JSON.stringify(chunkCode)})`);
        await sleep(100);
    }
    await writeSerialNewLine(`f.close()`);

    await sleep(100);

    await writeSerialNewLine(`exec(open("main.py", "r").read(),globals())`);
    
    
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
    console.log(buff);
}

let writeSerialNewLine = (text) => writeSerial(text + "\r\n");

let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

$("#terminal > section").keydown((event) => {
    event.preventDefault()
    console.log(event);

    var isWordCharacter = event.key.length === 1;

    if (!event.ctrlKey) {
        if (isWordCharacter) {
            writeSerial(event.key);
        } else if (event.keyCode === 13) {
            writeSerial("\r\n");
        }
    } else {
        if (event.which === 67) { // C
            writeSerial("\x03");
        }
    }
});

function moveCursorToEnd(el) {
    console.log("Move");
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

$("#terminal > section").click(() => moveCursorToEnd($(this)[0]));
