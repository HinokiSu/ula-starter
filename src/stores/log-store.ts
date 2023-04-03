import { defineStore } from 'pinia'
import { TLogItem } from '../interfaces/log-type'

type TState = {
  logList: TLogItem[]
}

export const useLogStore = defineStore('LogStore', {
  state: (): TState => ({
    logList: []
  }),
  getters: {},
  actions: {
    async setLogData(val: TLogItem[] | []) {
      if (this.logList.length === 0) {
        this.logList = val
      } else  {
        this.logList.concat(val)
      }
    },
    async getLogData() {
      // TODO: get log data from window electronApi
      // this.logList = logData
      /* 
        <p><span>▲ ~ </span># Hyper is an Electron-based terminal</p>
        <p><span>▲ ~ </span># Built on HTML/CSS/JS</p>
      */
    }
  }
})
