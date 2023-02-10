/*const {contextBridge, ipcRenderer} = require('electron')

const toExpose = {
    invokeAdminDashboardgertrt: (cb) => {
        ipcRenderer.once('admin-dashboard', (e, data) => {
            cb(e, data)
        })
    },
    invokeAdminDashboard: (args) => {
        ipcRenderer.send('admin-dashboard', args)
    },
    invokeNewItem: (args, cb) => {
        ipcRenderer
            .invoke('new-item', args)
            .then((res) => {
                cb(res)
            })
    },
    onNewItemAdded: (cb) => {
        ipcRenderer.on('new-item-added', (e,data) => {
            cb(e,data)
        })
    },
    invokeShowConfirmDeleteItem: (args, cb) => {
        ipcRenderer.invoke('show-confirm-delete-item', args)
            .then((res) => {
                cb(res)
            })
    }
}

contextBridge.exposeInMainWorld('ipcRenderer', toExpose)*/

const { contextBridge, ipcRenderer } = require("electron");

// API Definition
const electronAPI = {
    loadTokens: () => ipcRenderer.invoke('auth:loadTokens'),
    getProfile: () => ipcRenderer.invoke('auth:get-profile'),
    logOut: () => ipcRenderer.send('auth:log-out'),
    getPrivateData: () => ipcRenderer.invoke('api:get-private-data'),
};

// Register the API with the contextBridge
/*process.once("loaded", () => {*/
    contextBridge.exposeInMainWorld('electronAPI', electronAPI);
/*});*/
