import TOldConfig from '../interfaces/ula-config'

export interface IElectronAPI {
  // M -> R
  pickUipathLogDirs: () => Promise<any>
  getOldUipathLogDirs: () => Promise<TOldConfig>

  // ula run
  startRunUla: () => Promise<IUlaRunResult>
  stopRunUla: () => Promise<boolean>
  pollingGetUlaLog: (state: boolean) => Promise<any>
  receiveParsedUlaLog: (cb) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
