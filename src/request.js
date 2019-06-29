const requestFiles = require.context('./requests', true, /.js$/).keys();
let requests = {};
requestFiles.forEach(function (n) {
  const path = n.replace(/\.\/|\.js/g,'');
  const _requests = require(`./requests/`+path);

  for (let o in _requests){
    if(o === 'default'){
      for (let i in _requests[o]){
        requests[i] = _requests[o][i]
      }
    }else{
      requests[o] = _requests[o]
    }
  }
});

export default{
  install(Vue){
    Vue.prototype.$request = requests
  }
}
