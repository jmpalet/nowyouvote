import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Create from './views/Create.vue'
import Polls from './views/Polls.vue'
import Poll from './views/Poll.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
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
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/polls',
      name: 'polls',
      component: Polls,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/poll/:id',
      name: 'poll',
      component: Poll
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user || (store.state.user && store.state.user.isAnonymous)) {
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