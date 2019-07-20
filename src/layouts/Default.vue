<template>
    <el-container :class="['dk-wrapper','dk-screen-'+screen,(isSmallScreen?'dk-layout-aside':'dk-layout-'+ layout),'dk-header-'+ fixedHeader,asideIsOpened?'dk-aside-opened':'',fixedAside?'dk-aside-fixed':'']">
        <!-- 侧导航 -->
        <el-aside class="dk-aside-wrapper">
            <div :class="['dk-aside',isSmallScreen?(screenXsAsideIsOpened?'':'dk-aside-mobile-closed'):'']">
                <div class="dk-aside-brand">
                    <a href="javascript:void(0);">
                        <img src="../assets/img/logo.png">
                    </a>
                    <h1>{{title}}</h1>
                </div>
                <div class="dk-aside-menu-wrapper dk-scrollbar-prettify">
                    <el-menu
                            :mode="layout === 'top' && !isSmallScreen?'horizontal':'vertical'"
                            :collapse="isSmallScreen?false:(layout === 'top'?false:!asideComponentStatus)"
                            unique-opened
                            @select="menuSelect"
                            class="dk-aside-menu"
                    >
                        <template v-for="(item,i) in menuList">
                            <dk-sub-menu popper-class="dk-slide-popper" v-if="item.children && item.children.length>0" :menu="item" :key="i"></dk-sub-menu>
                            <el-menu-item v-else :index="item.id" :key="i"><i :class="item.icon?item.icon:'el-icon-document'"></i><span slot="title">{{item.title}}</span></el-menu-item>
                        </template>
                    </el-menu>
                </div>
                <dk-top-menu v-if="layout === 'top' && !isSmallScreen" :screen="screen" v-model="asideComponentStatus" key="aside-menu"></dk-top-menu>
            </div>

            <transition name="el-fade-in">
                <div v-if="isSmallScreen && screenXsAsideIsOpened" class="dk-aside-mask" @click="asideComponentStatus = false"></div>
            </transition>
        </el-aside>
        <!-- 主内容 -->
        <el-container class="dk-container">
            <dk-top-menu v-if="layout === 'aside' || (layout === 'top' && isSmallScreen)" :screen="screen" v-model="asideComponentStatus" key="top-menu"></dk-top-menu>
            <!-- 内容部分 -->
            <el-main class="dk-main">
                <router-view/>
            </el-main>
            <dk-footer></dk-footer>
        </el-container>
    </el-container>
</template>

<script>
    import DkSubMenu from '../components/_menu/DkSubMenu'
    import DkTopMenu from '../components/_menu/DkTopMenu'
    import Headroom from 'headroom.js'

  export default {
    name: "Default",
    components: {DkSubMenu,DkTopMenu},
    data() {
      return {
        title:process.env.VUE_APP_TITLE,
        layout:process.env.VUE_APP_LAYOUT,
        fixedHeader:process.env.VUE_APP_FIXED_HEADER,
        fixedAside:process.env.VUE_APP_FIX_ASIDE_NAV !== 'false',

        // 侧边栏
        asideComponentStatus:true,
        asideIsOpened:true,
        screenXsAsideIsOpened:false,

        // 菜单列表
        menuList: [
          {id:"1",icon:'el-icon-odometer',title: '仪表盘', children:[
              {id:"11",title: '首页',route:{name:'index'}},
              {id:"12",title: '工作台',route:{name:'dashboardWorkplace'}},
            ]},
          {id:"2",icon:'el-icon-edit-outline',title: '表单页', children: [
              {id:"21",title: '基础表单',route:{name:'formBase'}},
              {id:"22",title: '分步表单',route:{name:'formStep'}},
              {id:"23",title: '高级表单',route:{name:'formAdvanced'}},
            ]
          },
          {id:"3",icon:'ion-ios-list',title: '列表页', children: [
              {id:"31",title: '搜索列表',children:[
                  {id:"311",title: '搜索列表（文章）',route:{name:'listArticle'}},
                  {id:"312",title: '搜索列表（项目）',route:{name:'listProject'}},
                  {id:"313",title: '搜索列表（应用）',route:{name:'listApp'}},
                ]},
              {id:"32",title: '查询表格',route:{name:'listQuery'}},
              {id:"33",title: '标准列表',route:{name:'listNormal'}},
              {id:"34",title: '卡片列表',route:{name:'listCard'}},
            ]
          },
          {id:"4",title: '详情页', children: [
              {id:"41",title: '基础详情页',route:{name:'detailBase'}},
              {id:"42",title: '高级详情页',route:{name:'detailAdvanced'}},
            ]
          },
          {id:"5",icon:'el-icon-circle-check',title: '结果页', children: [
              {id:"51",title: '成功页',route:{name:'resultSuccess'}},
              {id:"52",title: '失败页',route:{name:'resultFail'}},
            ]
          },
          {id:"6",icon:'el-icon-warning-outline',title: '异常页', children: [
              {id:"61",title: '401页',route:{name:'error401'}},
              {id:"62",title: '404页',route:{name:'error404'}},
              {id:"63",title: '500页',route:{name:'error500'}},
              {id:"64",title: '通用错误',route:{name:'errorDefault'}},
            ]
          },
          {id:"7",icon:'el-icon-user',title: '个人页', children: [
              {id:"71",title: '个人中心',route:{name:'userCenter'}},
              {id:"72",title: '个人设置',route:{name:'userSetting'}},
            ]
          },
        ],
      }
    },
    computed:{
      screen(){
        return this.$store.state.screen
      },
      isSmallScreen(){
        return this.screen === 'xs' || this.screen === 'sm'
      }
    },
    mounted(){
      const self = this;

      self.initScreen(self.screen);

      // 自动固定顶部导航
      if(self.fixedHeader === 'auto'){
        new Headroom(document.querySelector('.dk-header'),{
          offset :64,
        }).init();
      }
    },
    methods: {
      /**
       * 菜单选中
       * @param index
       * @param path
       */
      menuSelect(index, path){
        const self = this,
          findMenuItem = function(menuList,pathIndex = 0){
            let res;
            self.$util.forEach(menuList,function (item) {
                if(path[pathIndex] === item.id){
                  if(item.children && item.children.length>0){
                    res = findMenuItem(item.children,pathIndex+1);
                  }else{
                    res = item;
                  }
                  return false;
                }
            });
            return res;
          };
        const selectItem = findMenuItem(self.menuList);

        if(self.isSmallScreen) self.asideComponentStatus = false;

        if(selectItem.route){
          self.$router.push(selectItem.route);
        }else{
          self.$message.info(`你点击了侧导航“${selectItem.title}”。`)
        }
      },

      initScreen(screen){
        if(screen === 'md' || screen === 'sm' || screen === 'xs'){
          this.asideComponentStatus = false;
          this.asideIsOpened = false;
        }else{
          this.asideComponentStatus = true;
          this.asideIsOpened = true;
        }
      }
    },

    watch:{
      screen(val){
        this.initScreen(val)
      },
      asideComponentStatus(val){
        if(this.isSmallScreen){
          this.screenXsAsideIsOpened = val;
          this.asideIsOpened = true;
        }else{
          this.screenXsAsideIsOpened = false;
          this.asideIsOpened = val;
        }
      },
      screenXsAsideIsOpened(val){
        document.getElementById('app').style.overflow = val?'hidden':'';
      },
    }
  }
</script>

<style scoped>

</style>