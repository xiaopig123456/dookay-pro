<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="搜索列表（文章）">
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
                    <div class="dk-search-form-label">Owner：</div>
                    <div class="dk-search-form-control">
                        <el-form-item prop="owner" key="owner">
                            <el-select v-model="searchForm.owner" multiple placeholder="请选择">
                                <el-option label="我自己" :value="1"></el-option>
                                <el-option label="张三" :value="2"></el-option>
                                <el-option label="李四" :value="3"></el-option>
                                <el-option label="王五" :value="4"></el-option>
                            </el-select>
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
        <el-card class="dk-box-card-main" shadow="never">
            <!-- 列表 -->
            <dk-list class="dk-list-search-article" :list="listData">
                <template slot="header" slot-scope="scope">
                    <h4><a href="javascript:void(0);">{{scope.row.title}}</a></h4>
                </template>
                <template slot="body" slot-scope="scope">
                    <div class="dk-tags">
                        <el-tag v-for="(item,index) in scope.row.tags" :key="index" size="mini" type="info">{{item}}</el-tag>
                    </div>
                    <div class="dk-media-description">{{scope.row.description}}</div>
                    <div class="dk-media">
                        <div class="dk-media-aside">
                            <el-avatar :src="scope.row.user.image"></el-avatar>
                        </div>
                        <div class="dk-media-body">
                            <a href="javascript:void(0);">{{scope.row.user.username}}</a> 发布在 <a href="javascript:void(0);">{{scope.row.publicUrl}}</a>
                            <span class="dk-date">{{scope.row.date}}</span>
                        </div>
                    </div>
                    <div class="dk-list-footer-action">
                        <el-button :class="[scope.row.isCollection?'is-active':'']" type="text" icon="el-icon-star-on">{{scope.row.countCollection}}</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button :class="[scope.row.isZan?'is-active':'']" type="text" icon="ion-md-thumbs-up">{{scope.row.countZan}}</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <span :class="[scope.row.isComment?'is-active':'']"><i class="el-icon-s-comment"></i>{{scope.row.countComment}}</span>
                    </div>
                </template>
            </dk-list>
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
    name: "ListArticle",
    data(){
      // 测试数据
      let listData = [];
      for (let i =0;i<6;i++){
        listData.push({
          title:'Dookay Pro',
          description:'段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
          user:{
            username:'朱俊俊',
            image:'/img/avatar.jpg',
          },
          publicUrl:'http://www.dookay.com',
          date:'2019-08-01 16:31',
          isCollection:i===0,
          isZan:i===3,
          isComment:i===5,
          countCollection:182,
          countZan:140,
          countComment:19,
          tags:['设计语言','稻壳互联','行为预判']
        })
      }

      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'搜索列表'},{title:'文章'}],

        searchForm: {
          keywords: '',
          menu: this.$route.name,
          category: [],
          owner: [1],
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