$("#open-dashboard").click(() => {
    if (sharedObj.dashboardWin && !sharedObj.dashboardWin.isDestroyed()) {
        sharedObj.dashboardWin.focus();
        return;
    }

    sharedObj.dashboardWin = new remote.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        },
        icon: path.join(`${rootPath}/favicon.png`)
    });

    sharedObj.dashboardWin.loadFile(`${rootPath}/dashboard/index.html`);
    
    // sharedObj.dashboardWin.maximize();
});
