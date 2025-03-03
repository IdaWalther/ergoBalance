import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/startView/StartView.vue'
import LoginView from '../views/loginView/LoginView.vue'
import RegisterView from '@/views/registerView/RegisterView.vue'
import MainView from '@/views/mainView/MainView.vue'
import AboutUsView from '@/views/aboutUsView/AboutUsView.vue'
import IntervalView from '@/views/intervalView/IntervalView.vue'
import SetupIntervalView from '@/views/setupIntervalView/SetupIntervalView.vue'
import SetupExercisesView from '@/views/setupExercisesView/SetupExercisesView.vue'

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
      meta: { requiresAuth: true } 
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUsView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/interval',
      name: 'interval',
      component: IntervalView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/setupInterval',
      name: 'setupInterval',
      component: SetupIntervalView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/setupExercises',
      name: 'setupExercises',
      component: SetupExercisesView,
      meta: { requiresAuth: true } 
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if(to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
