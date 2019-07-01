export default [
  {
    path: '/index',
    name:'index',
    meta: {default:true,title: 'Index'},
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
