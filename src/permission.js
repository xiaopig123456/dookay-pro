import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// 路由拦截
router.beforeEach(async (to, from, next)=>{
  NProgress.start()

  // 动态更换网页标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  // todo::权限验证

  next();
});

router.afterEach(() => {
  NProgress.done()
});