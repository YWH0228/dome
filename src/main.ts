import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import e from 'element-plus'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(e)
app.use(createPinia())
app.use(router)

app.mount('#app')
