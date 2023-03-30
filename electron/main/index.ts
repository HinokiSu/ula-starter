import { app, BrowserWindow, shell, ipcMain, dialog, MessageChannelMain } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { createMenu } from '../menus/menu'
import { bootstrap, requestTransitStation, responseTransitStation } from '../services'
import { backgroundRender } from '../services/background'
import { preHandle } from '../services/pre-handle'
import { modifyUlaConfig } from '../services/set-config'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// Main Render Process
let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

// Background Render Process
let backgroundWin: BrowserWindow | null = null

async function createWindow() {
  win = new BrowserWindow({
    title: 'UlaStarter.app',
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    // frame: false, // frameLess
    transparent: false,
    // icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // nodeIntegration: true,
      contextIsolation: true
    }
  })
  console.log(process.env.VITE_DEV_SERVER_URL)

  // Dev Env
  if (process.env.NODE_ENV === 'development') {
    // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    // Prod Env
    win.loadFile(indexHtml)
  }

  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

async function createBackgroundWindow() {
  backgroundWin = new BrowserWindow({
    // hide window
    show: false
  })
}

app.whenReady().then(async () => {
  console.log(`[Electron] current Env: ${process.env.NODE_ENV}`)
  // is dev
  if (process.env.NODE_ENV === 'development') {
    try {
      const { installExt } = await import('../utils/install-devtools')
      await installExt()
      console.log('[DevTools] install successfully')
    } catch (e) {
      console.log('[DevTools] Can not install extension!', e)
    }
  }

  async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'Choose Folder',
      properties: ['openDirectory']
    })
    if (canceled || filePaths.length < 1) return undefined

    const logDir = filePaths[0]
    // modify ula config, rewrite uipath log dir in config
    return modifyUlaConfig(logDir)
  }
  ipcMain.handle('pick-log-dirs', handleFileOpen)

  // create main window
  createWindow()
  // create background window
  createBackgroundWindow()

  // pre handle
  preHandle(win)
  createMenu(win)

  // run ula
  bootstrap()

  // transit station
  responseTransitStation(win)
  requestTransitStation(backgroundWin)

  backgroundRender()

  // window
  win.on('move', () => {
    const position = win.getPosition()
    win.webContents.send('move', { bounds: { x: position[0], y: position[1] } })
    // rpc.emit('move', { bounds: { x: position[0], y: position[1] } })
  })
})

app.on('window-all-closed', () => {
  win = null
  backgroundWin = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
