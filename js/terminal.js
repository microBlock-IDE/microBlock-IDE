let keydownWhiteList = [ 8,  ];

$("#terminal > section").keydown((event) => {
    console.log(event);

    if (event.ctrlKey || (keydownWhiteList.indexOf(event.which) >= 0)) {
        event.preventDefault()
        
        writeSerial(String.fromCharCode(event.which - (event.ctrlKey ? 64 : 0)));
    }
});

$("#terminal > section").keypress((event) => {
    event.preventDefault()
    console.log(event);
    
    if (!event.ctrlKey) {
        writeSerial(String.fromCharCode(event.which));
    }
});

let createRange = (node, chars, range) => {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                 range.setEnd(node, chars.count);
                 chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                   break;
                }
            }
        }
   } 

   return range;
};

let updateTerminalCurser = () => {
    var selection = window.getSelection();

    range = createRange($("#terminal > section")[0], { count: $("#terminal > section")[0].textContent.length });

    if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

$("#terminal > section").mousedown(function(e) {
    e.preventDefault();

    // updateTerminalCurser();
});

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
});

$("#clear-terminal").click(() => $("#terminal > section").text(""));

$("#open-terminal").click(() => {
    $("#terminal").css("display", "flex");
    if (terminalFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        Blockly.triggleResize();
    }
    if (editor) editor.layout();
});

$(() => $("#open-terminal").click());
