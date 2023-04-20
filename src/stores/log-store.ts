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
      } else {
        this.logList.concat(val)
      }
    }
  }
})
