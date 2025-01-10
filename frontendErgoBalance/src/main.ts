import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
      preset: 'saga-blue',
  }
});
app.use(createPinia())
app.use(router)
app.mount('#app')

// app.use(PrimeVue)
