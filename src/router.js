import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Create from './views/Create.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: {
        authRequred: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta: {
        authRequred: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequred)) {
    if (!store.state.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router