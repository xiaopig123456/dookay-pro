import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 通过路由元信息meta: {layout:'Default',default:true} 设置布局
// meta不存在或layout不存在，即默认为“Default”布局，设置layout = false时表示禁用布局
// default 布局路由默认跳转的路由页，一个布局下路由至多设置一个，否则将取最后一个。如果一个布局下未设置此值，将取第一个作为跳转页。

let layouts = {};
const layoutComponents = require.context('./layouts', true, /.vue$/);
layoutComponents.keys().forEach(function (n) {
  const path = n.replace(/\.\/|\.vue/g,'')
  let name = path.split('/')
  name = name[name.length-1]
  name = name.replace(name[0],name[0].toLowerCase())
  layouts[name] = {
    path: '/'+ (name === 'default'?'':name),
    name:name+'Layout',
    component:layoutComponents(n).default,
    children:[],
  }
});

let routers = []
let redirect = {};
require.context('./routers', true, /.js$/).keys().forEach(function (n) {
  const path = n.replace(/\.\/|\.js/g,'')
  const _routers = require(`./routers/`+path)
  _routers.default.forEach(function (r) {
    if(typeof r.meta === 'undefined'){
      r.meta = {layout:'default'}
    }else if(typeof r.meta.layout === 'undefined'){
      r.meta.layout = 'default'
    }

    if(r.meta.layout){
      r.meta.layout = r.meta.layout.replace(r.meta.layout[0],r.meta.layout[0].toLowerCase())
      if(typeof layouts[r.meta.layout] !== 'undefined'){
        if(r.meta.default){
          redirect[r.meta.layout] = layouts[r.meta.layout].path + r.path
        }
        if(r.path && r.path.indexOf('/') === 0) r.path = r.path.substr(1);
        layouts[r.meta.layout].children.push(r)
      }else{
        routers.push(r)
      }
    }else{
      routers.push(r)
    }
  })
});

for(let name in layouts){
  let _route = layouts[name];
  if(_route.children.length < 1) continue;

  if(typeof redirect[name] !== 'undefined'){
    _route.redirect = redirect[name];
  }else{
    _route.redirect = _route.path + '/' + _route.children[0].path;
  }
  _route.redirect = _route.redirect.replace('//','/')
  routers.unshift(_route)
}

export default new Router({
  mode: 'history',
  routes:routers
})
