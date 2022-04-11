const MINIMUM_NOTE_WIDTH = 300;

$("#close-note").click(() => {
    $("#note").css("display", "none");
    $("#note-h-resize").hide();
    Blockly.triggleResize();
});

$("#open-note").click(() => {
    $("#note").css("display", "flex");
    $("#note-h-resize").css("right", $("#note").width());
    $("#note-h-resize").show();
});

$("#note-h-resize").bind('mousedown', function(event){
    offsetX = event.pageX - ($(document).width() - +$("#note-h-resize").css("right").replace("px", ""));
    offsetX = $(document).width() + offsetX;
    $("#note-h-resize").addClass("active");

    $(document).bind('mousemove', function(event){
        let rightPos = offsetX - event.pageX;
        rightPos = Math.max(rightPos, MINIMUM_NOTE_WIDTH);
        $("#note-h-resize").css("right", rightPos - 14);
    }).bind('mouseup', function(event){
        $(this).unbind('mousemove');
        $(this).unbind('mouseup');

        $("#note").width(+$("#note-h-resize").css("right").replace("px", ""));

        Blockly.triggleResize();
        if (editor) editor.layout();
        if (fitAddon) {
            setTimeout(() => {
                fitAddon.fit();
                fitAddon.fit();
            }, 10);
        }

        $("#note-h-resize").removeClass("active");
    });
});


setTimeout(() => $("#open-note").click(), 1000);
