const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('about', {
  test: (msg) => ipcRenderer.send('about:send', msg),
  test1: (calllback) => ipcRenderer.on('about:recive', calllback)
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron
})
