import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import Login from '../pages/Login.vue'
import Chargers from '../pages/Chargers.vue'

const routes = [
  { path: '/', redirect: '/chargers' },
  { path: '/login', component: Login },
  { path: '/chargers', component: Chargers }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Add navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // If trying to access a protected route without being logged in
  if (to.path !== '/login' && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
