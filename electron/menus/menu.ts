import { MenuItemConstructorOptions, app, dialog } from 'electron'
import { iconPath } from '../utils/paths'

const { Menu, shell } = require('electron')

const appName = 'Ula Starter'
const appVersion = app.getVersion()

const showAbout = () => {
  void dialog.showMessageBox({
    title: `About ${appName}`,
    message: `${appName} ${appVersion} `,
    detail: `\nCreated by HinokiSu\n\nGithub: https://github.com/HinokiSu`,
    // icon: iconPath as any,
  })
}

const appMenu = (): MenuItemConstructorOptions => ({
  label: 'App',
  submenu: [
    {
      label: 'Language',
      submenu: [
        {
          label: 'English'
        },
        {
          label: '中文'
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Quit',
      role: 'quit'
    }
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
    { role: 'zoomOut' }
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
        await shell.openExternal('https://github.com/HinokiSu/ula-starter')
      }
    },
    {
      label: 'Report Issue',
      click: async () => {
        await shell.openExternal('https://github.com/HinokiSu/ula-starter/issues')
      }
    },
    { type: 'separator' },
    { label: 'About', click: () => showAbout() }
  ]
})

const template = [appMenu(), viewMenu(), windowMenu(), helpMenu()]
// fileMenu(), editMenu(), , windowMenu(), helpMenu()

export const createMenu = () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  //   Menu.setApplicationMenu(menu)
  return menu
}
