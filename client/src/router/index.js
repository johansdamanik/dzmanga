import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ReadPage from '../views/ReadPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/read/:mangaTitle/:ch/:chapterId',
      name: 'read',
      component: ReadPage
    }
  ]
})

export default router
