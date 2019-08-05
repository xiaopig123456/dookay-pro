<template>
    <el-container class="dk-passport-layout">
        <el-main class="dk-passport-main">
            <div class="dk-passport-brand">
                <a href="javascript:void(0);">
                    <img src="/img/logo.png">
                    <h1>{{title}}</h1>
                </a>
                <p class="dk-passport-brand-desc">{{title}}是稻壳数字品牌部通用管理后台皮肤</p>
            </div>
            <router-view />
        </el-main>
        <dk-footer></dk-footer>
    </el-container>
</template>

<script>
  export default {
    name: "Passport",
    data() {
      return {
        title:process.env.VUE_APP_TITLE,
      }
    },
  }
</script>

<style scoped>

</style>