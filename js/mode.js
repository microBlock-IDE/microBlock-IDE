var editor = null, editorReadonly = true;

$("#mode-select-switch > li").click(function() {
    let value = $(this).attr("data-value");
    if (value == 1) { // Block mode
        if (!editorReadonly) {
            codeFromMonacoToBlock();
        }
        $("#blocks-editor").css("display", "flex");
        $("#code-editor").hide();
        Blockly.triggleResize();
    } else if (value == 2) { // Code mode
        $("#blocks-editor").hide();
        $("#code-editor").css("display", "flex");

        let code = Blockly.Python.workspaceToCode(blocklyWorkspace);
        if (!editor){
            editor = monaco.editor.create($("#code-editor > article")[0], {
                language: 'python',
                readOnly: true,
                automaticLayout: true
            }); 

            editor.onKeyUp(async (evant) => {
                if (evant.keyCode !== 0 && editorReadonly) {
                    evant.preventDefault();
                    if (await NotifyConfirm("If edit code, program in block will lost. Are you want to edit ?")) {
                        editor.updateOptions({ readOnly: false });
                        editorReadonly = false;
                    } else {
                        editor.updateOptions({ readOnly: true });
                        editorReadonly = true;
                    }
                }
            });
        }

        editorReadonly = true;
        editor.setValue(code);

        editor.layout();
        
    } else { // ????

    }
    $("#mode-select-switch > li").removeClass("active");
    $(this).addClass("active");
});
