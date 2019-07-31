<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="标准列表"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">
            <dk-list-key-value class="dk-normal-list-header" :xs="24" :sm="8" position="center" :list="statistics" ></dk-list-key-value>
        </el-card>
        <el-card class="dk-box-card-main" shadow="never">
            <!-- 搜索表单 -->
            <el-form :inline="true" :model="searchForm" @submit.native="submitSearchForm" size="small"
                     class="dk-search-form">
                <el-form-item prop="status" key="status">
                    <el-radio-group v-model="searchForm.status">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="进行中"></el-radio-button>
                        <el-radio-button label="等待中"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="title" key="title">
                    <el-input placeholder="请输入" v-model="searchForm.title">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>

            <!-- 列表 -->
            <el-button class="dk-btn-block is-ghost" size="small" plain icon="el-icon-plus">添加</el-button>

            <dk-list class="dk-list-style-dynamic" :list="listData">

            </dk-list>

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "ListNormal",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'标准列表'}],

        statistics:[{key:'我的待办',value:'8个任务'},{key:'本周任务平均处理时间',value:'32分钟'},{key:'本周完成任务数',value:'24个任务'}],

        searchForm: {
          title: '',
          status: '全部',
        },

        listData: [],
      }
    },
  }
</script>

<style scoped>

</style>