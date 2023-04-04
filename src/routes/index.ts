import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard/dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
