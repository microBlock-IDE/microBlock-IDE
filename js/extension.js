let extensionIndexURL = "https://raw.githubusercontent.com/microBlock-IDE/microBlock-extension-index/master/main.json";
let extensionIndex = null;

let updateExtensionIndex = async () => {
    let extensionIndexFromAPI = await fetch(extensionIndexURL, { redirect: 'follow' });
    if (!extensionIndexFromAPI.ok) {
        NotifyE("Load extension index fail");
        return false;
    }
    extensionIndexFromAPI = await extensionIndexFromAPI.json();
    extensionIndex = extensionIndexFromAPI;

    return true;
}

let installExtension = async (extensionId) => {
    if (typeof extensionIndex[extensionId] === "undefined") {
        NotifyE("Not found " + extensionId + " in extension index");
        return false;
    }
    let extension = extensionIndex[extensionId];
    let extensionLocalPath = `/extension/${extensionId}`;
    
    let downloadRepo = await downloadRepoFromGitHubStoreInFS(extension.github, extensionLocalPath, msg => NotifyE(msg));
    if (!downloadRepo) {
        NotifyE("Download " + extension.name + " fail");
        return false;
    }

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

    updateBlockCategory();

    NotifyS(`Install ${extension.name} extension successful`);

    return true;
}

let removeExtension = async (extensionId) => {
    fs.remove(`/extension/${extensionId}`);

    updateBlockCategory();

    NotifyS(`Uninstall ${extensionId} successful`);

    return true;
}

$("#open-extension-dialog").click(async () => {
    $("#extension-dialog .extension-list").html('');

    ShowDialog($("#extension-dialog"));

    Notiflix.Block.Standard("#extension-dialog > section", 'Loading...');

    if (!extensionIndex) {
        if (!(await updateExtensionIndex())) {
            Notiflix.Block.Remove("#extension-dialog > section");
            return;
        }
    }
    
    let extensionInstalledList = fs.ls("/extension");
    for (const [id, info] of Object.entries(extensionIndex)) {
        $("#extension-dialog .extension-list").append(`
        <li>
            <div class="extension-box${extensionInstalledList.indexOf(id) >= 0 ? " installed" : ""}" data-extension-id="${id}">
                <div class="cover">
                    <img src="${info.github}/raw/master/${info.image}" alt="">
                    <button class="extension-install"><i class="fas fa-download"></i></button>
                    <button class="extension-uninstall"><i class="fas fa-trash"></i></button>
                </div>
                <div class="name">${info.name}</div>
                <div class="author">${info.author}</div>
                <div class="description">${info.description}</div>
            </div>
        </li>
        `);
    }

    Notiflix.Block.Remove("#extension-dialog > section");

    $(".extension-install").click(async function() {
        let extensionId = $(this).parents(".extension-box").attr("data-extension-id");
        let queryBox = `.extension-box[data-extension-id='${extensionId}']`;
        Notiflix.Block.Standard(queryBox, 'Installing...');

        if (await installExtension(extensionId)) {
            $(queryBox).addClass("installed");
        }

        Notiflix.Block.Remove(queryBox);
    });

    $(".extension-uninstall").click(async function() {
        let extensionId = $(this).parents(".extension-box").attr("data-extension-id");
        let queryBox = `.extension-box[data-extension-id='${extensionId}']`;

        if (removeExtension(extensionId)) {
            $(queryBox).removeClass("installed");
        }
    });
});

let uploadModuleList = [];

Blockly.Python.uploadModule = (module) => {
    uploadModuleList.push(module);
}

// $("#open-extension-dialog").click();
