const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron');
const {
    readFileSync
} = require("fs");
const open = require('open')

let code = readFileSync(__dirname + "/fullscreen.js", "utf-8");

ipcMain.on("openDiscord" , (ev , payload) => {
    open("https://discord.gg/ZHt6mWzBsw");
})

const createLinkJoinWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 150,
        title: "Bonk.io Join with Link",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    win.loadFile("joinWithLink.html")

    ipcMain.on("joinRoom" , (ev , payload) => {
        win.close();
    })
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Bonk.io",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    let menuTemplate = [
        {
            label: "bonkIoDesktop",
            submenu: [{
                    label: "About",
                    role: "about"
                },
                {
                    label: "Fullscreen",
                    click: () => {
                        if (win.isFullScreen()) {
                            win.setFullScreen(false);
                        } else {
                            win.setFullScreen(true);
                        }
                    },
                    accelerator: "F11"
                },
                {
                    label: "Join a room with a link",
                    click: () => {
                        createLinkJoinWindow();
                    }
                },
                {
                    label: "Developer | Oein"
                }
            ]
        },
        {
            label: "Bonk.io 클랜 - Tiger Claw",
            submenu: [

                {
                    label: "Discord 참가",
                    click: () => {
                        open("https://discord.gg/ZHt6mWzBsw");
                    }
                },

                {
                    label: "클랜장 | ZOYUL"
                },
            ]
        },
        {
            label: "편집",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

    win.loadURL("https://bonk.io/");

    win.webContents.on("did-finish-load", () => {
        win.webContents.executeJavaScript(code)
        win.webContents.executeJavaScript(`
            let sc = document.createElement("script");
            sc.innerHTML = "${code}";
            document.body.appendChild(sc);
            console.log(sc);
        `)
    });

    ipcMain.on("joinRoom" , (ev , payload) => {
        win.loadURL(payload["link"]);
    })
};

app.whenReady().then(() => {
    createWindow();
});