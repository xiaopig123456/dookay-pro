<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="工作台">
            <el-row :gutter="20">
                <el-col :sm="24" :md="12">
                    <dk-list class="dk-workplace-user" :list="userInfo" media-shape="circle">
                        <template slot="header" slot-scope="scope">
                            <h4>{{greetings + '，' + scope.item.title}}</h4>
                        </template>
                    </dk-list>
                </el-col>
                <el-col :sm="24" :md="12">
                    <dk-list-key-value class="dk-workplace-statistics" position="right" :list="statistics" ></dk-list-key-value>
                </el-col>
            </el-row>
        </dk-page-header>

        <el-card class="dk-box-card" shadow="never">
            <div slot="header" class="clearfix">
                <h4 class="dk-card-header-title">进行中的项目</h4>
                <div class="dk-card-header-right">
                    <el-button type="text">全部项目</el-button>
                </div>
            </div>
            <dk-list class="dk-list-style-project" :list="listData" media-shape="circle">
                <template slot="default" slot-scope="scope">
                    <div class="dk-list-description">{{scope.item.desc}}</div>
                    <div class="dk-list-style-project-bottom">
                        <span class="dk-pull-right">{{scope.item.time}}</span>
                        <a href="javascript:void(0);">{{scope.item.username}}</a>
                    </div>
                </template>
            </dk-list>
        </el-card>
        <el-card class="dk-box-card" shadow="never">
            <div slot="header" class="clearfix">
                <h3 class="dk-card-header-title">动态</h3>
            </div>
            <dk-list class="dk-list-style-dynamic" :list="listData" media-shape="circle">
                <template slot="header" slot-scope="scope">
                    小pig 在 <a href="javascript:void(0);">{{scope.item.username}}</a> 新建项目 <a href="javascript:void(0);">{{scope.item.title}}</a>
                </template>
                <template slot="body" slot-scope="scope">
                    <div class="dk-list-description">{{scope.item.time}}</div>
                </template>
            </dk-list>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "Workplace",
    data(){
      const avatar = require('../../assets/img/avatar.jpg');

      let listData = [];
      for (let i =0;i<6;i++){
        listData.push({
          image:avatar,
          title:'Dookay Pro',
          desc:'城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
          username:'高逼格公司',
          time:'42 分钟前'
        })
      }

      return {
        userInfo:[{image:avatar,title:'Xiao Pig，祝您开心每一天！',description:'交互专家 |稻壳互联－某某某事业群－某某平台部－某某技术部'}],
        breadcrumb:[{title:'首页',name:'index'},{title:'仪表盘'},{title:'工作台'}],
        statistics:[{key:'项目数',value:'56'},{key:'团队国内排名',value:'8'},{key:'项目访问',value:'2,223'}],
        listData:listData,
      }
    },
    computed:{
      // 问候语
      greetings(){
        const currentHour = parseInt(this.$moment().format('H'));
        let str = '';
        if(currentHour>=7 && currentHour<11){
          str = '早上';
        }else if(currentHour>=11 && currentHour<13){
          str = '中午';
        }else if(currentHour>=13 && currentHour<19){
          str = '下午';
        }else{
          str = '晚上';
        }
        return str+'好';
      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>