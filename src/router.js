import Vue from 'vue'
import Router from 'vue-router'
import index from './routers/index'

Vue.use(Router)

// 所有路由请按模块划分
export default new Router({
  mode: 'history',
  routes:[
    ...index,
  ]
})
