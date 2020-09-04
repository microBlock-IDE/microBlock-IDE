let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (evt) => {
    console.log("beforeinstallprompt evant", evt);
    deferredInstallPrompt = evt;
});

let installPWA = () => {
    deferredInstallPrompt.prompt();

    deferredInstallPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt', choice);
        } else {
            console.log('User dismissed the A2HS prompt', choice);
        }
        deferredInstallPrompt = null;
    });
};

window.addEventListener('appinstalled', () => {
    console.log('App installed.', evt);
});
