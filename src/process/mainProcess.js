const { BrowserWindow } = require("electron");
const path = require("path");
const keytar = require("keytar");

async function createAppWindow(token) {
    try {
        let win = new BrowserWindow({
            width: 1200,
            height: 800,
            webPreferences: {
                preload: path.join(__dirname, "..", "utils", "preload.js"),
               // enableRemoteModule: true
            },
        });
        const tokenGet = await keytar.getPassword(process.env.KEYTAR_SERVICE, process.env.KEYTAR_ACCOUNT);
        if (tokenGet === null){
            await keytar.setPassword(process.env.KEYTAR_SERVICE, process.env.KEYTAR_ACCOUNT, token);
        }
        win.loadFile(path.join(__dirname, "..", 'views', 'dashboard', 'home.html'));

        win.on('closed', () => {
            win = null;
        });
    } catch (err) {
        throw err
    }
}

module.exports = createAppWindow;
