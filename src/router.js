import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerFiles = require.context('./routers', true, /.js$/).keys()
let routers = []
routerFiles.forEach(function (n) {
  const path = n.replace(/\.\/|\.js/g,'')
  const _routers = require(`./routers/`+path)

  for (let o in _routers){
    if(o === 'default'){
      routers = routers.concat(_routers[o])
    }
  }
});

export default new Router({
  mode: 'history',
  routes:routers
})
