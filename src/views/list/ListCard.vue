<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="卡片列表" description="段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。">
            <div class="dk-page-header-content-link">
                <dk-link-button type="text"><i class="el-icon-position"></i>快速开始</dk-link-button>
                <dk-link-button type="text"><i class="ion-md-help"></i>产品简介</dk-link-button>
                <dk-link-button type="text"><i class="el-icon-document"></i>产品文档</dk-link-button>
                <img class="dk-bg" src="/img/bg-1.png" draggable="true">
            </div>
        </dk-page-header>

        <!-- 列表 -->
        <el-row class="dk-list-app" :gutter="20">
            <el-col :sm="12" :md="8" v-for="(item, index) in listData" :key="index">
                <el-card class="dk-card" shadow="hover">
                    <div class="dk-card-body">
                        <dk-list :is-single-data="true" :list="item">
                            <template slot="media" slot-scope="scope">
                                <a href="javascript:void (0);"><el-avatar :src="scope.row.image" :size="48"></el-avatar></a>
                            </template>
                            <template slot="header" slot-scope="scope">
                                <div class="dk-media-heading">
                                    <h4><a href="javascript:void (0);">{{scope.row.title}}</a></h4>
                                </div>
                            </template>
                        </dk-list>
                    </div>
                    <div class="dk-card-footer" btn-number="2">
                        <el-button type="text">操作一</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text">操作二</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 分页 -->
        <el-pagination
                class="dk-pagination"
                background
                @size-change="handlePageSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.currentPage"
                :page-sizes="[12,50,100, 200, 300, 400]"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :pager-count="5"
                :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    name: "ListCard",
    data(){
      // 测试数据
      let listData = [];
      for (let i =0;i<12;i++){
        listData.push({
          title:'Dookay Pro',
          description:'在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
          image:'/img/avatar.jpg',
        })
      }

      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'卡片列表'}],

        listData: listData,

        pagination:{
          currentPage:1,
          pageSize:10,
          total:400,
        }
      }
    },
    methods: {
      /**
       * 搜索表单提交
       */
      submitSearchForm() {
        this.$message.info(`你进行了搜索。`)
      },
      /**
       * 切换页面
       */
      handleMenuClick() {
        this.$router.push({name:this.searchForm.menu})
      },

      /**
       * 分页
       */
      handlePageSizeChange(val){
        this.$message.info(`每页 ${val} 条`);
      },
      handleCurrentChange(val){
        this.$message.info(`当前页: ${val}`);
      },
    },
  }
</script>

<style scoped>

</style>