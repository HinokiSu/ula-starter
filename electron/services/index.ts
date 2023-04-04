import { BrowserWindow, ipcMain } from 'electron'
import UlaProcess from './run-ula'

/* Main Process begin running ula.exe */
export const bootstrap = () => {
  const ulaProcess = new UlaProcess()

  // start
  ipcMain.handle('ula:start-run', () => {
    const res = ulaProcess.runUlaProcess()
    console.log('[ULA] start run')
    return res
  })

  // stop
  ipcMain.handle('ula:stop-run', () => {
    const stopRes = ulaProcess.stopRunUla()
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
