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
        let isConnectedToREPL = false;
        if (deviceMode === MODE_REAL_DEVICE) {
            sharedObj.dashboardWin.webContents.send("serial-status", serialPort ? "connected" : "disconnect");
        } else if (deviceMode === MODE_SIMULATOR) {
            simulatorReadyCallback();
        }
    });
} else {
    function getSerialStatus() {
        if (deviceMode === MODE_REAL_DEVICE) {
            return serialPort ? "connected" : "disconnect";
        } else if (deviceMode === MODE_SIMULATOR) {
            simulatorReadyCallback();
            return true;
        }

        return false;
    }

    function trigDashboardIsReady() {
        dashboardIsReady = true;
        dashboardWin.onbeforeunload = () => {
            dashboardIsReady = false;
            dashboardWin = null;
        }; 
    }
}
