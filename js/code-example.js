
setTimeout(() => ShowDialog($("#code-example-dialog")), 100);

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