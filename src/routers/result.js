export default [
  {
    path: '/result-success',
    name:'resultSuccess',
    meta: {title: '成功页'},
    component:()=> import('../views/result/ResultSuccess')
  },
  {
    path: '/result-fail',
    name:'resultFail',
    meta: {title: '失败页'},
    component:()=> import('../views/result/ResultFail')
  },
]