import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './request'
import util from './util'

import './plugins/index'
import './plugins/element'
import './permission'

import './styles/element.scss'
import './styles/main.scss'

Vue.use(request)
Vue.use(util)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
