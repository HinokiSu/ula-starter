import { BrowserWindow, ipcMain } from 'electron'
import { getOldLogDirFromConfig } from './set-config'

export const preHandle = (win: BrowserWindow) => {
  win.webContents.on('did-finish-load', () => {
    // Only first create window, will listen old uipath log dir
    ipcMain.handleOnce('get-old-uipath-log-dir', getOldLogDirFromConfig)
  })
}
