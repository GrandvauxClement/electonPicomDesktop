const { contextBridge, ipcRenderer } = require("electron");

// API Definition
const electronAPI = {
    loadTokens: (args) => ipcRenderer.invoke('auth:loadTokens', args),
    getProfile: () => ipcRenderer.invoke('auth:get-profile'),
    logOut: () => ipcRenderer.send('auth:log-out'),
    getAllUser: () => ipcRenderer.invoke('api:get-all-user'),
    getAllArea: () => ipcRenderer.invoke('api:get-all-area'),
    getAreaById: (args) => ipcRenderer.invoke('api:get-area-by-id', args),
    deleteStopById: (args) => ipcRenderer.invoke('api:delete-stop-by-id', args),
    addStop: (args) => ipcRenderer.invoke('api:add-stop', args),
    updateArea: (args) => ipcRenderer.invoke('api:update-area', args)
};

// Register the API with the contextBridge
/*process.once("loaded", () => {*/
    contextBridge.exposeInMainWorld('electronAPI', electronAPI);
/*});*/
