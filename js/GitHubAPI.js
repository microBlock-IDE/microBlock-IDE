
let downloadRepoFromGitHubStoreInFS = async (url, storePath, onError) => {
    if (!onError) onError = () => "";

    let gitRepoBase = /\/\/.+\/([^\/]+\/[^\/]+)\/?/gm.exec(url)[1];
    let repoTree = await fetch(`https://api.github.com/repos/${gitRepoBase}/git/trees/master?recursive=1`);
    if (!repoTree.ok) {
        return false;
    }
    repoTree = await repoTree.json();
    for (const object of repoTree.tree) {
        if (object.type === "blob") {
            if (object.size < 500 * 1023) { // Limit max file size 500kB
                await downloadFile(`https://api.github.com/repos/${gitRepoBase}/contents/${object.path}`, `${storePath}/${object.path}`);
            } else {
                onError(object.path + " over 500kB");
            }
        }
    }

    return true;
}

let downloadFile = async (url, saveAs) => {
    let fileDownload = await fetch(url, {
        redirect: "follow",
        headers: { 
            "Accept": (saveAs.endsWith(".png") || saveAs.endsWith(".jpg")) ? "application/vnd.github.v3+json" : "application/vnd.github.v3.raw" 
        },
    });
    if (!fileDownload.ok) {
        onError(url + " download fail");
        return false;
    }
    // console.log(fileDownload);
    if (fileDownload.headers.get("Content-Type").indexOf("application/json") >= 0) {
        let content = await fileDownload.json();
        content = content.content;
        if (saveAs.endsWith(".png") || saveAs.endsWith(".jpg")) {
            let imageType = saveAs.endsWith(".png") ? "png" : saveAs.endsWith(".jpg") ? "jpg" : "";
            fs.write(saveAs, "data:image/" + imageType + ";base64," + content);
        } else {
            fs.write(saveAs, Base64.decode(content));
        }
    } else {
        if (saveAs.endsWith(".js") || saveAs.endsWith(".json")) {
            fs.write(saveAs, await fileDownload.text());
        } else if (saveAs.endsWith(".png") || saveAs.endsWith(".jpg")) {
            let imageType = saveAs.endsWith(".png") ? "png" : saveAs.endsWith(".jpg") ? "jpg" : "";
            let uint8_content = new Uint8Array(await fileDownload.arrayBuffer());
            console.log(uint8_content);
            fs.write(saveAs, "data:image/" + imageType + ";base64," + btoa(String.fromCharCode.apply(null, uint8_content)));
        }
    }

    return true;
}
