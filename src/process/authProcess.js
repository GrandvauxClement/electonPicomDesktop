const { BrowserWindow } = require('electron');
const authService = require('../services/authService');
const createAppWindow = require('./mainProcess');
const path = require("path");

let win = null;

function createAuthWindow() {
    destroyAuthWin();

    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            preload: path.join(__dirname, "..", "utils","preload.js"),
        }
    });
    //authService.getAuthenticationURL()
    win.loadURL(path.join(__dirname, "..", 'views', 'login', 'index.html'));

    const {session: {webRequest}} = win.webContents;

    const filter = {
        urls: [
            'http://localhost/callback*'
        ]
    };

    webRequest.onBeforeRequest(filter, async ({url}) => {
        await authService.loadTokens(url);
        createAppWindow();
        return destroyAuthWin();
    });

    win.on('authenticated', () => {
        destroyAuthWin();
    });

    win.on('closed', () => {
        win = null;
    });
}

function destroyAuthWin() {
    if (!win) return;
    win.close();
    win = null;
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
    createLogoutWindow,
    destroyAuthWin
};
