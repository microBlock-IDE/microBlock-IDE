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
    for (let extension of extensionList) {
        $("#blockCategoryList").append(`
            <li data-name="${extension.name}" data-extension="1">
                <div class="icon"><img src="${extension.git}/raw/${extension.git_branch || 'master'}/${extension.icon}" alt=""></div>
                <div class="label">${extension.name}</div>
            </li>
        `);
    }

    $("#blockCategoryList > li").click(function() {
        changeToolbox($(this).attr("data-name"), $(this).attr("data-extension") == 1);
    });
};

updateBlockCategory();

let changeToolbox = (categoryName, extension) => {
    let category = (extension ? extensionList : blocksTree).find(obj => obj.name == categoryName);
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

changeToolbox(blocksTree[0].name);

Blockly.updateToolbox = () => $("#blockCategoryList > li.active").click();

/* Auto Save to localStorage */
let loadBlockFromAutoSave = async () => {
    let extensionListInProject = JSON.parse(localStorage.getItem("autoSaveExtension"));
    if (Array.isArray(extensionListInProject)) {
        if (await updateExtensionIndex()) {
            for (const extensionInfo of extensionListInProject) {
                await installExtension(extensionInfo.id);
            }
        }
    }

    let oldCode = localStorage.getItem("autoSaveCode");
    if (typeof oldCode === "string") {
        try {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(oldCode), blocklyWorkspace);
        } catch (e) {
            console.log(e);
        }
    }
}
$(loadBlockFromAutoSave);

blocklyWorkspace.addChangeListener(() => {
    try {
        var xmlText = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(blocklyWorkspace));
        localStorage.setItem("autoSaveCode", xmlText);
    } catch (e) {
        console.log(e);
    }
    localStorage.setItem("autoSaveExtension", JSON.stringify(extensionList));
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

