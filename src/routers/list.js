export default [
  {
    path: '/list-article',
    name:'listArticle',
    meta: {title: '搜索列表（文章）'},
    component:()=> import('../views/list/ListArticle')
  },
  {
    path: '/list-project',
    name:'listProject',
    meta: {title: '搜索列表（项目）'},
    component:()=> import('../views/list/ListProject')
  },
  {
    path: '/list-app',
    name:'listApp',
    meta: {title: '搜索列表（应用）'},
    component:()=> import('../views/list/ListApp')
  },
  {
    path: '/list-query',
    name:'listQuery',
    meta: {title: '查询表格'},
    component:()=> import('../views/list/ListQuery')
  },
  {
    path: '/list-normal',
    name:'listNormal',
    meta: {title: '标准列表'},
    component:()=> import('../views/list/ListNormal')
  },
  {
    path: '/list-card',
    name:'listCard',
    meta: {title: '卡片列表'},
    component:()=> import('../views/list/ListCard')
  },
]