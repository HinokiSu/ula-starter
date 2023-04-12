import { BrowserWindow, ipcMain } from 'electron'
import { getOldLogDirFromConfig } from './set-config'
import fsp from 'node:fs/promises'
import fs from 'node:fs'
import { join, sep } from 'node:path'

export const preHandle = (win: BrowserWindow) => {
  win.webContents.on('did-finish-load', () => {
    // Only first create window, will listen old uipath log dir
    ipcMain.handleOnce('get-old-uipath-log-dir', getOldLogDirFromConfig)
  })

  ipcMain.handle('ula:get-ula-logger-path', (event) => {
    // ModPath: ula_execution.log
    const suffixPath = ['ula', sep, 'logger', sep, 'ula_execution.log']
    if (process.env.NODE_ENV === 'development') {
      return join(process.cwd(), sep, 'resources', sep, ...suffixPath)
    } else {
      // production */resources/ula/logger/ula-execution.log
      return join(process.cwd(), sep, 'resources', sep, ...suffixPath)
    }
  })
}

export const preProvideNodeApi = () => {
  /* Provide node api for renderer */
  ipcMain.handle('node-api:fsp-stat', async (event, path: fs.PathLike) => await fsp.stat(path))

  ipcMain.handle(
    'node-api:fsp-read-file',
    async (event, path: fs.PathLike, encoding: BufferEncoding) =>
      await fsp.readFile(path, {
        encoding
      })
  )

  ipcMain.handle('node-api:fs-exists-sync', (event, path: fs.PathLike) => fs.existsSync(path))

  ipcMain.handle('node-api:path-sep', (event) => sep)
  ipcMain.handle('node-api:path-join', (event, paths: string[]) => join(...paths))

  ipcMain.handle('node-api:process-cwd', (event) => process.cwd())
}
