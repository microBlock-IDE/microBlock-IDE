if (isElectron) {
    const { Menu, MenuItem } = remote;

    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: "New",
                    accelerator: 'Ctrl+N',
                    click: () => $("#new-project").click()
                },
                {
                    label: "Open",
                    accelerator: 'Ctrl+O',
                    click: () => $("#open-project").click()
                },
                {
                    label: "Save",
                    accelerator: 'Ctrl+S',
                    click: () => $("#save-project").click()
                },
                {
                    label: "Save As",
                    accelerator: 'Ctrl+Shift+S',
                    click: () => {
                        saveAsFlag = true;
                        $("#save-project").click();
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                {
                    label: "Block Styles",
                    submenu: [
                        {
                            type: "radio",
                            label: "Geras",
                            click: () => selectRenderer("geras"),
                            checked: localStorage.getItem("renderer") === "geras"
                        },
                        {
                            type: "radio",
                            label: "Zelos",
                            click: () => selectRenderer("zelos"),
                            checked: localStorage.getItem("renderer") === "zelos"
                        },
                    ]
                },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Board',
            submenu: [
                {
                    label: 'Upload',
                    click: () => $("#upload-program").click()
                },
                { type: 'separator' },
                {
                    label: 'Open Terminal',
                    click: () => $("#open-terminal").click()
                },
                {
                    label: 'Connect',
                    click: () => $("#connect-device").click()
                },
                {
                    label: 'Disconnect',
                    click: () => $("#disconnect-device").click()
                },
                { type: 'separator' },
                {
                    label: 'Update Firmware',
                    click: () => firewareUpgradeFlow()
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                { role: 'close' }
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Documentation',
                    click: () => $("#open-help").click()
                },
                { type: 'separator' },
                {
                    label: 'Join Us on Facebook',
                    click: () => shell.openExternal('https://www.facebook.com/microblockide')
                },
                {
                    label: 'Report Issue',
                    click: () => shell.openExternal('https://github.com/microBlock-IDE/microBlock-IDE/issues')
                },
                { type: 'separator' },
                {
                    label: 'Check of Updates...',
                    click: () => checkUpdate()
                },
                {
                    label: 'Download Last version',
                    click: () => shell.openExternal('https://github.com/microBlock-IDE/microBlock-IDE-offline/releases')
                },
                { type: 'separator' },
                {
                    label: 'About',
                    click: async () => {
                        dialog.showMessageBox({
                            type: "info",
                            title: "About",
                            message: `microBlock IDE offline version ${pjson.version}`
                        });
                    }
                },
            ]
        }
    ]));
}
