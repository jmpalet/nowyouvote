import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import FirebasePlugin from './plugins/Firebase'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(FirebasePlugin)
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
