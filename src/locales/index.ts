import { createI18n } from 'vue-i18n'
// language package
import zhLocale from './zh-cn'
import enLocale from './en-us'
import { useLangStore } from '../stores/lang-store'
import { App } from 'vue'

const messages = {
  /* EN */
  en: {
    ...enLocale
  },

  /* CN */
  zh: {
    ...zhLocale
  }
}

export function installI18n(app: App) {
  const i18n = createI18n({
    legacy: false,
    // global inject $t function
    globalInjection: true,
    locale: useLangStore().getCurrentLanguage(),
    messages
  })
  app.use(i18n)
  return i18n
}
