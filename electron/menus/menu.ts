import { BrowserWindow, MenuItemConstructorOptions } from 'electron'

const { app, Menu } = require('electron')

// { role: 'appMenu' }
const appMenu = (): MenuItemConstructorOptions => {
  return {
    label: app.name,
    submenu: [
      { role: 'about', type: 'separator' },
      { role: 'services', type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide', type: 'separator' },
      { role: 'quit' }
    ]
  }
}

// { role: 'fileMenu' }
const fileMenu = (): MenuItemConstructorOptions => ({
  label: 'File',
  submenu: [{ role: 'quit' }]
})

// { role: 'editMenu' }
const editMenu = (): MenuItemConstructorOptions => ({
  label: 'Edit',
  submenu: [
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'delete' },
    { type: 'separator' },
    { role: 'selectAll' }
  ]
})

// { role: 'viewMenu' }
const viewMenu = (): MenuItemConstructorOptions => ({
  label: 'View',
  submenu: [
    { role: 'reload' },
    { role: 'forceReload' },
    { role: 'toggleDevTools' },
    { type: 'separator' },
    { role: 'resetZoom' },
    { role: 'zoomIn' },
    { role: 'zoomOut' },
    { type: 'separator' },
    { role: 'togglefullscreen' }
  ]
})

// { role: 'windowMenu' }
const windowMenu = (): MenuItemConstructorOptions => ({
  label: 'Window',
  submenu: [{ role: 'minimize' }, { role: 'zoom' }, { role: 'close' }]
})

const helpMenu = (): MenuItemConstructorOptions => ({
  role: 'help',
  submenu: [
    {
      label: 'Learn More',
      click: async () => {
        const { shell } = require('electron')
        await shell.openExternal('https://electronjs.org')
      }
    }
  ]
})

const template = [viewMenu(), windowMenu()]
// fileMenu(), editMenu(), , windowMenu(), helpMenu()

export const createMenu = (win: BrowserWindow) => {
  const menu = Menu.buildFromTemplate(template)
  //   Menu.setApplicationMenu(menu)
  win.setMenu(menu)
}
