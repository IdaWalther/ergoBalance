import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/startView/StartView.vue'
import LoginView from '../views/loginView/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router
