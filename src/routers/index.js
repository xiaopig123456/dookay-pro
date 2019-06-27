export default [
  {
    path: '/',
    name:'index',
    meta: { title: 'Index'},
    component:()=> import('../views/Index')
  },
  {
    path: "*",
    name:'error',
    meta: { title: 'Error' },
    component: () => import("../views/Error"),
    hidden: true
  }
]
