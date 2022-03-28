import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/admin/products',
    name: 'Admin products',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/Products.vue')
  },
  {
    path: '/client/products',
    name: 'Client products',
    component: () => import(/* webpackChunkName: "about" */ '../views/client/Products.vue')
  }
  ,
  {
    path: '/client/wishlist',
    name: 'Client wishlist',
    component: () => import(/* webpackChunkName: "about" */ '../views/client/WishList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
