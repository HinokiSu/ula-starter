import { defineStore } from 'pinia'

type TState = {
  language: string
}

export const useLangStore = defineStore('LangStore', {
  state: (): TState => ({
    language: localStorage.getItem('language') || 'en'
  }),
  getters: {},
  actions: {
    async setLanguage() {
      // from electron get lang
      await window.electronAPI.changeLang((event: any, lang: string) => {
        // storage lang
        this.language = lang
      })
    },
    getCurrentLanguage() {
      return this.language
    }
  }
})
