import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/startView/StartView.vue'
import AboutView from '../views/aboutView/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
