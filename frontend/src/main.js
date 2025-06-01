import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Fix Leaflet icon issue
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: import.meta.env.BASE_URL + 'leaflet/marker-icon-2x.png',
  iconUrl: import.meta.env.BASE_URL + 'leaflet/marker-icon.png',
  shadowUrl: import.meta.env.BASE_URL + 'leaflet/marker-shadow.png'
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
