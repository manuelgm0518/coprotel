import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    }, {
      path: '/login',
      name: 'LogIn',
      component: () => import('../views/LogIn.vue')
    },{
      path: '/register',
      name:'Register',
      component: () => import('../views/Register.vue')
    }, {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },{
      path: '/favorites',
      name: 'Favorites',
      component: () => import('../views/Favorites.vue')
    },{
      path: '/rents/:userId?',
      name: 'Rents',
      component: () => import('../views/Rents.vue')
    },{
      path: '/profile/:userId?',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    },{
      path: '/addoffice',
      name: 'AddOffice',
      component: () => import('../views/AddOffice.vue')
    }
  ]
})