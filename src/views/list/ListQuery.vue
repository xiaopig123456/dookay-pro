<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="查询表格"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">
            <!-- 搜索表单 -->
            <el-form action="javascript:void(0);" :inline="true" :model="searchForm" @submit.native="submitSearchForm" size="small"
                     class="dk-search-form">
                <el-form-item label="规则名称：" prop="ruleName" key="ruleName">
                    <el-input v-model="searchForm.ruleName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="使用状态：" prop="status" key="status">
                    <el-select v-model="searchForm.status" placeholder="请选择">
                        <el-option label="关闭" value="0"></el-option>
                        <el-option label="运行中" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="openSearchForm">
                    <el-form-item label="调用次数：" prop="number" key="number">
                        <el-input-number v-model="searchForm.number" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="更新日期：" prop="date" key="date">
                        <el-date-picker v-model="searchForm.date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </template>
                <el-form-item class="dk-search-form-button" key="search-form-button">
                    <el-button type="primary" native-type="submit">查询</el-button>
                    <el-button native-type="reset">重置</el-button>
                    <el-button type="text" @click="openSearchForm = !openSearchForm">{{openSearchForm?'收起':'展开'}}<i
                            :class="[openSearchForm?'el-icon-arrow-up':'el-icon-arrow-down']"></i></el-button>
                </el-form-item>
                <el-divider></el-divider>
            </el-form>
            <!-- 列表操作按钮 -->
            <div class="dk-query-table-operation">
                <dk-link-button type="primary" icon="el-icon-plus" size="small">添加数据</dk-link-button>
                <template v-if="selectionData.length>0">
                    <el-button size="small">批量操作</el-button>
                    <el-dropdown>
                        <el-button size="small">
                            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>删除</el-dropdown-item>
                            <el-dropdown-item>批量审批</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </div>
            <!-- 表格列表 -->
            <el-table
                    class="dk-query-table-list"
                    :data="listData"
                    @selection-change="handleSelectionData"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="address" min-width="200" label="地址" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        :filters="listDataStatus"
                        width="120">
                    <template slot-scope="scope">
                        <template v-for="(item,index) in listDataStatus">
                            <dk-status v-if="item.value === scope.row.status" :type="item.type" :text="item.text" :key="index"></dk-status>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="date" label="日期" width="150"></el-table-column>
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
  // 测试数据
  let listData = [];
  for (let i = 1; i <= 10; i++) {
    listData.push({
      id: i,
      name: '王小虎',
      status: 1,
      address: '上海市普陀区金沙江路 1518 弄',
      date: '2016-05-03',
    })
  }

  export default {
    name: "ListQuery",
    data() {
      return {
        breadcrumb: [{title: '首页', name: 'index'}, {title: '列表页'}, {title: '查询表格'}],

        openSearchForm: false,
        searchForm: {
          ruleName: '',
          status: '',
          number: null,
          date: '',
        },

        listData: listData,
        selectionData: [],
        listDataStatus:[{ text: '关闭', value: 0,type:'info'}, { text: '已上线', value: 1 ,type:'success'}, { text: '运行中', value: 2 ,type:'primary'}, { text: '异常', value: 3 ,type:'danger'}],

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
       * 选择数据
       * @param val
       */
      handleSelectionData(val) {
        this.selectionData = val;
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