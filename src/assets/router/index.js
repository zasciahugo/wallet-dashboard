// src/assets/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

// Fix the path: go two levels up from assets/router to reach pages
import Dashboard from '../../pages/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
