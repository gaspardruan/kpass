import { createRouter, createWebHistory } from 'vue-router'
import ImageView from '@/views/ImageView.vue'
import PodView from '@/views/PodView.vue'
import ServiceView from '@/views/ServiceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'image' }
    },
    {
      path: '/image',
      name: 'image',
      component: ImageView
    },
    {
      path: '/pod',
      name: 'pod',
      component: PodView
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceView
    }
  ]
})

export default router
