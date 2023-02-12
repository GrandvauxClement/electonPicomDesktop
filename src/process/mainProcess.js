const { BrowserWindow } = require("electron");
const path = require("path");
const keytar = require("keytar");

async function createAppWindow(token) {
    try {
        let win = new BrowserWindow({
            width: 1000,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "..", "utils", "preload.js"),
            }
        });
        await keytar.setPassword('electron-openid-oauth', "admin", token);
        const tokenGet = await keytar.getPassword('electron-openid-oauth', "admin");
        console.log("*****************CREATE APP WINDOW token keytar--> ", tokenGet)

        win.loadFile(path.join(__dirname, "..", 'views', 'dashboard', 'home.html'));

        win.on('closed', () => {
            win = null;
        });
    } catch (err) {
        throw err
    }

}

module.exports = createAppWindow;
