$("#open-dashboard").click(() => {
    ipcRenderer.send("show-dashboard");
});
