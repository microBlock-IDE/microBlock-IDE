const github_client_id = "5fd432a542e37673decb";
let github_token = null;
let github_project_repo = null;
let github_project_file_last_sha = null;

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
        if (saveAs.endsWith(".png") || saveAs.endsWith(".jpg")) {
            let imageType = saveAs.endsWith(".png") ? "png" : saveAs.endsWith(".jpg") ? "jpg" : "";
            let uint8_content = new Uint8Array(await fileDownload.arrayBuffer());
            console.log(uint8_content);
            fs.write(saveAs, "data:image/" + imageType + ";base64," + btoa(String.fromCharCode.apply(null, uint8_content)));
        } else {
            fs.write(saveAs, await fileDownload.text());
        }
    }

    return true;
}

// GitHub
$("#github-signin").click(() => {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${github_client_id}&redirect_uri=${window.location.href.replace(/\?.*/, "")}`;
});

(async () => {
    // Chack 'code' parameter
    await (async () => {
        let m = /code=([^&]+)/.exec(window.location.href);
        if (m) {
            let code = m[1];
            console.log("GitHub Code:", code);
            
            let access_token = await fetch("https://us-central1-ublock-c0a08.cloudfunctions.net/github/get_token", { 
                method: "post",
                body: code,
                redirect: "follow"
            });

            if (access_token.status !== 200) {
                console.error("GitHub Get token error", await access_token.text());
                return;
            }

            access_token = await access_token.text();
            localStorage.setItem("access_token", access_token);
        }
    })();

    // Get user profile
    await (async () => {
        github_token = localStorage.getItem("access_token");
        if (github_token) {
            let user_info = await fetch("https://api.github.com/user", { 
                redirect: "follow",
                headers: { 
                    "Authorization": `token ${github_token}`,
                    "Accept": "application/json"
                }
            });

            if (user_info.status !== 200) {
                console.error("GitHub Get User Info error", await access_token.text());
                return;
            }

            user_info = await user_info.json();
            // console.log("User Info", user_info);

            $("#github_avatar").show().attr("src", user_info.avatar_url).show();
            $("#github-signin").hide();

            NotifyS(`Sign in with GitHub (Username: ${user_info.login})`)
            $("#open-github-dialog").show();
        }
    })();
})();

$("#github_avatar").click(() => {
    localStorage.removeItem("access_token");
    github_token = null;
    $("#github_avatar").hide();
    $("#github-signin").show();
    $("#open-github-dialog").hide();

    NotifyS("Sign out GitHub")
});

$("#open-github-dialog").click(() => {
    $("#github-dialog header > ul > li:first-child").click();

    $("#github-repository-list").html("");
    Notiflix.Block.Standard("#github-repository-list", 'Loading...');
    (async() => {
        let list_repo = await fetch("https://api.github.com/user/repos?visibility=public&sort=updated&direction=desc", { 
            redirect: "follow",
            headers: { 
                "Authorization": `token ${github_token}`,
                "Accept": "application/json"
            }
        });

        Notiflix.Block.Remove("#github-repository-list");

        if (list_repo.status !== 200) {
            console.error("GitHub Get Repo error", await list_repo.text());
            return;
        }

        list_repo = await list_repo.json();
        console.log("Repo list", list_repo);

        for (let repo of list_repo) {
            $("#github-repository-list").append(`<li data-url="${repo.full_name}"><i class="fab fa-github-alt"></i> ${repo.full_name.split("/")[0]}/<strong>${repo.full_name.split("/")[1]}</strong></li>`);
        }

        $("#github-repository-list > li").click(function() {
            $("#github-repository-list > li").removeClass("active");
            $(this).addClass("active");
        });

        $("#github-open-project-button").click(async function(e) {
            github_project_repo = $("#github-repository-list > li.active").attr("data-url");
            if (!github_project_repo) {
                NotifyE("Haven't selected a project yet")
                github_project_repo = null;
                return;
            }

            if (!await NotifyConfirm("All blocks will lost. Are you sure of open project ?")) {
                return;
            }

            Notiflix.Block.Standard("#github-dialog-open", 'Loading...');
            if (await openCodeFromGithub()) {
                $("#github-dialog .close-btn").click();
            }
            Notiflix.Block.Remove("#github-dialog-open");
        });        
    })();
    
    $("#github-dialog").show();
});

$("#github-dialog .close-btn").click(() => $("#github-dialog").hide());

$("#github-dialog header > ul > li").click(function() {
    let e = $(this).attr("data-active");
    $("#github-dialog > section > section").hide();
    $(e).show();

    $("#github-dialog header > ul > li").removeClass("active");
    $(this).addClass("active");
});

let saveCodeToGitHub = async () => {
    let putBody = JSON.stringify({
        message: (!github_project_file_last_sha) ? "Init" : "Update",
        committer: {
            name: "microBlock IDE",
            email: "noreplay@microblock.app"
        },
        content: btoa(JSON.stringify(vFSTree)),
        sha: github_project_file_last_sha
    });
    
    let file_upload = await fetch(`https://api.github.com/repos/${github_project_repo}/contents/${github_project_repo.split("/")[1]}.mby`, { 
        method: "put",
        body: putBody,
        redirect: "follow",
        headers: { 
            "Authorization": `token ${github_token}`,
        }
    });
    
    if (file_upload.status !== 201 && file_upload.status !== 200) {
        let error = await file_upload.text();
        console.warn("Upload project file", error);
        NotifyE("Upload project file fail, see console to more detail");
    } else {
        file_upload = await file_upload.json();
        github_project_file_last_sha = file_upload.content.sha;
        NotifyS("Update code to GitHub successful");
    }
}

