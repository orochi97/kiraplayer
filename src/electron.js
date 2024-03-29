// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
// const { app, BrowserWindow } = require('@electron/remote')
const path = require('path')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1150,
    height: 760,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // webSecurity: false,
      preload: path.join(__dirname, 'service/preload.js')
    }
  })

  require('@electron/remote/main').initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8080/')
  } else {
    mainWindow.loadFile('./build/index.html')
    mainWindow.setMenu(null)
  }
  // mainWindow.loadFile('index.html')
  // and load the index.html of the app.
  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
