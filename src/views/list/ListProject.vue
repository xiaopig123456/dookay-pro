<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="搜索列表（项目）">
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
        <el-row class="dk-list-card" :gutter="20">
            <el-col :sm="12" :md="8" :lg="6" v-for="(item, index) in listData" :key="index">
                <el-card class="dk-card" shadow="hover">
                    <a href="javascript:void (0);" class="dk-card-img-top"><el-image :lazy="true" :src="item.image" fit="cover"></el-image></a>
                    <div class="dk-card-body">
                        <div class="dk-card-title"><a href="javascript:void (0);">{{item.title}}</a></div>
                        <div class="dk-card-text">{{item.description}}</div>
                        <div class="dk-card-bottom">
                            <span class="time">{{item.time}}</span>
                            <div class="dk-card-avatars">
                                <el-tooltip v-for="(v,i) in item.avatars" :key="i" effect="dark" content="朱俊俊" placement="top">
                                    <el-avatar :src="v" :size="22"></el-avatar>
                                </el-tooltip>
                            </div>
                        </div>
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
    name: "ListProject",
    data(){
      // 测试数据
      let listData = [];
      for (let i =0;i<12;i++){
        listData.push({
          title:'Dookay Pro',
          description:'希望是一个好东西，也许是最好的，好东西是不会消亡的。',
          time:'2小时前',
          image:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          avatars:['/img/avatar.jpg','/img/avatar.jpg','/img/avatar.jpg']
        })
      }

      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'列表页'},{title:'搜索列表'},{title:'项目'}],

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