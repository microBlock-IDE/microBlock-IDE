let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (evt) => {
    // console.log("beforeinstallprompt evant", evt);
    deferredInstallPrompt = evt;

    $("#install-pwa").show();
});

$("#install-pwa").click(() => {
    deferredInstallPrompt.prompt();

    deferredInstallPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt', choice);
            $("#install-pwa").hide();
        } else {
            console.log('User dismissed the A2HS prompt', choice);
        }
        deferredInstallPrompt = null;
    });
});

window.addEventListener('appinstalled', () => {
    console.log('App installed.', evt);
    $("#install-pwa").hide();
});
