export default [
  {
    path: '/user-center',
    name:'userCenter',
    meta: {title: '个人中心'},
    component:()=> import('../views/user/UserCenter')
  },
  {
    path: '/user-setting',
    name:'userSetting',
    meta: {title: '个人设置'},
    component:()=> import('../views/user/UserSetting')
  },
]