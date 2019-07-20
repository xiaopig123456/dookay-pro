export default [
  {
    path: '/detail-base',
    name:'detailBase',
    meta: {title: '基础详情页'},
    component:()=> import('../views/detail/DetailBase')
  },
  {
    path: '/detail-advanced',
    name:'detailAdvanced',
    meta: {title: '高级详情页'},
    component:()=> import('../views/detail/DetailAdvanced')
  },
]