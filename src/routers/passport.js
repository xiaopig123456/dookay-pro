export default [
  {
    path: "/login",
    name:'login',
    meta: {layout:'Passport', title: '登录' },
    component: () => import("../views/passport/Login"),
  },
  {
    path: "/find-password",
    name:'findPassword',
    meta: {layout:'Passport', title: '找回密码' },
    component: () => import("../views/passport/FindPassword"),
  },
  {
    path: "/register",
    name:'register',
    meta: {layout:'Passport', title: '注册' },
    component: () => import("../views/passport/Register"),
  }
]
