import { createRouter, createWebHistory } from 'vue-router'
import ImageView from '@/views/ImageView.vue'
import ContainerView from '@/views/ContainerView.vue'

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
      path: '/container',
      name: 'container',
      component: ContainerView
    }
  ]
})

export default router
