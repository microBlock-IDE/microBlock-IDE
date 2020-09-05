let extensionList = [ ];

let updateBlockCategory = () => {
    var categoryIconList = [];
    let toolboxTextXML = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">`;

    // blockTree
    for (let category of blocksTree) {
        toolboxTextXML += `<category name="${category.name}" colour="${category.color}"${typeof category.blocks === "string" ? ` custom="${category.blocks}"` : ''}>`;
        if (typeof category.blocks === "object") {
            for (let block of category.blocks) {
                if (typeof block === "object") {
                    toolboxTextXML += block.xml;
                } else {
                    if (typeof Blockly.Blocks[block] !== "undefined") {
                        if (typeof Blockly.Blocks[block].xml !== "undefined") {
                            toolboxTextXML += Blockly.Blocks[block].xml;
                        } else {
                            toolboxTextXML += `<block type="${block}"></block>`;
                        }
                    } else {
                        console.warn(block, "undefined, forget add blocks_xxx.js ?");
                    }
                }
            }
        } else if (typeof category.blocks === "function") {
            let xmlList = category.blocks(blocklyWorkspace);
            for (let xml of xmlList) {
                toolboxTextXML += Blockly.Xml.domToText(xml);
            }
        }
        toolboxTextXML += `</category>`;
        categoryIconList.push(category.icon);
    }

    // Extenstion
    extenstionTree = [];
    for (const extensionId of fs.ls("/extension")) {
        let extension = fs.read(`/extension/${extensionId}/extension.js`);
        extension = eval(extension);
        extenstionTree.push(extension);
        categoryIconList.push(fs.read(`/extension/${extensionId}/${extension.icon}`));
    }
    for (let category of extenstionTree) {
        toolboxTextXML += `<category name="${category.name}" colour="${category.color}"${typeof category.blocks === "string" ? ` custom="${category.blocks}"` : ''}>`;
        if (typeof category.blocks === "object") {
            for (let block of category.blocks) {
                if (typeof block === "object") {
                    toolboxTextXML += block.xml;
                } else {
                    if (typeof Blockly.Blocks[block] !== "undefined") {
                        if (typeof Blockly.Blocks[block].xml !== "undefined") {
                            toolboxTextXML += Blockly.Blocks[block].xml;
                        } else {
                            toolboxTextXML += `<block type="${block}"></block>`;
                        }
                    } else {
                        console.warn(block, "undefined, forget add blocks_xxx.js ?");
                    }
                }
            }
        } else if (typeof category.blocks === "function") {
            let xmlList = category.blocks(blocklyWorkspace);
            for (let xml of xmlList) {
                toolboxTextXML += Blockly.Xml.domToText(xml);
            }
        }
        toolboxTextXML += `</category>`;
    }

    toolboxTextXML += `</xml>`;

    let toolboxXML = Blockly.Xml.textToDom(toolboxTextXML);

    blocklyWorkspace.updateToolbox(toolboxXML);
    /* blocklyWorkspace.scrollbar.resize(); */

    for (const [index, element] of Object.entries($("span.blocklyTreeIcon"))) {
        if (typeof element === "object" && element.nodeType !== undefined) {
            $(element).append(`<img src="${categoryIconList[index]}" alt="">`);
        }
    }
};

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

