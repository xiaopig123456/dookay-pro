import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 权限过滤
import './permission'

// 载入插件
require.context('./plugins', true, /.js$/).keys().forEach(function (n) {
  require(`./plugins/`+n.replace(/\.\/|\.js/g,''))
});

// 引入样式
require.context('./styles', true, /.(scss|css)$/).keys().forEach(function (n) {
  n = n.replace(/\.\//g,'')
  let name = n.split('/')
  name = name[name.length-1]
  if(n === 'variables.scss' || name.indexOf('_') === 0) return;
  require(`./styles/`+n)
});

// 挂载api请求
Vue.use({
  install(Vue){
    Vue.prototype.$request = requireJs(require.context('./requests', true, /.js$/).keys(),'requests')
  }
})

// 挂载工具
Vue.use({
  install(Vue){
    Vue.prototype.$util = requireJs(require.context('./utils', true, /.js$/).keys(),'utils')
  }
})

// 注册component全局组件
Vue.use({
  install:function (Vue){
    require.context('./components', true, /.vue$/).keys().forEach(function (n) {
      n = n.replace(/\.\/|\.vue/g,'')

      if(n.indexOf('_') === 0) return;

      let name = n.split('/')
      name = name[name.length-1]
      name = name.replace(name[0],name[0].toUpperCase())

      Vue.component(name,()=>import(`./components/`+n))
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