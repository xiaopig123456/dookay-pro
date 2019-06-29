import Vue from 'vue'
import VueAxios from "vue-axios"
import axios from "axios"
import VueMoment from "vue-moment";

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

Vue.use(VueAxios, axios)
Vue.use(VueMoment)