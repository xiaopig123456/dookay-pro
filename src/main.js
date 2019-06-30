import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/index'
import './plugins/element'

import './permission'

// 引入样式
import './styles/element.scss'
import './styles/main.scss'

// 挂载api请求
const requestFiles = require.context('./requests', true, /.js$/).keys();
Vue.use({
  install(Vue){
    Vue.prototype.$request = requireJs(requestFiles,'requests')
  }
})

// 挂载工具
const utilFiles = require.context('./utils', true, /.js$/).keys()
Vue.use({
  install(Vue){
    Vue.prototype.$util = requireJs(utilFiles,'utils')
  }
})

// 注册component全局组件
const components = require.context('./components', true, /.vue$/).keys()
Vue.use({
  install:function (Vue){
    components.forEach(function (n) {
      const path = n.replace(/\.\/|\.vue/g,'')
      let name = path.split('/')
      name = name[name.length-1]
      name = name.replace(name[0],name[0].toUpperCase())

      Vue.component(name,()=>import(`./components/`+path))
    });
  }
})

/**
 * 引入js
 * @param files
 * @param folder
 */
function requireJs(files,folder) {
  let res = {}
  files.forEach(function (n) {
    const path = n.replace(/\.\/|\.js/g,'')
    const _import = require(`./${folder}/`+path)

    for (let o in _import){
      if(o === 'default'){
        for (let i in _import[o]){
          res[i] = _import[o][i]
        }
      }else{
        res[o] = _import[o]
      }
    }
  });
  return res
}

// vue
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')