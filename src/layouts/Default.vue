<template>
    <el-container :class="['dk-wrapper','dk-screen-'+screen,(isSmallScreen?'dk-layout-aside':'dk-layout-'+ layout),'dk-header-'+ fixedHeader,asideIsOpened?'dk-aside-opened':'',fixedAside?'dk-aside-fixed':'']">
        <!-- 侧导航 -->
        <el-aside class="dk-aside-wrapper">
            <div :class="['dk-aside',isSmallScreen?(screenXsAsideIsOpened?'':'dk-aside-mobile-closed'):'']">
                <div class="dk-aside-brand">
                    <a href="javascript:void(0);">
                        <img src="/img/logo.png">
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
                            :default-active="activeMenu"
                    >
                        <template v-for="(item,i) in menuList">
                            <dk-sub-menu popper-class="dk-slide-popper" v-if="item.children && item.children.length>0" :menu="item" :key="i"></dk-sub-menu>
                            <el-menu-item v-else :index="item.key" :key="i"><i :class="item.icon?item.icon:'el-icon-document'"></i><span slot="title">{{item.title}}</span></el-menu-item>
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
        activeMenu:this.$route.name,
        menuList: [
          {key:"dashboard",icon:'el-icon-odometer',title: '仪表盘', children:[
              {key:"index",title: '首页',route:{name:'index'}},
              {key:"dashboardWorkplace",title: '工作台',route:{name:'dashboardWorkplace'}},
            ]},
          {key:"form",icon:'el-icon-edit-outline',title: '表单页', children: [
              {key:"formBase",title: '基础表单',route:{name:'formBase'}},
              {key:"formStep",title: '分步表单',route:{name:'formStep'}},
              {key:"formAdvanced",title: '高级表单',route:{name:'formAdvanced'}},
            ]
          },
          {key:"list",icon:'ion-ios-list',title: '列表页', children: [
              {key:"listSearch",title: '搜索列表',children:[
                  {key:"listArticle",title: '搜索列表（文章）',route:{name:'listArticle'}},
                  {key:"listProject",title: '搜索列表（项目）',route:{name:'listProject'}},
                  {key:"listApp",title: '搜索列表（应用）',route:{name:'listApp'}},
                ]},
              {key:"listQuery",title: '查询表格',route:{name:'listQuery'}},
              {key:"listNormal",title: '标准列表',route:{name:'listNormal'}},
              {key:"listCard",title: '卡片列表',route:{name:'listCard'}},
            ]
          },
          {key:"detail",title: '详情页', children: [
              {key:"detailBase",title: '基础详情页',route:{name:'detailBase'}},
              {key:"detailAdvanced",title: '高级详情页',route:{name:'detailAdvanced'}},
            ]
          },
          {key:"result",icon:'el-icon-circle-check',title: '结果页', children: [
              {key:"resultSuccess",title: '成功页',route:{name:'resultSuccess'}},
              {key:"resultFail",title: '失败页',route:{name:'resultFail'}},
            ]
          },
          {key:"error",icon:'el-icon-warning-outline',title: '异常页', children: [
              {key:"error401",title: '401页',route:{name:'error401'}},
              {key:"error404",title: '404页',route:{name:'error404'}},
              {key:"error500",title: '500页',route:{name:'error500'}},
              {key:"errorDefault",title: '通用错误',route:{name:'errorDefault'}},
            ]
          },
          {key:"user",icon:'el-icon-user',title: '个人页', children: [
              {key:"userCenter",title: '个人中心',route:{name:'userCenter'}},
              {key:"userSetting",title: '个人设置',route:{name:'userSetting'}},
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
      },
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
                if(path[pathIndex] === item.key){
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
      $route(val){
        this.activeMenu = val.name
      }
    }
  }
</script>

<style scoped>

</style>