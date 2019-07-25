<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="项目"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "ListProject",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'搜索列表'},{title:'项目'}],
      }
    },
  }
</script>

<style scoped>

</style>