import TOldConfig from '../interfaces/ula-config'

export interface IElectronAPI {
  // window control
  minimizeWin: () => Promise<void>
  maximizeWin: () => Promise<void>
  unMaximizeWin: () => Promise<void>
  closeWin: () => Promise<void>
  isMaxWin: (cb) => Promise<any>

  // menu
  openMenu: (x, y) => Promise<void>
  changeLang: (cb) => Promise<any>

  // ula config
  pickUipathLogDirs: () => Promise<any>
  getOldUipathLogDirs: () => Promise<TOldConfig>

  // ula run
  startRunUla: () => Promise<IUlaRunResult>
  stopRunUla: () => Promise<boolean>
  // polling ula log
  startPollingGetUlaLog: (state: boolean) => Promise<any>
  stopPollingUlaLog: (state: boolean) => Promise<void>
  // get ula log data
  receiveParsedUlaLog: (cb) => Promise<void>
  openUlaPage: (state: boolean) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
