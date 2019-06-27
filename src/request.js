import axios from 'axios'
import index from './requests/index'

// axios 插件拦截
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config=>{
  /*const token = localStorage.getItem('ACCESS_TOKEN');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }*/
  return config;
});
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

// 请求接口请按模块划分
export default{
  install(Vue){
    Vue.prototype.$request = {
      ...index,
    }
  }
}