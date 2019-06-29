const layouts = require.context('./layouts', true, /.vue$/).keys()
const components = require.context('./components', true, /.vue$/).keys()

export default {
  install:function (Vue){
    const map = {
      layouts:layouts,
      components:components
    };

    for(let folder in map){
      map[folder].forEach(function (n) {
        const path = n.replace(/\.\/|\.vue/g,'')
        let name = path.split('/')
        name = name[name.length-1]
        name.replace(name[0],name[0].toUpperCase())

        Vue.component(name,()=>import(`./${folder}/`+path))
      });
    }
  }
}