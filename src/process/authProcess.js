const { BrowserWindow } = require('electron');
const authService = require('../services/authService');
const path = require("path");

let win = null;

function createAuthWindow() {

    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            preload: path.join(__dirname, "..", "utils","preload.js"),
        }
    });

    win.loadURL(path.join(__dirname, "..", 'views', 'login', 'index.html'));

    win.on('closed', () => {
        win = null;
    });
}

async function createLogoutWindow() {
    const logoutWindow = new BrowserWindow({
        show: false,
    });
    console.log('On log out window !! ')
    // logoutWindow.loadURL(authService.getLogOutUrl());
    await authService.logout();
    logoutWindow.close();

    logoutWindow.on('ready-to-show', async () => {
        await authService.logout();
        logoutWindow.close();
    });
}

module.exports = {
    createAuthWindow,
    createLogoutWindow
};
