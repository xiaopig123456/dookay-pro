const utilFiles = require.context('./utils', true, /.js$/).keys()
let utils = {}
utilFiles.forEach(function (n) {
  const path = n.replace(/\.\/|\.js/g,'')
  const _utils = require(`./utils/`+path)

  for (let o in _utils){
    if(o === 'default'){
      for (let i in _utils[o]){
        utils[i] = _utils[o][i]
      }
    }else{
      utils[o] = _utils[o]
    }
  }
});

export default{
  install(Vue){
    Vue.prototype.$util = utils
  }
}