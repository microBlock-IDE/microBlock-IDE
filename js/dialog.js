
$(".dialog .close-dialog").click(function() {
    $(this).parents(".dialog").removeClass("show").addClass("hide").on('animationend', function() {
        $(this).removeClass("hide");
    });
});

let ShowDialog = (e) => {
    e.removeClass("hide").addClass("show");
}
