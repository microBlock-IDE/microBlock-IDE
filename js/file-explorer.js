const select_file = file => {
    if (file != file_name_select) {
        file_name_select = file;
        updateWorkspace();
    }
    $("#file-explorer-dialog").removeClass("active");
    { // Notify
        const msg = "Switch to file " + file.replace(/\.(py|xml)/, "");
        NotifyS(msg);
        statusLog(msg);
    }
};

const delete_file = file => {
    fs.remove(`/${file}`);
    $("#file-explorer-open-btn").click();
};

const updateProjectFileSelectEventHandle = () => {
    $("#project-file-list > li").on("click", function(e) {
        if ($(e.target).hasClass("fa-trash")) {
            e.preventDefault();
            return;
        }

        select_file($(this).attr("data-file"));
    });

    $("#project-file-list > li .delete-btn").on("click", function(e) {
        if (!$(e.target).hasClass("fa-trash")) {
            e.preventDefault();
            return;
        }

        delete_file($(this).parents("li").attr("data-file"));
    });
};

const updateExtensionSelectEventHandle = () => {
    $("#extension-list > li .delete-btn").on("click", function(e) {
        if (!$(e.target).hasClass("fa-trash")) {
            e.preventDefault();
            return;
        }

        const extension_id = $(this).parents("li").attr("data-extension-id");
        fs.remove(`/extension/${extension_id}`);
        if (isElectron) {
            let path = `${sharedObj.extensionDir}/${extension_id}`;
            if (nodeFS.existsSync(path)) {
                nodeFS.rmdirSync(path, { recursive: true });
            }
        }

        updateBlockCategory();
        $("#file-explorer-open-btn").click();
    });
}

$("#file-explorer-open-btn").on("click", () => {
    $("#file-explorer-dialog").addClass("active");

    // Project file list
    let list_code = "";
    for (const file_name of fs.ls("/")) {
        if (!file_name.endsWith(".py") && !file_name.endsWith(".xml")) { // Show only .py and .xml
            continue;
        }

        const file_type = file_name.endsWith(".py") ? "python" : "block";
        const file_icon = file_name.endsWith(".py") ? "fab fa-python" : "fas fa-cube";
        list_code += `
            <li class="${file_type + (file_name === file_name_select ? " active" : "")}" data-file="${file_name}">
                <i class="${file_icon}"></i>
                <span>${file_name.replace(/\.(py|xml)/, "")}</span>
                <button style="display: ${[ "main.py", "main.xml" ].indexOf(file_name) >= 0 ? "none" : "block"}" class="delete-btn"><i class="fas fa-trash"></i></button>
            </li>
        `;
    }
    $("#project-file-list").html(list_code);
    updateProjectFileSelectEventHandle();

    // Extension list
    list_code = "";
    let extension_installed_list = fs.ls("/extension");
    if (isElectron) {
        extension_installed_list = extension_installed_list.concat(nodeFS.ls(sharedObj.extensionDir));
    }
    for (const extension_id of extension_installed_list) {
        let extension = fs.read(`/extension/${extension_id}/extension.js`);
        extension = eval(extension);
        list_code += `
            <li data-extension-id="${extension_id}">
                <i class="fas fa-cubes"></i>
                <span>${extension?.name || "?"}</span>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </li>
        `;
    }
    $("#extension-list").html(list_code);
    updateExtensionSelectEventHandle();
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

const import_file = (file_name, file_data) => {
    console.log(file_name, file_data);
    fs.write(`/${file_name}`, file_data);
    $("#file-explorer-open-btn").click();
};

$("#import-file").on("click", async () => {
    if (!isElectron) {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".py";
        input.addEventListener("change", function() {
            // console.log(this.files);
            const file_name = this.files[0];
            const fr = new FileReader();
            fr.onload = async () => {
                import_file(file_name, fr.result);
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
                name: 'Python',
                extensions: ['py']
            }]
        });

        if (result == undefined) {
            return;
        }

        const file_path = result[0];

        nodeFS.readFile(file_path, async (err, data) => {
            if (err) {
                NotifyE("Import fail: " + err.toString());
                return;
            }

            import_file(file_path.split(/[\\\/]/).pop(), data.toString());
        });
    }
});

$("#import-extension").on("click", async () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".zip";
    input.addEventListener("change", async function () {
        // console.log(this.files);
        const file_name = this.files[0];
        const zipReader = new zip.ZipReader(new zip.BlobReader(file_name));
        const entries = await zipReader.getEntries("cp437");
        for (const item of entries) {
            if (item.directory) { // Skip
                continue;
            }

            const file_path = item.filename;
            if (file_path.endsWith(".js") || file_path.endsWith(".py")) {
                const data = await item.getData(new zip.TextWriter());
                fs.write(`/extension/${file_path}`, data);
            } else if (file_path.endsWith(".png") || file_path.endsWith(".jpg")) {
                const data = await item.getData(new zip.Data64URIWriter(file_path.endsWith(".png") ? "image/png" : "image/jpeg"));
                fs.write(`/extension/${file_path}`, data);
            }
        }

        updataWorkspaceAndCategoryFromvFS(true); // disable load fs
        $("#file-explorer-open-btn").click();
    }, false);
    input.click();
});

$("#file-explorer-dialog").click(e => {
    if (e.target.id !== "file-explorer-dialog") {
        return;
    }

    $("#file-explorer-dialog").removeClass("active");
});
