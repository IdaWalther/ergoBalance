import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/startView/StartView.vue'
import LoginView from '../views/loginView/LoginView.vue'
import RegisterView from '@/views/registerView/RegisterView.vue'
import MainView from '@/views/mainView/MainView.vue'
import AboutUsView from '@/views/aboutUsView/AboutUsView.vue'
import IntervalView from '@/views/intervalView/IntervalView.vue'
import SetupIntervalView from '@/views/setupIntervalView/SetupIntervalView.vue'

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
    {
      path: '/about',
      name: 'about',
      component: AboutUsView,
    },
    {
      path: '/interval',
      name: 'interval',
      component: IntervalView,
    },
    {
      path: '/setupInterval',
      name: 'setupInterval',
      component: SetupIntervalView,
    },
  ],
})

export default router
