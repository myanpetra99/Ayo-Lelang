import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Item from '@/pages/Item'
import Dashboard from '@/pages/Dashboard'
import Register from '@/pages/Register'
import User from '@/pages/User'
import store from '../store/store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter : (to, from, next) => {
        if(store.state.auth == false){
          next()
        }else{
          next('/')
        }
      }
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: Item,
      props: true,
      beforeEnter : (to, from, next) => {
        if( store.state.auth == false  ){
          next('/login')
        }else{
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter : (to, from, next) => {
        if(store.state.auth == false){
          next()
        }else{
          next('/')
        }
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      beforeEnter : (to, from, next) => {
        if(store.state.auth == false){
          next('/login')
        }else{
          next()
        }
      }
    }
  ]
})
