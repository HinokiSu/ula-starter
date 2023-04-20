import { ipcRenderer } from 'electron'
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // window control
  minimizeWin: () => ipcRenderer.send('win:minimize'),
  maximizeWin: () => ipcRenderer.send('win:maximize'),
  unMaximizeWin: () => ipcRenderer.send('win:un-maximize'),
  closeWin: () => ipcRenderer.send('win:close-win'),
  isMaxWin: (cb) => ipcRenderer.on('win:is-maximize', cb),

  // menu
  openMenu: (x, y) => ipcRenderer.send('menu:open-hamburger-menu', { x, y }),

  // run ula
  startRunUla: () => ipcRenderer.invoke('ula:start-run'),
  stopRunUla: () => ipcRenderer.invoke('ula:stop-run'),

  // polling ula log
  startPollingGetUlaLog: (state: boolean) => {
    console.log(state)
    ipcRenderer.send('ula:start-polling-log', state)
  },
  stopPollingUlaLog: (state: boolean) => ipcRenderer.send('ula:stop-polling-log', state),

  // open dialog, pick uipath log dir
  pickUipathLogDirs: () => ipcRenderer.invoke('pick-log-dirs'),
  // when first start or reload, get ula config
  getOldUipathLogDirs: () => ipcRenderer.invoke('get-old-uipath-log-dir'),

  // get  parsed ula log
  receiveParsedUlaLog: (cb) => {
    ipcRenderer.on('ula:response-polling-log', cb)
  },
  openUlaPage: (state: boolean) => ipcRenderer.send('ula:open-ula-page', state)
})
