
$(".dialog .close-dialog").click(function() {
    $(this).parents(".dialog").removeClass("show").addClass("hide").on('animationend', function() {
        $(this).removeClass("hide");
    });
});

const ShowDialog = e => e.removeClass("hide").addClass("show");
const CloseDialog = e => e.removeClass("show").addClass("hide").on('animationend', function() {
    $(this).removeClass("hide");
});
