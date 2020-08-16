let modulesContent = [ ];

let extensionIndexURL = "https://raw.githubusercontent.com/microBlock-IDE/microBlock-extension-index/master/main.json";
let extensionIndex;

let updateExtensionIndex = async () => {
    extensionIndex = await fetch(extensionIndexURL, { redirect: 'follow' });
    if (!extensionIndex.ok) {
        NotifyE("Load extension index fail");
        return false;
    }
    extensionIndex = await extensionIndex.json();
    extensionIndex = extensionIndex.extension;

    return true;
}

let installExtension = async (extensionId) => {
    if (typeof extensionIndex[extensionId] === "undefined") {
        NotifyE("Not found " + extensionId + " in extension index");
        return false;
    }

    let extension = extensionIndex[extensionId];
    extension.git_branch = extension.git_branch || 'master';
    let repoPath = `https://raw.githubusercontent.com/${extension.git.match(/\/\/.+(\/[^\/]+\/[^\/]+)\/?$/)[1]}/${extension.git_branch}`;

    // Get extension info from extension.js
    let extensionInfo = await fetch(`${repoPath}/extension.js`, { redirect: 'follow' });
    if (!extensionInfo.ok) {
        NotifyE("Load extension info file fail");
        return false;
    }
    extensionInfo = await extensionInfo.text();
    try {
        extensionInfo = eval(extensionInfo);
    } catch (e) {
        NotifyE(`Install extension fail, ${e.toString()}`);
        return false;
    }

    extensionInfo.id = extensionId;
    extensionInfo.git = extension.git;
    extensionInfo.git_branch = extension.git_branch;

    // Download script file
    for (const file of extensionInfo.scripts) {
        let scriptFile = await fetch(`${repoPath}/${file}`, { redirect: 'follow' });
        if (!scriptFile.ok) {
            NotifyE("Download script fail");
            continue;
        }
        try {
            eval(await scriptFile.text());
        } catch (e) {
            NotifyE("Script run error: " + e.toString());
            console.error(e);
        }
    }

    // Download module file
    for (const file of extensionInfo.modules) {
        let moduleFile = await fetch(`${repoPath}/${file}`, { redirect: 'follow' });
        if (!moduleFile.ok) {
            NotifyE("Download module fail");
            continue;
        }
        modulesContent.push({
            name: file,
            content: await moduleFile.arrayBuffer()
        });
    }

    extensionList.push(extensionInfo);
    updateBlockCategory();

    NotifyS(`Install ${extensionInfo.name} extension successful`);

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
    
    for (const [id, info] of extensionIndex.entries()) {
        $("#extension-dialog .extension-list").append(`
        <li>
            <div class="extension-box" data-extension-id="${id}">
                <div class="cover">
                    <img src="${info.git}/raw/${info.git_branch || 'master'}/${info.image}" alt="">
                    <button class="extension-install"><i class="fas fa-download"></i></button>
                    <button class="extension-uninstall"><i class="fas fa-trash"></i></button>
                </div>
                <div class="name">${info.title}</div>
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

