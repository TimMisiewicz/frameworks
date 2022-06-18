import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue";
import StoreView from "../views/StoreView.vue";
import OrderView from "@/views/OrderView.vue";
import store from "../store/index.js"

const routes = [
  { path: '/', redirect: '/store' },
  { path: '/login', component: LoginView},
  { path: '/store', component: StoreView},
  {path: '/orders', component: OrderView, beforeEnter: () => {
    return store.getters.isAuthenticated;
    }},
  { path: '/:notFound(.*)', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
