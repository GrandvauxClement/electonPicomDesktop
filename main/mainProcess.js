const { BrowserWindow } = require("electron");
const path = require("path");

function createAppWindow() {
    let win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "..", "src","utils","preload.js"),
        }
    });

    win.loadFile(path.join(__dirname, "..", "src",'views', 'try', 'home.html'));

    win.on('closed', () => {
        win = null;
    });
}

module.exports = createAppWindow;
