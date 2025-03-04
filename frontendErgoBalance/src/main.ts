import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from "@primevue/themes/aura"
import App from './App.vue'
import router from './router/index'
import AnimateOnScroll from 'primevue/animateonscroll';

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.directive('animateonscroll', AnimateOnScroll);
app.use(createPinia())
app.use(router)
app.mount('#app')

