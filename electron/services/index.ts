import { BrowserWindow, ipcMain } from 'electron'
import { runUlaProcess, stopRunUla } from './run-ula'

/* Main Process begin running ula.exe */
export const bootstrap = () => {
  let pid: number

  // start
  ipcMain.handle('ula:start-run', () => {
    const res = runUlaProcess()
    pid = res.pid
    console.log('[ULA]: start run pid: ', pid)
    console.log('[ULA] start run')
    return res
  })

  // stop
  ipcMain.handle('ula:stop-run', () => {
    console.log('[ULA] stop pid: ', pid)
    const stopRes = stopRunUla(pid)
    console.log('[ULA] stop result: ', stopRes)
    return stopRes
  })
}

/**
 * Main Process as transit station, response
 * @param mainWin main window
 */
export const responseTransitStation = (mainWin: BrowserWindow) => {
  // Main Process as response transit station
  ipcMain.on('ula:response-ula-log', (event, data) => {
    console.log('Main-resp: ', data)
    // use main renderer
    mainWin.webContents.send('ula:response-ula-log', data)
  })
}

/**
 * Main process as transit station, request
 * @param win background window
 */
export const requestTransitStation = (bgWin: BrowserWindow) => {
  // Main Process as request transit station
  ipcMain.on('ula:start-polling-log', (event, data) => {
    // webContents, use for render and control web page
    // use background renderer
    console.log('[Polling]: start: ', data)
    bgWin.webContents.send('ula:start-polling-log', data)
  })

  ipcMain.on('ula:stop-polling-log', (event, data) => {
    console.log('[Polling]: stop: ', data)
    bgWin.webContents.send('ula:stop-polling-log', data)
  })
}
