import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes/index"
import PrimeVue from "primevue/config"
import { createPinia } from 'pinia'
// import { useReviewStore } from './stores/reviewStore'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(PrimeVue)
app.use(pinia)
// pinia.use(useReviewStore)
app.mount('#app')
