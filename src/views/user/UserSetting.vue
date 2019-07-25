<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="个人设置"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "UserSetting",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'个人页'},{title:'个人设置'}],
      }
    },
  }
</script>

<style scoped>

</style>