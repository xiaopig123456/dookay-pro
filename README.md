# dookay-pro

基于[element ui](https://element.eleme.cn/#/zh-CN/component/installation)和[ant design pro](preview.pro.ant.design)的开箱即用的中台前端和设计解决方案。

## 项目启动
```
npm install
npm run serve （开发）
npm run build （生产）
```

## 目录结构
```
dookay-pro
├── public
|   ├── img （图片，可选）
|   ├── favicon.ico
|   ├── index.html
├── src
|   ├── assets
│   |   └── img （图片，可选）
|   ├── components （组件）
|   ├── layouts （布局）
│   |   └── Default.vue
|   ├── plugins （插件）
│   |   └── axios.js
│   |   └── element.js
│   |   └── index.js
|   ├── requests （请求api）
│   |   └── index.js
|   ├── routers （路由）
│   |   └── index.js
|   ├── styles （样式）
│   |   └── element.scss
│   |   └── main.scss
│   |   └── variables.scss
|   ├── utils （工具）
│   |   └── index.js
|   ├── views （页面视图）
│   |   └── Error.vue
│   |   └── Index.vue
|   ├── App.vue
|   ├── main.js
|   ├── permission.js（权限）
|   ├── router.js
|   ├── store.js（vuex）
├── .gitignore
├── babel.config.js
├── package.json
├── vue.config.js
```
## 使用约束

### 图片
- `src/assets/img`文件夹下的图片会base64编码进css中，增加css文件的体积，所以无需编码的图片请放到`public/img`文件夹下。

### 组件
- `src/components` 组件目录下的组件会被注册为全局组件，在`src/views`页面中使用无需import引入。
- 创建以`_`下划线开头的文件夹下的组件，不会被注册为全局组件。

### 布局
`src/layouts/Default.vue` 为系统默认布局**不可删除**。布局的使用请看“[路由](#router "路由")”部分介绍。

### 请求api
`src/requests`目录用于存放api接口，其挂载为vue的一个属性，使用`this.$request`来访问。 例如：
```
<script>
  export default {
    name: "Index",
    mounted() {
        this.$request.demo().then(res=>{
          // doing something
        })
    }
  }
</script>
```

### <span id="router">路由</span>
`src/routers`目录用于存放路由文件

路由中，通过路由元信息meta: {layout:'Default',default:true} 设置布局：
- meta 不存在或layout不存在，即默认为“Default”布局，设置layout = false时表示禁用布局。
- meta.layout 布局名，填入`src/layouts`目录下的文件名，不包含后缀。
- meta.default 布局路由默认跳转的路由页，一个布局下路由至多设置一个，否则将取最后一个。如果一个布局下未设置此值，将取第一个作为跳转页。
例如：
```
export default [
  {
    path: '/index',
    name:'index',
    meta: {layout:'Default', default:true,title: 'Index'},
    component:()=> import('../views/Index')
  },
  {
    path: "*",
    name:'error',
    meta: {layout:false, title: 'Error' },
    component: () => import("../views/Error"),
    hidden: true
  }
]
```

### 样式
- `src/styles`样式目录，scss作为主预编译语言。
- 其中`variables.scss`为全局变量，将会被注册到全局任意地方的scss中，**不可删除**。
- 创建以`_`下划线开头的样式文件，将不会被引入。

### 工具
`src/utils`目录用于存放自己写的一些工具函数，其挂载为vue的一个属性，使用`this.$util`来访问。