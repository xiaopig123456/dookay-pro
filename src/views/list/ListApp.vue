<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="搜索列表（应用）">
            <el-row type="flex" justify="center">
                <el-col :sm="16" :md="12" :lg="10">
                    <div class="dk-search-list-form-keywords">
                        <el-input placeholder="请输入关键词" @keyup.enter.native="submitSearchForm" v-model="searchForm.keywords"></el-input>
                        <el-button type="primary" @click="submitSearchForm">搜索</el-button>
                    </div>
                </el-col>
            </el-row>

            <el-tabs class="dk-page-header-menu" v-model="searchForm.menu" @tab-click="handleMenuClick">
                <el-tab-pane label="文章" name="listArticle"></el-tab-pane>
                <el-tab-pane label="项目" name="listProject"></el-tab-pane>
                <el-tab-pane label="应用" name="listApp"></el-tab-pane>
            </el-tabs>
        </dk-page-header>
        <el-card class="dk-box-card" shadow="never">
            <!-- 搜索表单 -->
            <el-form action="javascript:void(0);" :inline="true" :model="searchForm" @submit.native="submitSearchForm" size="small"
                     class="dk-search-form">
                <div class="dk-search-form-item dk-search-form-item-small">
                    <div class="dk-search-form-label">所属类目：</div>
                    <div class="dk-search-form-control">
                        <el-form-item prop="category" key="category">
                            <el-checkbox-group class="dk-checkbox-group-relax" v-model="searchForm.category">
                                <el-checkbox-button label="全部">全部</el-checkbox-button>
                                <el-checkbox-button label="类目一">类目一</el-checkbox-button>
                                <el-checkbox-button label="类目二">类目二</el-checkbox-button>
                                <el-checkbox-button label="类目三">类目三</el-checkbox-button>
                                <el-checkbox-button label="类目四">类目四</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="dk-search-form-item dk-search-form-item-small">
                    <div class="dk-search-form-label">其他选项：</div>
                    <div class="dk-search-form-control">
                        <el-form-item label="好评度" prop="hot" key="hot">
                            <el-select v-model="searchForm.hot" placeholder="请选择">
                                <el-option label="优秀" value="优秀"></el-option>
                                <el-option label="普通" value="普通"></el-option>
                                <el-option label="很差" value="很差"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否推荐" prop="push" key="push">
                            <el-select v-model="searchForm.push" placeholder="请选择">
                                <el-option label="是" value="是"></el-option>
                                <el-option label="否" value="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </el-card>
        <!-- 列表 -->
        <el-row class="dk-list-app" :gutter="20">
            <el-col :sm="12" :md="8" :lg="6" v-for="(item, index) in listData" :key="index">
                <el-card class="dk-card" shadow="hover">
                    <div class="dk-card-body">
                        <dk-list :is-single-data="true" :list="item">
                            <template slot="media" slot-scope="scope">
                                <a href="javascript:void (0);"><el-avatar :src="scope.row.image" :size="24"></el-avatar></a>
                            </template>
                            <template slot="header" slot-scope="scope">
                                <div class="dk-media-heading">
                                    <h4><a href="javascript:void (0);">{{scope.row.title}}</a></h4>
                                </div>
                            </template>
                        </dk-list>
                    </div>
                    <div class="dk-card-footer">
                        <el-tooltip effect="dark" content="下载" placement="top">
                            <el-button type="text" icon="el-icon-download"></el-button>
                        </el-tooltip>
                        <el-divider direction="vertical"></el-divider>
                        <el-tooltip effect="dark" content="编辑" placement="top">
                            <el-button type="text" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-divider direction="vertical"></el-divider>
                        <el-tooltip effect="dark" content="分享" placement="top">
                            <el-button type="text" icon="el-icon-share"></el-button>
                        </el-tooltip>
                        <el-divider direction="vertical"></el-divider>
                        <el-dropdown>
                            <el-button type="text" icon="el-icon-more"></el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
    name: "ListApp",
    data(){
      // 测试数据
      let listData = [];
      for (let i =0;i<12;i++){
        listData.push({
          title:'Dookay Pro',
          description:'活跃用户19万，新增用户1884人',
          image:'/img/avatar.jpg',
        })
      }

      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'搜索列表'},{title:'应用'}],

        searchForm: {
          keywords: '',
          menu: this.$route.name,
          category: [],
          hot:null,
          push:null,
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