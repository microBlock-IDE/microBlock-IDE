if (!isElectron) {
    dashboardWin = null;
    dashboardIsReady = false;
}

$("#open-dashboard").click(() => {
    if (isElectron) {
        ipcRenderer.send("show-dashboard");
    } else {
        dashboardWin = window.open(`${rootPath}/dashboard/index.html`, "_blank", "width=800px, height=600px", true);
    }
});

if (isElectron) {
    ipcRenderer.on("get-serial-status", (evt, msg) => {
        sharedObj.dashboardWin.webContents.send("serial-status", serialPort ? "connected" : "disconnect");
    });
} else {
    function getSerialStatus() {
        return serialPort ? "connected" : "disconnect";
    }

    function trigDashboardIsReady() {
        dashboardIsReady = true;
        dashboardWin.onbeforeunload = () => {
            dashboardIsReady = false;
            dashboardWin = null;
        }; 
    }
}
