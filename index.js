const { app, BrowserWindow , Menu } = require('electron');
const { readFileSync } = require("fs");
const open = require('open')

let code = readFileSync(__dirname + "/fullscreen.js" , "utf-8");

let menuTemplate = [
    {
        label: "bonkIoDesktop",
        submenu: [
            {
                label: "About",
                role: "about"
            },
            {
                label: "Developer | Oein"
            }
        ]
    },
    {
        label: "Bonk.io 클랜 - Tiger Claw",
        submenu : [
            
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
    }
];

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      title: "Bonk.io",
    });

    win.webContents.openDevTools()
  
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
};

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

app.whenReady().then(() => {
    createWindow();
});