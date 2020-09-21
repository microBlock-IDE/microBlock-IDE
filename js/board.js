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
    for (let board of boards) {
        $("#project-create-dialog #hardware-select ul").append(`
            <li>
                <div data-board-id="${board.id}">
                    <div class="image"><img src="${rootPath}/boards/${board.id}/${board.image}" alt=""></div>
                    <div class="name">${board.name}</div>
                </div>
            </li>
        `)
    }

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
        $("#level-select ul > li:first-child > div").click();
    });

    imageSelectUpdate("#hardware-select");
    $("#hardware-select ul > li:first-child > div").click();

    $("#project-create-dialog").show();
});

$("#project-create-dialog .close-btn").click(() => $("#project-create-dialog").hide())

let loadBoard = async () => {
    if (!boardId || !levelName) {
        return;
    }
    let board = boards.find(board => board.id === boardId);
    for (let fPath of board.script) {
        let script = await fetch(`${rootPath}/boards/${board.id}/${fPath}`);
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

    blocklyWorkspace.clear();
    if (editor) editor.setValue("");
    vFSTree = "";
    vFSTree = { };

    updateBlockCategory();

    $("#board-name").text(board.name);
    $("#level-name").text(levelName);
}

$("#create-project-btn").click(async () => {
    let projectName = $("#project-name-input").val();
    boardId = $("#project-create-dialog #hardware-select ul > li > div.active").attr("data-board-id");
    levelName = $("#project-create-dialog #level-select ul > li > div.active").attr("data-level-name");

    await loadBoard();
    
    $("#project-name").val(projectName);

    $("#project-create-dialog").hide();
    NotifyS("New project " + projectName);
    statusLog("New project " + projectName);
});
