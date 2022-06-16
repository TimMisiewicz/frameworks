import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue";
import StoreView from "../views/StoreView.vue";

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login', component: LoginView
  },
  {path: '/store', component: StoreView},
  { path: '/:notFound(.*)', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
