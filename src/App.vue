<template>
  <div id="app">
    <router-view ref="app-router" />
    <!-- 返回顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
  import enquire from 'enquire.js';
export default {
  name: 'app',
  mounted() {
    const self = this;
    // 屏幕宽度响应
    self.$util.forEach({
      xs: '(max-width: 575.98px)',
      sm: '(min-width: 576px) and (max-width: 767.98px)',
      md: '(min-width: 768px) and (max-width: 991.98px)',
      lg: '(min-width: 992px) and (max-width: 1199.98px)',
      xl: '(min-width: 1200px) and (max-width: 1599.98px)',
      xxl: '(min-width: 1600px)'
    },function (n,k) {
      enquire.register("screen and "+n,{
        match:function () {
          self.$store.commit('setScreen',k);
        }
      })
    })
  }
}
</script>
