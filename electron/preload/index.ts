import { ipcRenderer } from 'electron'

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // M -> R
  // TODO: click start
  startRunUla: () => ipcRenderer.invoke('ula:start-run'),
  stopRunUla: () => ipcRenderer.invoke('ula:stop-run'),

  // M -> R
  // open dialog, pick uipath log dir
  pickUipathLogDirs: () => ipcRenderer.invoke('pick-log-dirs'),
  // when first start or reload, get ula config
  getOldUipathLogDirs: () => ipcRenderer.invoke('get-old-uipath-log-dir'),

  // send msg, start
  pollingGetUlaLog: (state: boolean) => {
    console.log(state)
    ipcRenderer.send('ula:polling-get-ula-log', state)
  },
  receiveParsedUlaLog: (cb) => {
    ipcRenderer.on('ula:response-ula-log', cb)
  }
})
