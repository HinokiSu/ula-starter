const { ipcRenderer, contextBridge } = require('electron')
const fsp = require('fs/promises')
import fs from 'fs'
import { join, sep } from 'path'

contextBridge.exposeInMainWorld('backgroundAPI', {
  // send msg, start

  /* receiveParsedUlaLog: (cb) => {
    ipcRenderer.on('ula:response-ula-log', cb)
  }, */

  startPollingGetUlaLogInBG: (cb) => ipcRenderer.on('ula:start-polling-log', cb),

  stopPollingGetUlaLogInBG: (cb) => ipcRenderer.on('ula:stop-polling-log', cb),
  responseGetUlaLogInBG: (data) => ipcRenderer.send('ula:response-polling-log', data)
})

contextBridge.exposeInMainWorld('nodeAPI', {
  // provide Node api
  fspStat: async (path: fs.PathLike) => await fsp.stat(path),
  fspReadFile: async (path: fs.PathLike, encoding: BufferEncoding) =>
    await fsp.readFile(path, {
      encoding
    }),
  fsExistsSync: async (path: fs.PathLike) => fs.existsSync(path),
  pathSep: () => sep,
  pathJoin: (paths: string[]) => join(...paths),
  processCwd: () => process.cwd()
})
