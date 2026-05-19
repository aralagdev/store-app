import { createApp } from 'vue'
import './styles/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'

createApp(App)
  .use(pinia)
  .mount('#app')