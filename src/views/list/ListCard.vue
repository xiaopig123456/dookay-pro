<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="卡片列表"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "ListCard",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'卡片列表'}],
      }
    },
  }
</script>

<style scoped>

</style>