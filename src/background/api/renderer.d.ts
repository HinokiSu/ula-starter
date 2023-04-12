export interface IBackgroundAPI {
  // polling ula log
  startPollingGetUlaLogInBG: (cb) => Promise<any>
  stopPollingGetUlaLogInBG: (cb) => Promise<void>
  // get ula log data
  responseGetUlaLogInBG: (data) => Promise<any>
  getUlaLoggerPath: () => Promise<string>
}

export interface IExposeNodeAPI {
  fspStat: (path: string) => Promise<any>
  fspReadFile: (path: string, encoding: BufferEncoding) => Promise<any>
  fsExistsSync: (path: string) => Promise<boolean>
  pathSep: () => Promise<string>
  pathJoin: (paths: string[]) => Promise<string>
  processCwd: () => Promise<string>
}

declare global {
  interface Window {
    backgroundAPI: IBackgroundAPI
    nodeAPI: IExposeNodeAPI
  }
}
