export default [
  {
    path: '/form-base',
    name:'formBase',
    meta: {title: '基础表单'},
    component:()=> import('../views/form/FormBase')
  },
  {
    path: '/form-step',
    name:'formStep',
    meta: {title: '分步表单'},
    component:()=> import('../views/form/FormStep')
  },
  {
    path: '/form-advanced',
    name:'formAdvanced',
    meta: {title: '高级表单'},
    component:()=> import('../views/form/FormBase')
  }
]