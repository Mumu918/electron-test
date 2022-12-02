const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('api', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openDialog: () => ipcRenderer.invoke('dialog:open'),
  updateCounter: (calllback) => ipcRenderer.on('update-counter', calllback),
  startDrag: (filename) => {
    ipcRenderer.send('drag:start', filename)
  },
  showNotification: (counter) => ipcRenderer.send('notification:show', counter)
})
