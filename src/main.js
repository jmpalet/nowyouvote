import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FirebaseAuthPlugin from './plugins/FirebaseAuth'

Vue.use(FirebaseAuthPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
