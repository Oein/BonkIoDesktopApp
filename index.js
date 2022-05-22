const { app, BrowserWindow , Menu } = require('electron');
const { readFileSync } = require("fs");

let code = readFileSync(__dirname + "/fullscreen.js" , "utf-8");

let menuTemplate = [
    {
        label: "bonkIoDesktop",
        submenu: [
            {
                label: "About",
                role: "about"
            }
        ]
    }
];

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      title: "Bonk.io",
    });
  
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