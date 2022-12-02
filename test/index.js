const { BrowserWindow, ipcMain } = require('electron')
const { resolve } = require('path')

const createWindow2 = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    backgroundColor: '#158bb8',
    frame: false,
    webPreferences: {
      preload: resolve(__dirname, './preload.js')
    },
  })


  win.loadFile(resolve(__dirname, './index.html'))
  ipcMain.on('window:close', (event) => {
    const sender = event.sender
    sender.close()
  })
}

module.exports = { createWindow2 }
