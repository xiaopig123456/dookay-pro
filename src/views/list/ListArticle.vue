<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="文章"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "ListArticle",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'搜索列表'},{title:'文章'}],
      }
    },
  }
</script>

<style scoped>

</style>