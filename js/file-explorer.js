const select_file = file => {
    if (file != file_name_select) {
        file_name_select = file;
        updateWorkspace();
    }
    $("#file-explorer-dialog").css("display", "none");
    { // Notify
        const msg = "Switch to file " + file.replace(/\.(py|xml)/, "");
        NotifyS(msg);
        statusLog(msg);
    }
}

const updateProjectFileSelectEventHandle = () => {
    $("#project-file-list > li").on("click", function() {
        select_file($(this).attr("data-file"));
    })
};

$("#file-explorer-open-btn").on("click", () => {
    $("#file-explorer-dialog").css("display", "block");
    let list_code = "";
    for (const file_name of fs.ls("/")) {
        if (!file_name.endsWith(".py") && !file_name.endsWith(".xml")) { // Show only .py and .xml
            continue;
        }

        const file_type = file_name.endsWith(".py") ? "python" : "block";
        const file_icon = file_name.endsWith(".py") ? "fab fa-python" : "fas fa-cube";
        list_code += `<li class="${file_type + (file_name === file_name_select ? " active" : "")}" data-file="${file_name}"><i class="${file_icon}"></i><span>${file_name.replace(/\.(py|xml)/, "")}</span></li>`
    }
    $("#project-file-list").html(list_code);
    updateProjectFileSelectEventHandle();
});

$("#new-file").on("click", () => {
    Blockly.dialog.prompt("Enter new file name", "", file_name => {
        if (!file_name) {
            return;
        }
        if (fs.ls("/").map(a => a.replace(/\.(py|xml)/, "")).indexOf(file_name) >= 0) {
            Blockly.dialog.alert("'" + file_name + "' is already a file with same name");
            return;
        }
        fs.write(`/${file_name}.xml`, "");
        select_file(file_name + ".xml");
    });
});
