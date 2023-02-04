const { app, BrowserWindow } = require('electron')
const path = require('path')

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

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

function generateMainWindow() {
    const viewPath = path.join(__dirname, 'src', 'views', 'home', 'home.html')
    const mainWindow = commonService.createWindow(viewPath)

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.send('init-data', {
            expenses: dataStore.expenses,
            profits: dataStore.profits
        })
    })

   /* newItemCommunication.init()
    updateItemCommunication.init()
    deleteItemCommunication.init()*/
}
