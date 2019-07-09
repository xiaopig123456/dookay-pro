<template>
    <div>
        <h1>Index</h1>
        <hello-world msg="Hello World !" />
        <el-button type="primary">Start</el-button>
    </div>
</template>

<script>
  let layouts = {};
  const layoutComponents = require.context('../layouts', true, /.vue$/);
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
  require.context('../routers', true, /.js$/).keys().forEach(function (n) {
    const path = n.replace(/\.\/|\.js/g,'')
    const _routers = require(`../routers/`+path)
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
      _route.redirect = _route.path +'/'+ _route.children[0].path;
    }
    _route.redirect = _route.redirect.replace('//','/')
    routers.unshift(_route)
  }
  console.log(routers)
  export default {
    name: "Index",
  }
</script>

<style scoped>

</style>