import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/layout/home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home
        }
      ]
    },
  ],
})

export default router
