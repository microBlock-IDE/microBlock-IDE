const MINIMUM_SIMULATOR_WIDTH = 400;

let switchModeTo = (mode, firstTime) => {
    firstTime = typeof firstTime === "undefined" ? false : firstTime;
    /* if (deviceMode === mode && !firstTime) {
        return;
    } */

    let board = boards.find(board => board.id === boardId);
    if (mode === MODE_SIMULATOR) {
        // Check board
        if (typeof board.simulator === "undefined") {
            console.error("Why use simulator in board not support ?");
            return;
        }
    }

    let nowMode = deviceMode;
    if (nowMode !== mode) {
        if (nowMode === MODE_REAL_DEVICE) {
            if (terminalShowFlag) {
                $("#close-terminal").click();
                setTimeout(_ => {
                    terminalShowFlag = true;
                }, 100);
            }
        } else if (nowMode === MODE_SIMULATOR) {
            $("#simulator").css("display", "none");
            $("#simulator iframe").attr("src", "");
        }
    }

    if (mode === MODE_REAL_DEVICE) {
        if (terminalShowFlag) {
            $("#open-terminal").click();
        }
    } else if (mode === MODE_SIMULATOR) {
        $(domSimulatorIframe).attr("src", `${rootPath}/boards/${board.id}/${board.simulator.index}`);
        $("#simulator").css("display", "flex");
        $("#terminal-h-resize").css("display", "block");
        $("#terminal-h-resize").css("right", $("#simulator").width());
    }

    console.log("Call");

    if (typeof board.simulator !== "undefined") {
        if (mode === MODE_REAL_DEVICE) {
            $("#switch-to-real-mode").css("display", "none");
            $("#switch-to-sim-mode").css("display", "block");
        } else if (mode === MODE_SIMULATOR) {
            $("#switch-to-sim-mode").css("display", "none");
            $("#switch-to-real-mode").css("display", "block");
        }
    } else {
        $("#switch-to-real-mode").css("display", "none");
        $("#switch-to-sim-mode").css("display", "none");
    }

    Blockly.triggleResize();
    if (editor) editor.layout();
    if (fitAddon) {
        setTimeout(() => {
            fitAddon.fit();
            fitAddon.fit();
        }, 10);
    }

    deviceMode = mode;

    let deviceModeName = "None";
    if (deviceMode === MODE_REAL_DEVICE) {
        deviceModeName = "Real Devices";
    } else if (deviceMode === MODE_SIMULATOR) {
        deviceModeName = "Simulator";
    }

    $("#device-mode-name").text(deviceModeName);
    localStorage.setItem("last_deivce_mode", deviceMode);
}

$("#switch-to-sim-mode").click(_ => switchModeTo(MODE_SIMULATOR));
$("#switch-to-real-mode").click(_ => switchModeTo(MODE_REAL_DEVICE));

let domSimulatorIframe = $("#simulator iframe")[0];
$("#sim-stop").click(_ => {
    let simSystem = domSimulatorIframe.contentWindow.simSystem;
    if (simSystem) {
        simSystem.codeStop();
    } else {
        console.warn("Connect to domSimulatorIframe error");
    }
});

$("#sim-force-reset").click(_ => {
    domSimulatorIframe.contentWindow.location.reload();
});

(_ => {
    let simulator_width = MINIMUM_SIMULATOR_WIDTH;
    simulator_width = +localStorage.getItem("simulator_width_size");
    $("#simulator").width(simulator_width >= MINIMUM_SIMULATOR_WIDTH ? simulator_width : MINIMUM_SIMULATOR_WIDTH);
/*
    let lastDeivceMode = +localStorage.getItem("device_mode");
    if (lastDeivceMode != deviceMode) {
        switchModeTo(lastDeivceMode, true);
    }*/
})();
