import { defineStore } from 'pinia'
import { TLogItem } from '../interfaces/log-type'

type TState = {
  logList: TLogItem[] | []
}

export const useLogStore = defineStore('LogStore', {
  state: (): TState => ({
    logList: []
  }),
  getters: {},
  actions: {
    async getLogData() {
      const logData = [
        {
          level: 'info',
          message: 'Database file Path: D:\\GitHub\\ula-starter\\ula\\database\\logs_db.db',
          service: 'ula-server',
          timestamp: '2023-03-28 16:41:41.426'
        },
        {
          level: 'info',
          message: 'Server Config File Path: D:\\GitHub\\ula-starter\\ula\\server.config.json',
          service: 'ula-server',
          timestamp: '2023-03-28 16:41:41.580'
        },
        {
          level: 'info',
          message: 'Web: http://localhost:4301',
          service: 'ula-server',
          timestamp: '2023-03-28 16:41:41.651'
        },
        {
          level: 'info',
          message: 'Server: http://localhost:4302',
          service: 'ula-server',
          timestamp: '2023-03-28 16:41:41.686'
        },
        {
          level: 'info',
          message: 'Hit CTRL-C to stop the server',
          service: 'ula-server',
          timestamp: '2023-03-28 16:41:41.686'
        }
      ]
      // TODO: get log data from window electronApi
      this.logList = logData

      /* 
        <p><span>▲ ~ </span># Hyper is an Electron-based terminal</p>
        <p><span>▲ ~ </span># Built on HTML/CSS/JS</p>
      */
    }
  }
})
