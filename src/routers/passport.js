export default [
  {
    path: "/login",
    name:'login',
    meta: {layout:'Passport', title: '登录' },
    component: () => import("../views/passport/Login"),
  }
]
