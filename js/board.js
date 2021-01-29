let boards = [];
let boardId = null;
let levelName = null;

let addBoard = (board) => {
    boards.push(board);
};

$("#new-project").click(async () => {
    if (!(await NotifyConfirm("All blocks will lost. Are you sure of new project ?"))) {
        return;
    }

    $("#project-create-dialog #hardware-select ul").html("");
    (() => {
        let board = boards.find(board => board.id === boardId);
        $("#project-create-dialog #hardware-select ul").append(`
            <li>
                <div data-board-id="${board.id}">
                    <div class="image"><img src="${rootPath}/boards/${board.id}/${board.image}" alt=""></div>
                    <div class="name">${board.name}</div>
                </div>
            </li>
        `);
    })();
    let index = 1;
    for (let board of boards) {
        if (board.id === boardId) {
            continue;
        }
        $("#project-create-dialog #hardware-select ul").append(`
            <li class="${index > 4 ? "show-when-click-see-more" : ""}">
                <div data-board-id="${board.id}">
                    <div class="image"><img src="${rootPath}/boards/${board.id}/${board.image}" alt=""></div>
                    <div class="name">${board.name}</div>
                </div>
            </li>
        `);
        index++;
    }
    $("#board-see-more-btn").show();

    $("#project-create-dialog #hardware-select ul > li > div").click(function() {
        let boardId = $(this).attr("data-board-id");
        let board = boards.find(board => board.id === boardId);
        // console.log(board);

        $("#project-create-dialog #level-select ul").html("");
        for (let level of board.level) {
            $("#project-create-dialog #level-select ul").append(`
                <li>
                    <div data-level-name="${level.name}">
                        <div class="image"><img src="${rootPath}/boards/${board.id}/${level.icon}" alt=""></div>
                        <div class="name">${level.name}</div>
                    </div>
                </li>
            `)
        }

        imageSelectUpdate("#level-select");
        $(`#level-select ul > li:first-child > div`).click();
    });

    imageSelectUpdate("#hardware-select");
    $(`#hardware-select ul > li > div[data-board-id='${boardId}']`).click();

    $("#project-create-dialog").show();
});

$("#board-see-more-btn").click(function() {
    $("#project-create-dialog #hardware-select ul > li").removeClass("show-when-click-see-more");
    $(this).hide();
});

$("#project-create-dialog .close-btn").click(() => $("#project-create-dialog").hide())

let loadBoard = async () => {
    if (!boardId || !levelName) {
        return;
    }
    let board = boards.find(board => board.id === boardId);
    let scripts = [ ];
    scripts = scripts.concat(board.script);
    scripts = scripts.concat(board.blocks);
    if (typeof board.simulator !== "undefined") {
        scripts = scripts.concat(board.simulator.script);
    }
    for (let fPath of scripts) {
        let script;
        try {
            script = await fetch(`${rootPath}/boards/${board.id}/${fPath}`);
        } catch (e) {
            console.warn(e);
            continue;
        }
        if (script.status === 200) {
            try {
                eval(await script.text());
            } catch (e) {
                console.warn(e);
            }
        } else {
            console.warn(script);
        }
    }

    for (let fPath of board.css) {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = `${rootPath}/boards/${board.id}/${fPath}`;
        document.head.appendChild(link);
    }

    updateBlockCategory();

    autoCompletionDictionary = board.autoCompletion;

    $("#board-name").text(board.name);
    $("#level-name").text(levelName);

    if (typeof board.simulator !== "undefined") {
        let last_deivce_mode = +localStorage.getItem("last_deivce_mode");
        switchModeTo(last_deivce_mode);
    } else {
        switchModeTo(MODE_REAL_DEVICE);
    }
}

$("#create-project-btn").click(async () => {
    let projectName = $("#project-name-input").val();
    boardId = $("#project-create-dialog #hardware-select ul > li > div.active").attr("data-board-id");
    levelName = $("#project-create-dialog #level-select ul > li > div.active").attr("data-level-name");

    await loadBoard();

    blocklyWorkspace.clear();
    if (editor) editor.setValue("");
    // vFSTree = "";
    // vFSTree = { };
    if (useMode === "block") {
        fs.write("/main.xml", "");
        updataWorkspaceAndCategoryFromvFS();
        blocklyWorkspace.setScale(1);
        blocklyWorkspace.scrollCenter();

    } else if (useMode === "code") {
        fs.write("/main.py", "");
    }

    $("#project-name").val(projectName);

    $("#project-create-dialog").hide();
    NotifyS("New project " + projectName);
    statusLog("New project " + projectName);
});
