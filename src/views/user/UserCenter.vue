<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="个人中心"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "UserCenter",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'个人页'},{title:'个人中心'}],
      }
    },
  }
</script>

<style scoped>

</style>