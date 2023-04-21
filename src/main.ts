import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index'
import { createPinia } from 'pinia'
import { installI18n } from './locales'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
const i18n = installI18n(app)
app.mount('#app')
/* .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  }) */
