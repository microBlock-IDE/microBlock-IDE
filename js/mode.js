let editor = null, editorReadonly = true;
let useMode = "block";
let onKeyUpTimer = null;

$("#mode-select-switch > li").click(async function() {
    let value = $(this).attr("data-value");
    if (value == 1) { // Block mode
        if (useMode === "code") {
            if (editor.getValue().length > 0) {
                if (!await NotifyConfirm("Code will convert to block (BETA). Are you confirm swith to block mode ?")) {
                    return;
                }
                updataWorkspaceAndCategoryFromvFS();
                codeFromMonacoToBlock();
            }
        }
        $("#blocks-editor").css("display", "flex");
        $("#code-editor").hide();
        Blockly.triggleResize();
        useMode = "block";
    } else if (value == 2) { // Code mode
        $("#blocks-editor").hide();
        $("#code-editor").css("display", "flex");

        let code = Blockly.Python.workspaceToCode(blocklyWorkspace);
        if (!editor){
            editor = monaco.editor.create($("#code-editor > article")[0], {
                language: 'python',
                readOnly: useMode === "code" ? false : true,
                automaticLayout: true
            }); 

            editor.onKeyUp(async (evant) => {
                if (evant.keyCode !== 0 && useMode !== "code") {
                    evant.preventDefault();
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

    }
    $("#mode-select-switch > li").removeClass("active");
    $(this).addClass("active");
});
