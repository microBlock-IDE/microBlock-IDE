
let uploadMBY = async () => {
    let fileContent = JSON.stringify(vFSTree);
    let fileUpload;
    try {
        fileUpload = await fetch("https://us-central1-ublock-c0a08.cloudfunctions.net/share/upload", { 
            method: "post",
            body: fileContent,
            redirect: "follow"
        });

        fileUpload = await fileUpload.json();
    } catch (error) {
        NotifyE("Connect to server fail !");
        return false;
    }
    

    if (fileUpload.error) {
        NotifyE("Upload file to server fail !");
        return false;
    }

    return fileUpload.fileName;
}

let blocklyWorkspaceShare = null;
$("#code-share").click(async function(e) { 
    e.preventDefault();

    $("#code-share-dialog").show();
    Notiflix.Block.Standard("#code-share-dialog > section", 'Loading...');
    
    if (!blocklyWorkspaceShare) {
        blocklyWorkspaceShare = Blockly.inject($("#code-share-dialog .preview-block")[0], {
            media: 'blockly/media/',
            grid : {
                spacing : 25, 
                length : 1, 
                colour : '#888', 
                snap : true
            },
            zoom: {
                startScale: 1,
                controls: true,
            },
            readOnly: true,
        });
        blocklyWorkspaceShare.zoomControls_.svgGroup_.remove();
    }

    blocklyWorkspaceShare.clear();
    Blockly.Xml.domToWorkspace(Blockly.Xml.workspaceToDom(blocklyWorkspace), blocklyWorkspaceShare);
    blocklyWorkspaceShare.zoomToFit();

    fileName = await uploadMBY();
    if (!fileName) {
        Notiflix.Block.Remove("#code-share-dialog > section");
        return;
    }

    Notiflix.Block.Remove("#code-share-dialog > section");
});

$("#code-share-dialog .bottom-menu > li").click(async function(e) { 
    e.preventDefault();

    let type = $(this).attr("data-type");
    let openURL = false;
    let shareURL = `https://ide.microblock.app/?open=${fileName}`;
    if (type === "link") {
        navigator.clipboard.writeText(shareURL);
        NotifyS(`Copied: ${shareURL}`);
    } else if (type === "facebook") {
        openURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(shareURL)}`;
    } else if (type === "line") {
        openURL = `https://social-plugins.line.me/lineit/share?url=${encodeURI(shareURL)}`;
    } else if (type === "twitter") {
        openURL = `https://twitter.com/intent/tweet?url=${encodeURI(shareURL)}&text=`;
    } else if (type === "code") {
        let code = `<div class="microBlock-embed" open="${fileName}" width="0" height="0"></div><script src="https://ide.microblock.app/embed.js"></script>`;
        navigator.clipboard.writeText(code);
        NotifyS(`Copied: <HTML Code>`);
    }

    if (openURL) {
        if (!isElectron) {
            window.open(openURL, "_blank");
        } else {
            shell.openExternal(openURL);
        }
    }
});

$("#code-share-dialog .close-btn").click(() => $("#code-share-dialog").hide());
