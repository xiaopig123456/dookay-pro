export default [
  {
    path: '/index',
    name:'index',
    meta: {default:true,title: '组件'},
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
