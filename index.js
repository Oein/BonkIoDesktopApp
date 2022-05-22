const { app, BrowserWindow } = require('electron');
const { readFileSync } = require("fs");

let code = readFileSync(__dirname + "/fullscreen.js" , "utf-8");

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
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

app.whenReady().then(() => {
    createWindow();
});