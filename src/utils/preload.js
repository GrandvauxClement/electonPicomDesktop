const { contextBridge, ipcRenderer } = require("electron");

// API Definition
const electronAPI = {
    loadTokens: (args, cb) => ipcRenderer.invoke('auth:loadTokens', args),
    getProfile: () => ipcRenderer.invoke('auth:get-profile'),
    logOut: () => ipcRenderer.send('auth:log-out'),
    getAllUser: () => ipcRenderer.invoke('api:get-all-user'),
    getAllArea: () => ipcRenderer.invoke('api:get-all-area')
};

// Register the API with the contextBridge
/*process.once("loaded", () => {*/
    contextBridge.exposeInMainWorld('electronAPI', electronAPI);
/*});*/
