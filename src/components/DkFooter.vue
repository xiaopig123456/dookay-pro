<template>
    <el-footer class="dk-footer">
        <nav class="dk-footer-menu">
            <a href="/" target="_blank">前台首页</a>
            <a class="dk-footer-nav-logo" href="http://www.dookay.com/" target="_blank"><img src="../assets/img/logo.png"></a>
            <a href="http://www.dookay.com/" target="_blank">帮助文档</a>
        </nav>
        <p>Copyright &copy; 2019 上海稻壳网络科技有限公司数字品牌部出品</p>
        <slot></slot>
    </el-footer>
</template>

<script>
  export default {
    name: "DkFooter"
  }
</script>

<style scoped>

</style>