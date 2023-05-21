import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes/index"
import PrimeVue from "primevue/config"

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.mount('#app')
