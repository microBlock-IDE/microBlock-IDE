let term = null, fitAddon = null;
let terminalShowFlag = false;

$("#close-terminal").click(() => {
    $("#terminal").css("display", "none");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "flex");
    }
    Blockly.triggleResize();
    if (editor) editor.layout();
    terminalShowFlag = false;
});

let terminalFullSizeFlag = false;
$("#resize-terminal").click(() => {
    terminalFullSizeFlag = !terminalFullSizeFlag;
    $("#terminal").width(terminalFullSizeFlag ? "100%" : "300px");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        $(".page > .main").css("display", "flex");
    }
    fitAddon.fit();
});

$("#clear-terminal").click(() => term.clear());

$("#open-terminal").click(() => {
    terminalShowFlag = true;
    $("#terminal").css("display", "flex");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        Blockly.triggleResize();
    }
    if (editor) editor.layout();
    if (fitAddon) {
        setTimeout(() => {
            fitAddon.fit();
            fitAddon.fit();
        }, 10);
    }
});

$(() => $("#open-terminal").click());

