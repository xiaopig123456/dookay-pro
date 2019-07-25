<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="查询表格"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">
            <el-form :inline="true" :model="searchForm" size="small" class="dk-search-form">
                <el-form-item label="审批人：" prop="">
                    <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域：">
                    <el-select v-model="searchForm.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>


        </el-card>
    </div>
</template>

<script>
  export default {
    name: "ListQuery",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'查询表格'}],

        openSearchForm:false,

        searchForm:{

        }
      }
    },
  }
</script>

<style scoped>

</style>