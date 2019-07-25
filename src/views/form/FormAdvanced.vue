<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="高级表单"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "FormAdvanced",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'表单页'},{title:'高级表单'}],
      }
    },
  }
</script>

<style scoped>

</style>