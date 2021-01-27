let term = null, fitAddon = null;
let terminalShowFlag = false;
let beforeWidthTerminalSize = 300;

const MINIMUM_TERMINAL_WIDTH = 300;

$("#close-terminal").click(() => {
    $("#terminal").css("display", "none");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "flex");
    }
    Blockly.triggleResize();
    if (editor) editor.layout();
    terminalShowFlag = false;
    $("#terminal-h-resize").css("display", "none");
    localStorage.removeItem("terminal_size");
});

let terminalFullSizeFlag = false;
$("#resize-terminal").click(() => {
    terminalFullSizeFlag = !terminalFullSizeFlag;
    if (terminalFullSizeFlag) beforeWidthTerminalSize = $("#terminal").width();
    $("#terminal").width(terminalFullSizeFlag ? "100%" : beforeWidthTerminalSize);
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        $(".page > .main").css("display", "flex");
    }
    fitAddon.fit();
    localStorage.setItem("terminal_size", $("#terminal").width());
});

$("#clear-terminal").click(() => term.clear());

$("#open-terminal").click(() => {
    terminalShowFlag = true;
    $("#terminal").css("display", "flex");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        $("#terminal").width(beforeWidthTerminalSize);
        Blockly.triggleResize();
    }
    if (editor) editor.layout();
    if (fitAddon) {
        setTimeout(() => {
            fitAddon.fit();
            fitAddon.fit();
        }, 10);
    }
    $("#terminal-h-resize").css("display", "block");
    $("#terminal-h-resize").css("right", $("#terminal").width());
    localStorage.setItem("terminal_size", $("#terminal").width());
});

$("#terminal-h-resize").bind('mousedown', function(event){
    offsetX = event.pageX - ($(document).width() - +$("#terminal-h-resize").css("right").replace("px", ""));
    offsetX = $(document).width() + offsetX;
    $("#terminal-h-resize").addClass("active");

    $(document).bind('mousemove', function(event){
        let rightPos = offsetX - event.pageX;
        rightPos = rightPos < MINIMUM_TERMINAL_WIDTH ? MINIMUM_TERMINAL_WIDTH : rightPos;
        $("#terminal-h-resize").css("right", rightPos - 14);
    }).bind('mouseup', function(event){
        $(this).unbind('mousemove');
        $(this).unbind('mouseup');

        if (deviceMode === MODE_REAL_DEVICE) {
            $("#terminal").width(+$("#terminal-h-resize").css("right").replace("px", ""));
            localStorage.setItem("terminal_size", $("#terminal").width());
        } else if (deviceMode === MODE_SIMULATOR) {
            $("#simulator").width(+$("#terminal-h-resize").css("right").replace("px", ""));
            localStorage.setItem("simulator_width_size", $("#simulator").width());
        }

        Blockly.triggleResize();
        if (editor) editor.layout();
        if (fitAddon) {
            setTimeout(() => {
                fitAddon.fit();
                fitAddon.fit();
            }, 10);
        }

        $("#terminal-h-resize").removeClass("active");
    });
});

if (!isEmbed && deviceMode === MODE_REAL_DEVICE) {
    terminal_size = localStorage.getItem("terminal_size");
    if (terminal_size) {
        terminal_size = +terminal_size;
        beforeWidthTerminalSize = terminal_size >= MINIMUM_TERMINAL_WIDTH ? terminal_size : MINIMUM_TERMINAL_WIDTH;
        $(() => $("#open-terminal").click());
    }
}
