let boards = [];
let boardId = null;
let levelName = null;

let addBoard = board => boards.push(board);

let boardIdSelect = null;

$("#new-project").click(async () => {
    if (!(await NotifyConfirm("All blocks will lost. Are you sure of new project ?"))) {
        return;
    }

    boardIdSelect = boardId || "kidbright32-v1.3";

    const tags_list =   [ "Recommend" ]
                        .concat(boards
                                    .map(a => a.tags)
                                    .reduce((accumulator, currentValue) => accumulator.concat(currentValue))
                                    .filter((item, index, arr) => arr.indexOf(item) === index)
                                    .sort()
                                );
    // console.log("tags list", tags_list);
    $("#boards-tags-list").html(tags_list.map(tag => `<li>${tag}</li>`).join(""));
    $("#boards-tags-list > li").click(e => {
        $("#boards-tags-list > li").removeClass("active");
        $(e.currentTarget).addClass("active");

        const tag_select = e.currentTarget.textContent;
        // console.log(tag_select);
        let board_id_in_tag_list = [];
        if (tag_select === "Recommend") {
            board_id_in_tag_list = [
                boardId,
                "kidbright32-v1.3",
                "kidbright32i",
                "kidbright32iP",
                "kidbright32iA",
                "kidbright32-v1.6"
            ].filter((item, index, arr) => arr.indexOf(item) === index).slice(0, 5);
        } else {
            board_id_in_tag_list = boards.filter(board => board.tags.indexOf(tag_select) >= 0).map(board => board.id);
        }

        $("#hardware-select ul").html(
            board_id_in_tag_list.map(board_id => {
                const board = boards.find(a => a.id === board_id);
                if ((!isElectron) && board?.isArduinoPlatform) {
                    return "";
                }

                return `
                    <li>
                        <div data-board-id="${board.id}"${board.id === boardIdSelect ?  'class="active"' : ""}>
                            <div class="image"><img src="${rootPath}/boards/${board.id}/${board.image}" alt=""></div>
                            <div class="name">${board.name}</div>
                        </div>
                    </li>
                `
            }).join("")
        );

        $("#hardware-select ul > li > div").click(e => {
            $("#hardware-select ul > li > div").removeClass("active");
            $(e.currentTarget).addClass("active");

            boardIdSelect = $(e.currentTarget).attr("data-board-id");
            // console.log(boardIdSelect);
        });
    });

    $("#boards-tags-list > li:first-child").click();

    $("#project-create-dialog").show();
});

$("#project-create-dialog .close-btn").click(() => $("#project-create-dialog").hide())

let arduinoConsoleTerm = {
    scroll: () => {
        $("#arduino-console-dialog pre").scrollTop($("#arduino-console-dialog pre")[0].scrollHeight);
    },
    writeln: text => {
        $("#arduino-console-dialog pre")[0].innerText += text + "\r\n";
        arduinoConsoleTerm.scroll();
    },
    write: text => {
        $("#arduino-console-dialog pre")[0].innerText += text;
        arduinoConsoleTerm.scroll();
    },
    clear: () => {
        $("#arduino-console-dialog pre")[0].innerText = "";
    }
};

let loadBoard = async () => {
    if (!boardId || !levelName) {
        return;
    }
    const board = boards.find(board => board.id === boardId);
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

    if (typeof board?.onLoad === "function") {
        await board.onLoad(blocklyWorkspace, board);
    }

    if (board?.isArduinoPlatform) {
        if (+localStorage.getItem("show-console-board-initial") !== -1) {
            // console.log("show", +localStorage.getItem("show-console-board-initial"), +localStorage.getItem("show-console-board-initial") !== -1);
            $("#arduino-console-dialog .title").text("Loading...");
            ShowDialog($("#arduino-console-dialog"));
        }
        arduinoConsoleTerm.clear();
        /*
        if (typeof arduinoInitTerm === "undefined") {
            arduinoInitTerm = new Terminal();
            if (typeof arduinInitFitAddon === "undefined") {
                arduinInitFitAddon = new FitAddon.FitAddon();
            }
            arduinoInitTerm.loadAddon(arduinInitFitAddon);
            arduinoInitTerm.open($("#arduino-console-dialog > section")[0]);
            try {
                arduinInitFitAddon.fit();
            } catch(e) {
                
            }
        } else {
            arduinoInitTerm.clear();
        }
        */
        // await arduino_board_init();
        arduino_board_init().then(() => {
            $("#arduino-console-dialog .title").text("Finish");
            CloseDialog($("#arduino-console-dialog"));
        }).catch(e => {
            console.warn(e);
            $("#arduino-console-dialog .title").text("Load board FAIL");
        });
    }
}

$("#create-project-btn").click(async () => {
    {
        const board = boards.find(board => board.id === (boardId || "kidbright32-v1.3"));
        if (typeof board?.onDispose === "function") {
            await board.onDispose(blocklyWorkspace, board);
        }
    }

    let projectName = $("#project-name-input").val();
    // boardId = $("#project-create-dialog #hardware-select ul > li > div.active").attr("data-board-id");
    // levelName = $("#project-create-dialog #level-select ul > li > div.active").attr("data-level-name");
    boardId = boardIdSelect;
    levelName = boards.find(board => board.id === boardId).level[0].name;

    await loadBoard();

    // Delete old file
    fs.ls("/").filter(a => a.endsWith(".py") || a.endsWith(".xml")).map(a => fs.remove("/" + a));

    blocklyWorkspace.clear();
    if (editor) editor.setValue("");
    
    file_name_select = "main." + (useMode === "block" ? "xml" : "py");

    {
        const board = boards.find(board => board.id === (boardId || "kidbright32-v1.3"));
        if (board?.defaultCode) {
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(board.defaultCode), blocklyWorkspace);
        }
    }

    // vFSTree = "";
    // vFSTree = { };
    if (useMode === "block") {
        // fs.write("/main.xml", "");
        updataWorkspaceAndCategoryFromvFS(true);
        blocklyWorkspace.setScale(1);
        blocklyWorkspace.scrollCenter();
    } else if (useMode === "code") {
        // fs.write("/main.py", "");
    }

    $("#project-name").val(projectName);

    $("#project-create-dialog").hide();
    NotifyS("New project " + projectName);
    statusLog("New project " + projectName);

    saveCodeToLocal();
});
