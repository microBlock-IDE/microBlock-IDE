let dashboardWin = null;

$("#open-dashboard").click(() => {
    dashboardWin = new remote.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        },
        icon: path.join(`${rootPath}/favicon.png`)
    });

    dashboardWin.loadFile(`${rootPath}/dashboard/index.html`);
    
    dashboardWin.maximize();
});
