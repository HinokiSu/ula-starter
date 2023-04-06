import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { bootstrap } from '../services'
import { preHandle } from '../services/pre-handle'
import { pickLogDir } from '../services/set-config'

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

const isDevEnv = process.env.NODE_ENV === 'development'
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

app.commandLine.appendSwitch('disable-http-cache')
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
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

// Background Render Process
let backgroundWin: BrowserWindow | null = null
const bgUrl = process.env.VITE_DEV_SERVER_URL + 'background/'
const bgIndexHtml = join(process.env.DIST, 'background/index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'UlaStarter.app',
    width: 800,
    height: 650,
    // frame: false, // frameLess
    // transparent: false,
    // icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true
    }
  })
  console.log(process.env.VITE_DEV_SERVER_URL)

  // Dev Env
  if (isDevEnv) {
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

async function createBackground() {
  backgroundWin = new BrowserWindow({
    // hide window
    show: false,
    width: 400,
    height: 300,
    title: 'UlaStarter-Background.app',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, '../preload/background.js')
    }
  })

  // Dev Env
  if (isDevEnv) {
    // electron-vite-vue#298
    backgroundWin.loadURL(bgUrl)
    // Open devTool if the app is not packaged
    // backgroundWin.webContents.openDevTools()
  } else {
    // Prod Env
    backgroundWin.loadFile(bgIndexHtml)
  }
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

  // create main window
  createWindow()
  pickLogDir(win)

  ipcMain.on('ula:response-polling-log', (event, data) => {
    // send to main win
    win.webContents.send('ula:response-polling-log', data)
  })

  ipcMain.on('ula:start-polling-log', async (event, data) => {
    // create background window
    await createBackground()
    backgroundWin.webContents.on('did-finish-load', () => {
      backgroundWin.webContents.send('ula:start-polling-log', data)
    })

    ipcMain.on('ula:open-ula-page', (event, data) => {
      // ULA web URL
      if (data) {
        shell.openExternal('http://localhost:4301')
      }
    })
  })

  // stop polling
  ipcMain.on('ula:stop-polling-log', (event, data) => {
    // close bg win
    backgroundWin.webContents.send('ula:stop-polling-log', data)
    backgroundWin.close()
  })

  // pre handle
  preHandle(win)
  // createMenu(win)

  // run ula
  bootstrap()

  // window
  /* win.on('move', () => {
    const position = win.getPosition()
    win.webContents.send('move', { bounds: { x: position[0], y: position[1] } })
    // rpc.emit('move', { bounds: { x: position[0], y: position[1] } })
  }) */

  win.on('close', (event) => {
    // when main win closed, others win will be closed
    if (backgroundWin && !backgroundWin.isDestroyed()) {
      backgroundWin.destroy()
      backgroundWin = null
    }
  })
})

app.on('window-all-closed', () => {
  win = null
  backgroundWin = null
  app.quit()
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
/* ipcMain.handle('open-win', (_, arg) => {
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
}) */
