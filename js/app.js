let extensionList = [ ];

let updateBlockCategory = () => {
    var categoryIconList = [];
    let toolboxTextXML = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">`;

    let toolboxTree = null;
    if (boardId && levelName) {
        let board = boards.find(board => board.id === boardId);
        let level = board.level.find(level => level.name === levelName);
        toolboxTree = level.blocks;
    }
    if (!toolboxTree) {
        toolboxTree = blocksTree;
    }
    // blockTree
    for (let category of toolboxTree) {
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
        categoryIconList.push(category.icon.startsWith("/") ? rootPath + category.icon : `${rootPath}/boards/${boardId}/${category.icon}`);
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
let hotUpdate = async () => {
    if (!vFSTree) {
        vFSTree = { };
    }
    let configFileContent = fs.read("/config.json");
    if (configFileContent) {
        let projectConfig = JSON.parse(configFileContent);
        if (projectConfig) {
            useMode = projectConfig.mode;
            boardId = projectConfig.board ? projectConfig.board : null;
            levelName = projectConfig.level ? projectConfig.level : null;
            await loadBoard();
            if (useMode === "block") {
                updataWorkspaceAndCategoryFromvFS();
            } else if (useMode === "code") {
                $("#mode-select-switch > li[data-value='2']").click();
                $(async () => {
                    while(!editor) {
                        await sleep(100);
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
}

hotUpdate();

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
        mode: useMode,
        github: github_project_repo,
        board: boardId,
        level: levelName
    }));
    localStorage.setItem("autoSaveFS", JSON.stringify(vFSTree));
};

blocklyWorkspace.addChangeListener(saveCodeToLocal);
/* -------------- */

/*
$("#new-project").click(async () => {
    if (await NotifyConfirm("All blocks will lost. Are you sure of new project ?")) {
        blocklyWorkspace.clear();
        if (editor) editor.setValue("");
        vFSTree = "";
        vFSTree = { };

        updateBlockCategory();
    }
});
*/

$("#save-project").click(async () => {
    if (!github_project_repo) { // Save to local
        if (!isElectron) {
            let data = JSON.stringify(vFSTree);
            let blob = new Blob([data], { type: "application/json" });
            let url = window.URL.createObjectURL(blob);
            
            let link = document.createElement("a");
            link.download = $("#project-name").val() + ".mby";
            link.href = url;
            link.click();

            window.URL.revokeObjectURL(url);

            statusLog("Save project");
        } else {
            let result = await dialog.showSaveDialog({
                filters: [{ 
                    name: 'microBlock IDE', 
                    extensions: ['mby'] 
                }],
                defaultPath: $("#project-name").val() + ".mby"
            });
    
            if (result.canceled) {
                return;
            }

            OpenFilePath = result.filePath;

            nodeFS.writeFile(OpenFilePath, JSON.stringify(vFSTree), err => {
                if (err) {
                    NotifyE("Save project fail: " + err.toString());
                    return;
                }

                NotifyS("Save project at " + OpenFilePath);
                statusLog("Save project at " + OpenFilePath);
            });
        }
    } else { // Save to GitHub
        saveCodeToGitHub();
    }
});

$("#open-project").click(async () => {
    if (!await NotifyConfirm("All blocks will lost. Are you sure of open project ?")) {
        return;
    }

    if (!isElectron) {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".mby";
        input.addEventListener("change", function() {
            // console.log(this.files);
            let fileName = this.files[0].name.replace(".mby", "");
            let fr = new FileReader();
            fr.onload = async () => {
                // console.log(fr.result);
                vFSTree = JSON.parse(fr.result);
                await hotUpdate();
                NotifyS("Open project " + fileName)
                statusLog("Open project " + fileName);
                $("#project-name").val(fileName);
            };
            fr.readAsText(this.files[0]);
        }, false); 
        input.click();
    } else {
        let result = await dialog.showOpenDialogSync({
            properties: [
              'openFile'
            ],
            filters: [{ 
                name: 'microBlock IDE', 
                extensions: ['mby'] 
            }]
        });

        if (result == undefined) {
            return;
        }

        OpenFilePath = result[0];

        nodeFS.readFile(OpenFilePath, async (err, data) => {
            if (err) {
                NotifyE("Open project fail: " + err.toString());
                return;
            }

            vFSTree = JSON.parse(data);
            await hotUpdate();
            NotifyS("Open project " + OpenFilePath)
            statusLog("Open project " + OpenFilePath);
            $("#project-name").val(OpenFilePath.split(/[\\\/]/).pop().replace(".mby", ""));
        });
    }
});

$("#open-help").click(() => {
    if (!isElectron) {
        window.open("/web/", "_blank");
    } else {
        shell.openExternal("https://microblock.app/web/");
    }
});

let imageSelectUpdate = (sel) => {
    $(sel).find("li > div").click(function() {
        $(sel).find("li > div").removeClass("active");
        $(this).addClass("active");
    });
};

$(() => {
    for (sel of $(".image-select")) {
        imageSelectUpdate(sel);
    }
});

let statusLog = text => {
    let now = new Date();
    $("#text-status").text(`${text} at ${now.getHours()}:${(now.getMinutes() < 10 ? "0" : "")}${now.getMinutes()}:${(now.getSeconds() < 10 ? "0" : "")}${now.getSeconds()}`);
};

$(document).keydown(function(event) {
    // console.log(event)
    if (event.ctrlKey) {
        let key = event.key;
        if (key === 's') { // Ctrl + S -> Save
            event.preventDefault();
            $("#save-project").click();
        } else if (key === 'n') { // Ctrl + N -> New
            event.preventDefault();
            $("#new-project").click();
        } else if (key === 'o') { // Ctrl + O -> Open
            event.preventDefault();
            $("#open-project").click();
        } else if (key === 'h') { // Ctrl + H -> Help
            event.preventDefault();
            $("#open-help").click();
        } else if (key === 't') { // Ctrl + T -> Terminal
            event.preventDefault();
            $("#open-terminal").click();
        } else if (key === 'u') { // Ctrl + U -> Upload
            event.preventDefault();
            $("#upload-program").click();
        } 
    }

    return true;
});

// Auto Port connect (only on Electron)
let autoConnectFlag = true;
let timerAutoConnect = null;

let autoConnectCheck = async () => {
    if (autoConnectFlag && boardId && isElectron && !serialPort) {
        let board = boards.find(board => board.id === boardId);
        let usbInfo = board.usb[0];
        let portList = await serialAPI.list();
        if (portList) {
            let port = portList.find(info => info.productId === usbInfo.productId && info.vendorId === usbInfo.vendorId);
            if (port) {
                // console.log(port);
                serialConnectElectron(port.path);
            }
        }
    }
    if (timerAutoConnect) clearTimeout(timerAutoConnect);
    timerAutoConnect = setTimeout(autoConnectCheck, autoConnectFlag ? 500 : 5000);
};
if (isElectron) {
    autoConnectCheck();
}


