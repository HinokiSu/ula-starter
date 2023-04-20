import { defineStore } from 'pinia'

type TState = {
  isMaximize: boolean
}

export const useWinStore = defineStore('WinStore', {
  state: (): TState => ({
    isMaximize: false
  }),
  getters: {
  },
  actions: {
    async getWinMaximizeState() {
      await window.electronAPI.isMaxWin((event: any, data: any) => {
        this.isMaximize = data
      })
    },
    setWinMaximizeState(state: boolean) {
      this.isMaximize = state
    }
  }
})
