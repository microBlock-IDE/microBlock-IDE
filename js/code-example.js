$("#code-example-mode-select-switch > li").click(async function () {
    let value = $(this).attr("data-value");
    /*if (value == 1) { // Block mode
        if (useMode === "code") {
            if (editor.getValue().length > 0) {
                if (!await NotifyConfirm("Code will convert to block (BETA). Are you confirm swith to block mode ?")) {
                    return;
                }
                updataWorkspaceAndCategoryFromvFS();
                codeFromMonacoToBlock();
            }
            editor.updateOptions({ readOnly: true });
        }
        $("#blocks-editor").css("display", "flex");
        $("#code-editor").hide();
        Blockly.triggleResize();
    } else if (value == 2) { // Code mode
        $("#blocks-editor").hide();
        $("#code-editor").css("display", "flex");

        let code = Blockly.Python.workspaceToCode(blocklyWorkspace);
        if (!editor) {
            editor = monaco.editor.create($("#code-editor > article")[0], {
                language: 'python',
                readOnly: useMode === "code" ? false : true,
                automaticLayout: true
            });

            editor.onKeyUp(async (evant) => {
                // console.log(evant);

                let allowKey = [
                    8, // CapsLock
                    9, // ESC
                    6, // AltLeft
                    60, // F2
                    61, // F3
                    62, // F4
                    63, // F5
                    64, // F6
                    65, // F7
                    66, // F8
                    67, // F9
                    68, // F10
                    69, // F11
                    70, // F12
                    15, // ArrowLeft
                    16, // ArrowUp
                    17, // ArrowRight
                    18, // ArrowDown
                ]
                if (!evant.ctrlKey && !evant.metaKey && !evant.shiftKey && allowKey.indexOf(evant.keyCode) === -1 && useMode !== "code") {
                    evant.preventDefault();
                    if (isEmbed) { 
                        return;
                    }
                    if (await NotifyConfirm("If edit code, program in block will lost. Are you want to edit ?")) {
                        editor.updateOptions({ readOnly: false });
                        useMode = "code";
                    } else {
                        editor.updateOptions({ readOnly: true });
                        useMode = "block";
                    }
                }

                if (useMode === "code") {
                    if (onKeyUpTimer) clearTimeout(onKeyUpTimer);
                    onKeyUpTimer = setTimeout(() => {
                        saveCodeToLocal();
                    }, 1000);
                }
            });
        }

        editor.setValue(code);

        editor.layout();

    } else { // ????

    }*/
    $("#code-example-mode-select-switch > li").removeClass("active");
    $(this).addClass("active");
});

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

const openExampleDialog = () => {
    $("#example-list-item").html("");
    
    // Get board example
    const board = boards.find(board => board.id === boardId);
    
    $("#example-list-item").append(`<li class="sub-header">Board Example</li>`);
    (board?.examples || []).forEach((item, index) => {
        $("#example-list-item").append(`
            <li>
                <a 
                    href="#" 
                    data-index="${index}" 
                    data-type="board"
                    data-files="${item?.files || ""}"
                >${item.name}</a></li>
        `);
    });

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
    });
    
    // console.log(board?.examples || []);
    ShowDialog($("#code-example-dialog"));
    Blockly.svgResize(blocklyWorkspaceExampleCode);
}

setTimeout(() => {
    openExampleDialog();
}, 1000);