/*
const { app, BrowserWindow } = require('electron')
const path = require('path')
const commonService = require('./services/CommonService')
const dashboardHomeCommunication = require('./communications/DashboardHomeCommunication')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'utils/preload.js')
        }
    })

    win.loadFile('src/views/index.html')
}

app
    .whenReady()
    .then(() => {
        generateMainWindow()
        // Stuff spécial Mac
        app.on('activate', () => {
            if(BrowserWindow.getAllWindows().length === 0) {
                generateMainWindow()
            }
        })

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') app.quit()
        })
})



function generateMainWindow() {
    const viewPath = path.join(__dirname, 'views', 'index.html')
    const mainWindow = commonService.createWindow(viewPath)

    dashboardHomeCommunication.init()

   /!* newItemCommunication.init()
    updateItemCommunication.init()
    deleteItemCommunication.init()*!/
}
*/

const { app, ipcMain, BrowserWindow } = require('electron');

const { createAuthWindow, createLogoutWindow } = require('../main/authProcess');
const createAppWindow = require('../main/mainProcess');
const authService = require('./services/authService');
const apiService = require('./services/apiService');

async function showWindow() {
    try {
        await authService.refreshTokens();
        createAppWindow();
    } catch (err) {
        createAuthWindow();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // Handle IPC messages from the renderer process.
    ipcMain.handle('auth:loadTokens', authService.loadTokens)
    ipcMain.handle('auth:get-profile', authService.getProfile);
    ipcMain.handle('api:get-private-data', apiService.getPrivateData);
    ipcMain.on('auth:log-out', () => {
        BrowserWindow.getAllWindows().forEach(window => window.close());
        createLogoutWindow();
    });

    showWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});
