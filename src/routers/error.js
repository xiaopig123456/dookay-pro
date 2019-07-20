export default [
  {
    path: '/error401',
    name:'error401',
    meta: {title: '401页'},
    component:()=> import('../views/error/Error401')
  },
  {
    path: '/error404',
    name:'error404',
    meta: {title: '404页'},
    component:()=> import('../views/error/Error404')
  },
  {
    path: '/error500',
    name:'error500',
    meta: {title: '500页'},
    component:()=> import('../views/error/Error500')
  },
  {
    path: '/error-default',
    name:'errorDefault',
    meta: {title: '通用错误'},
    component:()=> import('../views/error/ErrorDefault')
  },
]