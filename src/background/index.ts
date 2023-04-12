import { IpcMainEvent } from 'electron'
import { backgroundAPI } from './api/electron-api'
import { pollingRead } from './services/polling-read'

backgroundAPI.startPollingGetUlaLogInBG((event: IpcMainEvent, data: any) => {
  console.log('[Polling]: BG-start: ', data)

  // return bg win -> Main Process
  pollingRead((val: any) => {
    backgroundAPI.responseGetUlaLogInBG(val)
  })
})

backgroundAPI.stopPollingGetUlaLogInBG((event: IpcMainEvent, data: any) => {
  console.log('[Polling]: BG-stop: ', data)
})
