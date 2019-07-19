import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 屏幕尺寸，存在的值 xs|sm|md|lg|xl|xxl
    screen:null,
  },
  mutations: {
    /**
     * 设置屏幕尺寸
     * @param state
     * @param data
     */
    setScreen(state,data){
      state.screen = data;
    }
  },
  actions: {

  }
})
