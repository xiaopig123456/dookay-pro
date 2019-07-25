<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="基础详情页"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "DetailBase",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'详情页'},{title:'基础详情页'}],
      }
    },
  }
</script>

<style scoped>

</style>