import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/startView/StartView.vue'
import LoginView from '../views/loginView/LoginView.vue'
import RegisterView from '@/views/registerView/RegisterView.vue'
import MainView from '@/views/mainView/MainView.vue'

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
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
    },
  ],
})

export default router