Blockly.triggleResize = function(e) {
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

window.addEventListener('resize', Blockly.triggleResize, false);
Blockly.triggleResize();

Blockly.updateToolbox = () => { };

/* Auto Save to localStorage */
let updataWorkspaceAndCategoryFromvFS = async () => {
    if (!vFSTree) {
        vFSTree = { };
    }
    
    for (const extensionId of fs.ls("/extension")) {
        let extensionLocalPath = `/extension/${extensionId}`;
        let blocksFile = fs.walk(`${extensionLocalPath}/blocks`);
        for (const file of blocksFile) {
            if (file.endsWith(".js")) {
                let jsContent = fs.read(`${extensionLocalPath}/blocks/${file}`);
                try {
                    eval(jsContent);
                } catch (e) {
                    NotifyE("Script run error: " + e.toString());
                    console.error(e);
                }
            } else {
                console.warn("Why file " + file + " in blocks ? support .js only so skip it");
            }
        }
    }

    updateBlockCategory();
    
    let oldCode = fs.read("/main.xml");
    if (typeof oldCode === "string") {
        blocklyWorkspace.clear();
        try {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(oldCode), blocklyWorkspace);
        } catch (e) {
            console.log(e);
        }
    }
}
// $(loadBlockFromAutoSave);
vFSTree = JSON.parse(localStorage.getItem("autoSaveFS"));
if (!vFSTree) {
    vFSTree = { };
}
let configFileContent = fs.read("/config.json");
// console.log(configFileContent)
if (configFileContent) {
    let projectConfig = JSON.parse(configFileContent);
    if (projectConfig) {
        useMode = projectConfig.mode;
        if (useMode === "block") {
            updataWorkspaceAndCategoryFromvFS();
        } else if (useMode === "code") {
            $("#mode-select-switch > li[data-value='2']").click();
            $(() => {
                while(!editor) {
                    sleep(100);
                }
                let code = fs.read("main.py");
                if (code) {
                    editor.setValue(code);
                }
            });
        }
    }
} else {
    updataWorkspaceAndCategoryFromvFS();
}

let saveCodeToLocal = () => {
    if (useMode === "block") {
        fs.remove("/main.py");
        try {
            var xmlText = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(blocklyWorkspace));
            fs.write("/main.xml", xmlText);
        } catch (e) {
            console.log(e);
        }
    } else if (useMode === "code") {
        fs.remove("/main.xml");
        fs.write("/main.py", editor.getValue());
    }
    fs.write("/config.json", JSON.stringify({
        mode: useMode
    }));
    localStorage.setItem("autoSaveFS", JSON.stringify(vFSTree));
};

blocklyWorkspace.addChangeListener(saveCodeToLocal);
/* -------------- */

$("#new-project").click(async () => {
    if (await NotifyConfirm("All blocks will lost. Are you sure of new project ?")) {
        blocklyWorkspace.clear();
        vFSTree = "";
        vFSTree = { };

        updateBlockCategory();
    }
});

$("#save-project").click(() => {
    let data = JSON.stringify(vFSTree);
    let blob = new Blob([data], { type: "application/json" });
	let url = window.URL.createObjectURL(blob);
    
    let link = document.createElement("a");
    link.download = $("#project-name").val() + ".mby";
    link.href = url;
    link.click();

	window.URL.revokeObjectURL(url);
});

$("#open-project").click(async () => {
    if (!await NotifyConfirm("All blocks will lost. Are you sure of open project ?")) {
        return;
    }

    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".mby";
    input.addEventListener("change", function() {
        // console.log(this.files);
        let fileName = this.files[0].name.replace(".mby", "");
        let fr = new FileReader();
        fr.onload = () => {
            // console.log(fr.result);
            vFSTree = JSON.parse(fr.result);
            updataWorkspaceAndCategoryFromvFS();
            NotifyS("Open project " + fileName)
            $("#project-name").val(fileName);
        };
        fr.readAsText(this.files[0]);
    }, false); 
    input.click();
});

$("#open-help").click(() => {
    window.open("/web", "_blank");
});

$(document).keydown(function(event) {
    if (event.ctrlKey) {
        let key = String.fromCharCode(event.which).toLowerCase();
        if (key === 's') { // Ctrl + S -> Save
            $("#save-project").click();
        } else if (key === 'n') { // Ctrl + N -> New
            $("#new-project").click();
        } else if (key === 'o') { // Ctrl + O -> Open
            $("#open-project").click();
        } else if (key === 'h') { // Ctrl + H -> Help
            $("#open-help").click();
        } else if (key === 't') { // Ctrl + T -> Terminal
            $("#open-terminal").click();
        } else if (key === 'u') { // Ctrl + U -> Upload
            $("#upload-program").click();
        } 
 
        event.preventDefault();
    }
    
    return true;
});
