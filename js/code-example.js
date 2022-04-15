const blocklyDivExampleCode = document.querySelector("#blocklyDivExampleCode");
blocklyWorkspaceExampleCode = Blockly.inject(blocklyDivExampleCode, {
    media: 'blockly/media/',
    toolbox: "",
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
        maxScale: Infinity,
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
    readOnly: true
});

const codeEditorExampleCode = document.querySelector("#codeEditorExampleCode");
editorCodeExample = monaco.editor.create(codeEditorExampleCode, {
    language: 'python',
    readOnly: true,
    automaticLayout: true
});

$("#code-example-mode-select-switch > li").click(async function () {
    let value = $(this).attr("data-value");
    if (value == 1) { // Block mode
        $("#blocklyDivExampleCode").show();
        $("#codeEditorExampleCode").hide();
        Blockly.svgResize(blocklyWorkspaceExampleCode);
        blocklyWorkspaceExampleCode.scrollCenter();
    } else if (value == 2) { // Code mode
        $("#blocklyDivExampleCode").hide();
        $("#codeEditorExampleCode").show();

        let code = Blockly.Python.workspaceToCode(blocklyWorkspaceExampleCode);
        editorCodeExample.setValue(code);
        editorCodeExample.layout();
    }
    $("#code-example-mode-select-switch > li").removeClass("active");
    $(this).addClass("active");
});

const openExampleDialog = () => {
    if ($("#example-list-item > li").length <= 0) {
        $("#example-list-item").html("");
        
        // Get board example
        const board = boards.find(board => board.id === boardId);
        
        $("#example-list-item").append(`<li class="sub-header">Board Example</li>`);
        (board?.examples || []).forEach((item, index) => {
            if (typeof item === "string") {
                $("#example-list-item").append(`<li class="sub-header">${item}</li>`);
            } else {
                $("#example-list-item").append(`
                    <li>
                        <a 
                            href="#" 
                            data-index="${index}" 
                            data-type="board"
                            data-files="${item?.files || ""}"
                        >${item.name}</a></li>
                `);
            }
        });
    }

    $("#example-list-item > li > a").click(async function(e) {
        e.preventDefault();

        const rawFileData = await (await fetch(`boards/${boardId}/${$(this).attr("data-files")}.mby`)).text();
        const local_vFSTree = JSON.parse(rawFileData);
        const xmlCode = local_vFSTree["main.xml"];

        blocklyWorkspaceExampleCode.clear();
        try {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlCode), blocklyWorkspaceExampleCode);
        } catch (e) {
            console.log(e);
        }
        blocklyWorkspaceExampleCode.scrollCenter();
    
        $("#example-list-item > li").removeClass("active");
        $(this).parent().addClass("active");

        $("#noSelectExampleFile").hide();
        $("#code-example-mode-select-switch > li.active").click();
    });
    
    // console.log(board?.examples || []);
    ShowDialog($("#code-example-dialog"));
    Blockly.svgResize(blocklyWorkspaceExampleCode);
}

const addExampleCodeToMain = async () => {
    const fileMby = $("#example-list-item > li.active > a").attr("data-files");
    if (!fileMby) {
        return;
    }
    const rawFileData = await (await fetch(`boards/${boardId}/${fileMby}.mby`)).text();
    const local_vFSTree = JSON.parse(rawFileData);
    const xmlCode = local_vFSTree["main.xml"];

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlCode), blocklyWorkspace);
    $("#code-example-dialog .close-dialog").click();
};

$("#add-example-code-to-workspace").click(addExampleCodeToMain);
$("#open-example-dialog").click(openExampleDialog);
