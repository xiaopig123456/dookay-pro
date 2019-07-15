<template>
  <div id="app">
    <router-view ref="app-router" />
    <!-- 返回顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
