$("#close-terminal").click(() => {
    $("#terminal").css("display", "none");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "flex");
    }
    Blockly.triggleResize();
    if (editor) editor.layout();
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
    $("#terminal").css("display", "flex");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        Blockly.triggleResize();
    }
    if (editor) editor.layout();
    fitAddon.fit();
});

$(() => $("#open-terminal").click());

const term = new Terminal.Terminal();
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
