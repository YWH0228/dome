import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [],
      redirect: '/index'
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/Index/IndexView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})
export default router
