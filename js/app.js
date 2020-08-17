let extensionList = [ ];

let updateBlockCategory = () => {
    $("#blockCategoryList").html('');

    // Block Tree to Category
    for (let category of blocksTree) {
        $("#blockCategoryList").append(`
            <li data-name="${category.name}">
                <div class="icon"><img src="${category.icon}" alt=""></div>
                <div class="label">${category.name}</div>
            </li>
        `);
    }

    // Extension List to Category
    /*
    for (let extension of extensionList) {
        $("#blockCategoryList").append(`
            <li data-name="${extension.name}" data-extension="1">
                <div class="icon"><img src="${extension.git}/raw/${extension.git_branch || 'master'}/${extension.icon}" alt=""></div>
                <div class="label">${extension.name}</div>
            </li>
        `);
    }
    */

    for (const extensionId of fs.ls("/extension")) {
        let extension = fs.read(`/extension/${extensionId}/extension.js`);
        extension = eval(extension);
        let image = fs.read(`/extension/${extensionId}/${extension.icon}`);
        $("#blockCategoryList").append(`
            <li data-name="${extension.name}" data-extension="1" data-extension-id="${extensionId}">
                <div class="icon"><img src="${image}" alt=""></div>
                <div class="label">${extension.name}</div>
            </li>
        `);
    }

    $("#blockCategoryList > li").click(function() {
        changeToolbox($(this).attr("data-name"), $(this).attr("data-extension") == 1, $(this).attr("data-extension-id"));
    });

    changeToolbox(blocksTree[0].name);
};

let changeToolbox = (categoryName, extension, extensionId) => {
    let category;
    if (!extension) {
        category = blocksTree.find(obj => obj.name == categoryName);
    } else {
        category = eval(fs.read(`/extension/${extensionId}/extension.js`));
    }
    // console.log(category);
    let toolboxTextXML = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">`;
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
    toolboxTextXML += `</xml>`;
    let toolboxXML = Blockly.Xml.textToDom(toolboxTextXML);
    // console.log(toolboxXML);
    blocklyWorkspace.updateToolbox(toolboxXML);

    $("#blockCategoryList > li").removeClass("active").css({ color: "" });
    $(`#blockCategoryList > li[data-name='${categoryName}']`).addClass("active").css({ 
        color: category.color
    });

    blocklyWorkspace.scrollbar.resize();
}

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

Blockly.updateToolbox = () => $("#blockCategoryList > li.active").click();

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
updataWorkspaceAndCategoryFromvFS();

blocklyWorkspace.addChangeListener(() => {
    try {
        var xmlText = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(blocklyWorkspace));
        fs.write("/main.xml", xmlText);
    } catch (e) {
        console.log(e);
    }
    localStorage.setItem("autoSaveFS", JSON.stringify(vFSTree));
});
/* -------------- */

let NotifyS = (msg) => Notiflix.Notify.Success(msg, { clickToClose: true }); 
let NotifyI = (msg) => Notiflix.Notify.Info(msg, { clickToClose: true }); 
let NotifyW = (msg) => Notiflix.Notify.Warning(msg, { clickToClose: true }); 
let NotifyE = (msg) => Notiflix.Notify.Failure(msg, { clickToClose: true }); 
let NotifyConfirm = (msg) => {
    return new Promise((resolve, reject) => {
        Notiflix.Confirm.Show('Are you Confirm ?', msg, 'Yes', 'No', function(){
            resolve(true);
        },
        function(){
            resolve(false);
        });
    });
}

tippy('[data-tippy-content]');


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
