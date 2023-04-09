const { contextBridge, ipcRenderer } = require("electron");

// API Definition
const electronAPI = {
    loadTokens: (args) => ipcRenderer.invoke('auth:loadTokens', args),
    getProfile: () => ipcRenderer.invoke('auth:get-profile'),
    logOut: () => ipcRenderer.send('auth:log-out'),
    getAllUser: () => ipcRenderer.invoke('api:get-all-user'),
    getUserById: (args) => ipcRenderer.invoke('api:get-user-by-id', args),
    getAdsByUserId: (args) => ipcRenderer.invoke('api:get-ads-by-user', args),
    getAllArea: () => ipcRenderer.invoke('api:get-all-area'),
    getAreaById: (args) => ipcRenderer.invoke('api:get-area-by-id', args),
    deleteStopById: (args) => ipcRenderer.invoke('api:delete-stop-by-id', args),
    addStop: (args) => ipcRenderer.invoke('api:add-stop', args),
    updateArea: (args) => ipcRenderer.invoke('api:update-area', args),
    createArea: (args) => ipcRenderer.invoke('api:create-area', args),
    deleteAreaById: (args) => ipcRenderer.invoke('api:delete-area', args),
    getAllTimeInterval: (args) => ipcRenderer.invoke('api:get-time-interval', args),
    updateTimeInterval: (args) => ipcRenderer.invoke('api:update-time-interval', args)
};

// Register the API with the contextBridge
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
