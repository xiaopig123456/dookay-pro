<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="标准列表"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">
            <dk-list-key-value class="dk-normal-list-header" :xs="24" :sm="8" align="center" :list="statistics" ></dk-list-key-value>
        </el-card>
        <el-card class="dk-box-card-main" shadow="never">
            <!-- 搜索表单 -->
            <el-form action="javascript:void(0);" :inline="true" :model="searchForm" @submit.native="submitSearchForm" size="small"
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
                        <el-button slot="append" icon="el-icon-search" native-type="submit"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>

            <!-- 标准列表 -->
            <el-button class="dk-btn-block is-ghost" size="small" plain icon="el-icon-plus">添加</el-button>
            <el-table
                    class="dk-normal-list"
                    :data="listData"
                    :show-header="false"
            >
                <el-table-column min-width="250">
                    <template slot-scope="scope">
                        <dk-list :is-single-data="true" :list="scope.row"></dk-list>
                    </template>
                </el-table-column>
                <el-table-column width="100">
                    <template slot-scope="scope">
                        <span class="dk-normal-list-header">Owner</span>
                        <p>{{scope.row.owner}}</p>
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template slot-scope="scope">
                        <span class="dk-normal-list-header">开始时间</span>
                        <p>{{scope.row.date}}</p>
                    </template>
                </el-table-column>
                <el-table-column width="200">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.progress"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="110">
                    <template slot-scope="scope">
                        <el-button @click="handleRowClick('view',scope.row)" type="text" size="small">查看</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-dropdown>
                            <el-button type="text" size="small">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>编辑</el-dropdown-item>
                                <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                    class="dk-pagination"
                    background
                    @size-change="handlePageSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="[10,50,100, 200, 300, 400]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :pager-count="5"
                    :total="pagination.total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "ListNormal",
    data(){

      // 测试数据
      const avatar = require('../../assets/img/avatar.jpg');
      let listData = [];
      for (let i = 1; i <= 5; i++) {
        listData.push({
          id: i,
          title: 'Dookay Pro',
          image:avatar,
          description:'那是一种内在的东西， 他们到达不了，也无法触及的',
          owner: '王小虎',
          progress: 57,
          date: '2016-05-03 11:09',
        })
      }

      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'标准列表'}],

        statistics:[{key:'我的待办',value:'8个任务'},{key:'本周任务平均处理时间',value:'32分钟'},{key:'本周完成任务数',value:'24个任务'}],

        searchForm: {
          title: '',
          status: '全部',
        },

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
       * 行点击操作
       * @param action
       * @param row
       */
      handleRowClick(action,row){
        this.$message.info(`你进行了${action}操作。`)
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