$("#form-github-create-project").submit(async function(e) {
    e.preventDefault();

    Notiflix.Block.Standard("#form-github-create-project", 'Loading...');

    let post_data = { };

    for (let field of $(this).serializeArray()) {
        post_data[field.name] = field.value;
    }

    let create_repo = await fetch("https://api.github.com/user/repos", { 
        method: "POST",
        redirect: "follow",
        headers: { 
            "Authorization": `token ${github_token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post_data)
    });

    if (create_repo.status !== 201) {
        console.error("GitHub Create Repo error", await create_repo.text());
        NotifyE("Create Repo fail, see console to more detail");
        Notiflix.Block.Remove("#github-repository-list");
        return;
    }

    create_repo = await create_repo.json();

    github_project_repo = create_repo.full_name;

    NotifyS("Create repository successful");

    if (post_data["save-code"] == 1) {
        await saveCodeToGitHub();
    }

    Notiflix.Block.Remove("#github-repository-list");
    $("#github-dialog .close-btn").click();

    return false;
});

let openCodeFromGithub = async () => {
    let file_load = await fetch(`https://api.github.com/repos/${github_project_repo}/contents/${github_project_repo.split("/")[1]}.mby`, { 
        method: "GET",
        redirect: "follow",
        headers: { 
            "Authorization": `token ${github_token}`,
        }
    });
    
    if (file_load.status !== 200) {
        let error = await file_load.text();
        console.warn("Open project from GitHub fail", error);
        NotifyE("Open project from GitHub fail, see console to more detail");
    } else {
        file_load = await file_load.json();

        // Update code to GUI
        vFSTree = JSON.parse(atob(file_load.content));
        if (!vFSTree) {
            vFSTree = { };
            NotifyE("Project file error !");
            github_project_repo = null;
            github_project_file_last_sha = null;
            return;
        }
        let configFileContent = fs.read("/config.json");
        // console.log(configFileContent)
        if (configFileContent) {
            let projectConfig = JSON.parse(configFileContent);
            if (projectConfig) {
                useMode = projectConfig.mode;
                if (useMode === "block") {
                    updataWorkspaceAndCategoryFromvFS();
                } else if (useMode === "code") {
                    $("#mode-select-switch > li[data-value='2']").click();
                    $(() => {
                        while(!editor) {
                            sleep(100);
                        }
                        let code = fs.read("main.py");
                        if (code) {
                            editor.setValue(code);
                        }
                    });
                }
            }
        } else {
            updataWorkspaceAndCategoryFromvFS();
        }
        // --------------------------

        github_project_file_last_sha = file_load.sha;
        NotifyS("Open project " + github_project_repo.split("/")[1] + " from GitHub successful");

        return true;
    }

    return false;
};
