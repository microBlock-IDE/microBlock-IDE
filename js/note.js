const MINIMUM_NOTE_WIDTH = 300;

$("#close-note").click(() => {
    $("#note").css("display", "none");
    $("#note-h-resize").hide();
    Blockly.triggleResize();
});

const saveNote = e => {
    if (e) {
        $(e.target).parents(".note-box-main").find(".sub-header").text("Edited on " + new Date().toLocaleString());
        $(e.target).parents("li").attr("data-last-edit", +new Date());
    }

    let note_list = [];
    $("#note-box-list > li").each(function() {
        note_list.push({
            id: +$(this).attr("data-id"),
            color: $(this).find(".note-box-main")[0].classList[1] || "",
            title: $(this).find("header > div").html(),
            content: $(this).find("article > div").html(),
            last_edit: +$(this).attr("data-last-edit"),
        });
    });
    console.log(note_list);
    fs.write("/note.json", JSON.stringify(note_list));
    saveCodeToLocal();
}

const updateEvent = () => {
    $("#note-box-list .color-list span").click(function() {
        for (const color of [ "yellow", "green", "orange", "blue", "purple", "red", "grey" ]) {
            $(this).parents(".note-box-main").removeClass(color);
        }
        $(this).parents(".note-box-main").addClass($(this).attr("class"));
        saveNote();
    });

    $("#note-box-list .delete-note").click(function() {
        $(this).parents(".note-box-main").parent("li").remove();
        saveNote();
    });

    
    // Title
    $("#note-box-list .note-box-main > header > div").on("focus", e => {
        console.log("focus");
        if (e.target.innerHTML === "<i>Note Title</i>") {
            e.target.innerHTML = "";
        }
    }).on("blur", e => {
        console.log("blur");
        if (e.target.innerHTML === "<br>" || e.target.innerHTML.length === 0) {
            e.target.innerHTML = "<i>Note Title</i>";
        }
    }).on("input", e => {
        console.log(e.target.innerHTML);
        saveNote(e);
    });

    // Content
    $("#note-box-list .note-box-main > article > div").on("focus", e => {
        if (e.target.innerHTML === "<i>Note Content</i>") {
            e.target.innerHTML = "";
        }
    }).on("blur", e => {
        if (e.target.innerHTML === "<br>" || e.target.innerHTML.length === 0) {
            e.target.innerHTML = "<i>Note Content</i>";
        }
    }).on("input", e => {
        // console.log(e.target.innerHTML);
        saveNote(e);
    });
}

$("#open-note").click(() => {
    let html = "";
    const note_list = JSON.parse(fs.read("/note.json") || "[]");
    for (const note_item of note_list) {
        html += `
                        <li data-id=${note_item?.id || ""}>
                            <div class="note-box-main ${note_item?.color}">
                                <header><div contenteditable="true" spellcheck="false">${note_item?.title || "<i>Note Title</i>"}</div></header>
                                <div class="sub-header">Edited on ${new Date(note_item.last_edit).toLocaleString()}</div>
                                <article><div contenteditable="true" spellcheck="false">${note_item?.content || "<i>Note Content</i>"}</div></article>
                                <footer>
                                    <ul class="color-list">
                                        <li><span class="yellow"></span></li>
                                        <li><span class="green active"></span></li>
                                        <li><span class="orange"></span></li>
                                        <li><span class="blue"></span></li>
                                        <li><span class="purple"></span></li>
                                        <li><span class="red"></span></li>
                                        <li><span class="grey"></span></li>
                                    </ul>
                                    <ul class="color-list">
                                        <li><button class="delete-note"><i class="fas fa-trash-alt"></i></button></li>
                                    </ul>
                                </footer>
                            </div>
                        </li>
        `;
    }
    $("#note-box-list").html(html);
    updateEvent();
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

$("#new-note").click(() => {
    const now_time = +new Date();
    $("#note-box-list").prepend(`
                        <li data-id="${now_time}" data-last-edit="${now_time}">
                            <div class="note-box-main yellow">
                                <header><div contenteditable="true" spellcheck="false"><i>Note Title</i></div></header>
                                <div class="sub-header">Created on ${new Date().toLocaleString()}</div>
                                <article><div contenteditable="true" spellcheck="false"><i>Note Content</i></div></article>
                                <footer>
                                    <ul class="color-list">
                                        <li><span class="yellow"></span></li>
                                        <li><span class="green active"></span></li>
                                        <li><span class="orange"></span></li>
                                        <li><span class="blue"></span></li>
                                        <li><span class="purple"></span></li>
                                        <li><span class="red"></span></li>
                                        <li><span class="grey"></span></li>
                                    </ul>
                                    <ul class="color-list">
                                        <li><button class="delete-note"><i class="fas fa-trash-alt"></i></button></li>
                                    </ul>
                                </footer>
                            </div>
                        </li>
    `);

    updateEvent();
    saveNote();
});

// setTimeout(() => $("#open-note").click(), 1000);
