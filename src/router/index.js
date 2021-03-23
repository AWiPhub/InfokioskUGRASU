import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hello',
    name: 'Hello',
    component: () => import('../views/Hello.vue')
  },
  {
    path: '/structure',
    name: 'Structure',
    component: () => import('../views/Structure.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  },
  {
    path: '/newsKadr',
    name: 'NewsKadr',
    component: () => import('../views/newsKadr.vue'),
    props: true
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/MapProjects.vue'),
    props: true
  },
  {
    path: '/realise-projects',
    name: 'RealiseProjects',
    component: () => import('../views/RealiseProjects.vue')
  },
  {
    path: '/cities',
    name: 'Cities',
    component: () => import('../views/Cities.vue')
  },
  {
    path: '/cityPage',
    name: 'CityPage',
    component: () => import('../views/cityPage.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
    props: true
  },
  {
    path: '/adminNacProjects',
    name: 'adminNacProjects',
    component: () => import('../views/adminNacProjects.vue'),
    props: true
  },
  {
    path: '/adminCities',
    name: 'adminCities',
    component: () => import('../views/adminCities.vue'),
    props: true
  },
  {
    path: '/adminStruct',
    name: 'adminStruct',
    component: () => import('../views/adminStruct.vue'),
    props: true
  },
  {
    path: '/adminNewsKadr',
    name: 'adminNewsKadr',
    component: () => import('../views/adminNewsKadr.vue'),
    props: true
  },
  {
    path: '/adminHello',
    name: 'adminHello',
    component: () => import('../views/adminHello.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
