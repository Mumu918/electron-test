const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
  Notification,
  nativeImage,
  Tray,
  BrowserView
} = require('electron')
const { resolve } = require('path')
const { createWindow2 } = require('./test')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    frame: false
  })

  const main = new BrowserView({
    webPreferences: {
      preload: resolve(__dirname, './main/preload.js')
    }
  })
  main.webContents.loadFile('./main/index.html')
  main.webContents.openDevTools()
  win.setBrowserView(main)
  main.setBounds({
    x: 0,
    y: 50,
    height: 400,
    width: 800
  })

  const view = new BrowserView()
  win.addBrowserView(view)
  view.setBounds({
    x: 0,
    y: 450,
    height: 50,
    width: 800
  })
  view.setBackgroundColor('#93b5cf')

  win.on('resize', () => {
    const size = win.getSize()
    view.setBounds({
      x: 0,
      y: size[1] - 50,
      height: 50,
      width: size[0]
    })
    view2.setBounds({
      x: 0,
      y: 0,
      height: 50,
      width: size[0]
    })
  })

  const view2 = new BrowserView()
  win.addBrowserView(view2)
  view2.setBounds({
    x: 0,
    y: 0,
    height: 50,
    width: 800
  })
  view2.setBackgroundColor('#ed556a')

  let progress = 0
  const processInterval = setInterval(() => {
    if (progress < 1) {
      win.setProgressBar(progress)
      progress += 0.1
    } else {
      progress = -1
      win.setProgressBar(progress)
      clearInterval(processInterval)
    }
  }, 100)

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: '+',
          accelerator: process.platform === 'darwin' ? 'Cmd + i' : 'Ctrl + i',
          click: () => {
            win.webContents.send('update-counter', 1)
          }
        },
        {
          label: '-',
          accelerator: process.platform === 'darwin' ? 'Cmd + d' : 'Ctrl + d',
          click: () => {
            win.webContents.send('update-counter', -1)
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: '状态',
    submenu: [
      {
        label: '在线',
        type: 'radio',
        checked: true
      },
      {
        label: '离线',
        type: 'radio',
        checked: false
      },
      {
        label: '隐身',
        type: 'radio',
        checked: false
      }
    ]
  }
])

app.whenReady().then(() => {
  const icon = new nativeImage.createFromPath(
    resolve(__dirname, './icon@32x32.png')
  )
  const tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click: () => {
        const win = BrowserWindow.fromId(1)
        win.show()
      }
    },
    {
      label: '创建窗口',
      click: () => {
        createWindow2()
      }
    },
    {
      label: '创建窗口测试',
      click: () => {
        const win = new BrowserWindow({
          width: 500,
          height: 300,
          webPreferences: {
            preload: resolve(__dirname, './about/preload.js')
          }
        })
        win.loadFile('./about/dist/index.html')
        let counter = 0
        ipcMain.on('about:send', (_event, msg) => {
          console.log(msg)
          counter += 10
          win.webContents.send('about:recive', `你就偷着乐吧${counter}`)
        })
      }
    },
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')

  ipcMain.on('notification:show', (_, counter) => {
    const notification = new Notification({
      title: `我是通知${counter}`,
      body: '你就偷着乐吧'
    })
    notification.show()
  })
  ipcMain.on('drag:start', (event, filename) => {
    event.sender.startDrag({
      file: resolve(__dirname, filename),
      icon: resolve(__dirname, 'icon.jpeg')
    })
  })

  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu)
  }

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title.toString())
  })

  ipcMain.on('update-counter', (_event, value) => {
    console.log(value)
  })

  ipcMain.handle('dialog:open', async () => {
    const status = await dialog.showMessageBox({
      type: 'info',
      message: '我是个弹窗，关掉我'
    })
    return status.checkboxChecked
  })

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit()
  }
})
