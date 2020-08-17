let modulesContent = [ ];

let extensionIndexURL = "https://raw.githubusercontent.com/microBlock-IDE/microBlock-extension-index/master/main.json";
let extensionIndex = [ ];

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

$("#open-extension-dialog").click(async () => {
    $("#extension-dialog .extension-list").html('');

    ShowDialog($("#extension-dialog"));

    Notiflix.Block.Standard("#extension-dialog > section", 'Loading...');

    if (!(await updateExtensionIndex())) {
        Notiflix.Block.Remove("#extension-dialog > section");
        return;
    }
    
    for (const [id, info] of Object.entries(extensionIndex)) {
        $("#extension-dialog .extension-list").append(`
        <li>
            <div class="extension-box" data-extension-id="${id}">
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
});

let uploadModuleList = [];

Blockly.Python.uploadModule = (module) => {
    uploadModuleList.push(module);
}

// $("#open-extension-dialog").click();
