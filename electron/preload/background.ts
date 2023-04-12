const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('backgroundAPI', {
  // send msg, start

  /* receiveParsedUlaLog: (cb) => {
    ipcRenderer.on('ula:response-ula-log', cb)
  }, */

  startPollingGetUlaLogInBG: (cb) => ipcRenderer.on('ula:start-polling-log', cb),

  stopPollingGetUlaLogInBG: (cb) => ipcRenderer.on('ula:stop-polling-log', cb),
  responseGetUlaLogInBG: (data) => ipcRenderer.send('ula:response-polling-log', data),
  getUlaLoggerPath: () => ipcRenderer.invoke('ula:get-ula-logger-path')
})

/* Because disable use nodeIntegration, preload not use node method */
contextBridge.exposeInMainWorld('nodeAPI', {
  // provide Node api

  fspStat: async (path: string) => await ipcRenderer.invoke('node-api:fsp-stat', path),

  fspReadFile: async (path: string, encoding: BufferEncoding) =>
    await ipcRenderer.invoke('node-api:fsp-read-file', path, encoding),

  fsExistsSync: async (path: string) => await ipcRenderer.invoke('node-api:fs-exists-sync', path),

  pathSep: async () => await ipcRenderer.invoke('node-api:path-sep'),
  pathJoin: (paths: string[]) => ipcRenderer.invoke('node-api:path-join', paths),

  processCwd: async () => await ipcRenderer.invoke('node-api:process-cwd')
})
