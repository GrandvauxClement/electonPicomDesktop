const { app, ipcMain, BrowserWindow } = require('electron');

const { createAuthWindow, createLogoutWindow } = require('./process/authProcess');
const createAppWindow = require('./process/mainProcess');
const authService = require('./services/authService');
const apiService = require('./services/apiService');

async function showWindow() {
    try {
        console.log("DNAS INIT SHOW !!!!!!!!!!!!!!!!!!!")
        const token = await authService.refreshTokens();
        if (token === null){
            createAuthWindow();
        } else {
            createAppWindow(token);
        }
    } catch (err) {
        createAuthWindow();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // Handle IPC messages from the renderer process.
    ipcMain.handle('auth:loadTokens',(e, args) => {
        authService.loadTokens(args)
    })
    ipcMain.handle('auth:get-profile', authService.getProfile);
    ipcMain.handle('api:get-all-user', apiService.getAllUsers);
    ipcMain.handle('api:get-all-area', apiService.getAllArea)
    ipcMain.on('auth:log-out', () => {
        console.log("Handle log out o index.js")
        BrowserWindow.getAllWindows().forEach(window => window.close());
        createLogoutWindow();
    });

    showWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});
