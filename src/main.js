import { createApp } from 'vue'
import './styles/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'

//Importem Pinia i Vue-Router
import { createPinia } from 'pinia'
import router from './router'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')


  