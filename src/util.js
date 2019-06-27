import index from './utils/index'

// 工具请按功能划分
export default{
  install(Vue){
    Vue.prototype.$util = {
      ...index,
    }
  }
}