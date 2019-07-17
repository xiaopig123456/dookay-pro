<template>
    <el-container :class="['dk-wrapper','dk-screen-'+screen,(isSmallScreen?'dk-layout-aside':'dk-layout-'+ layout),'dk-header-'+ fixedHeader,asideIsOpened?'dk-aside-opened':'',fixedAside?'dk-aside-fixed':'']">
        <!-- 侧导航 -->
        <el-aside class="dk-aside-wrapper">
            <div class="dk-aside" :style="{left:isSmallScreen?(screenXsAsideIsOpened?'0':'-256px'):0}">
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
                            <sub-menu popper-class="dk-slide-popper" v-if="item.children && item.children.length>0" :menu="item" :key="i"></sub-menu>
                            <el-menu-item v-else :index="item.id" :key="i"><i :class="item.icon?item.icon:'el-icon-document'"></i><span slot="title">{{item.title}}</span></el-menu-item>
                        </template>
                    </el-menu>
                </div>
                <top-menu v-if="layout === 'top' && !isSmallScreen" :screen="screen" v-model="asideComponentStatus"></top-menu>
            </div>

            <transition name="el-fade-in">
                <div v-if="isSmallScreen && screenXsAsideIsOpened" class="dk-aside-mask" @click="asideComponentStatus = false"></div>
            </transition>
        </el-aside>
        <!-- 主内容 -->
        <el-container class="dk-container">
            <top-menu v-if="layout === 'aside' || (layout === 'top' && isSmallScreen)" :screen="screen" v-model="asideComponentStatus"></top-menu>
            <!-- 内容部分 -->
            <el-main class="dk-main">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import SubMenu from '../components/_menu/SubMenu'
    import TopMenu from '../components/_menu/TopMenu'
    import Headroom from 'headroom.js'
    import enquire from 'enquire.js';

  export default {
    name: "Default",
    components: {SubMenu,TopMenu},
    data() {
      return {
        title:process.env.VUE_APP_TITLE,
        layout:process.env.VUE_APP_LAYOUT,
        fixedHeader:process.env.VUE_APP_FIXED_HEADER,
        fixedAside:process.env.VUE_APP_FIX_ASIDE_NAV !== 'false',
        screen:'',

        // 侧边栏
        asideComponentStatus:true,
        asideIsOpened:true,
        screenXsAsideIsOpened:false,

        // 菜单列表
        menuList: [
          {id:"1",icon:'el-icon-odometer',title: '仪表盘', children:[
              {id:"11",title: '工作台'},
            ]},
          {id:"2",icon:'el-icon-edit-outline',title: '表单页', children: [
              {id:"21",title: '基础表单'},
              {id:"22",title: '分步表单'},
              {id:"23",title: '高级表单'},
            ]
          },
          {id:"3",icon:'ion-ios-list',title: '列表页', children: [
              {id:"31",title: '搜索列表',children:[
                  {id:"311",title: '搜索列表（文章）'},
                  {id:"312",title: '搜索列表（项目）'},
                  {id:"313",title: '搜索列表（应用）'},
                ]},
              {id:"32",title: '查询表格'},
              {id:"33",title: '标准列表'},
              {id:"34",title: '卡片列表'},
            ]
          },
          {id:"4",title: '详情页', children: [
              {id:"41",title: '基础详情页'},
              {id:"42",title: '高级详情页'},
            ]
          },
          {id:"5",icon:'el-icon-circle-check',title: '结果页', children: [
              {id:"51",title: '成功页'},
              {id:"52",title: '失败页'},
            ]
          },
          {id:"6",icon:'el-icon-warning-outline',title: '异常页', children: [
              {id:"61",title: '401页'},
              {id:"62",title: '404页'},
              {id:"63",title: '500页'},
              {id:"64",title: '通用错误'},
            ]
          },
          {id:"7",icon:'el-icon-user',title: '个人页', children: [
              {id:"71",title: '个人中心'},
              {id:"72",title: '个人设置'},
            ]
          },
        ],
      }
    },
    computed:{
      isSmallScreen(){
        return this.screen === 'xs' || this.screen === 'sm'
      }
    },
    mounted(){
      const self = this;
      // 自动固定顶部导航
      if(self.fixedHeader === 'auto'){
        new Headroom(document.querySelector('.dk-header'),{
          offset :64,
        }).init();
      }

      // 屏幕宽度响应
      self.$util.forEach({
        xs: '(max-width: 575.98px)',
        sm: '(min-width: 576px) and (max-width: 767.98px)',
        md: '(min-width: 768px) and (max-width: 991.98px)',
        lg: '(min-width: 992px) and (max-width: 1199.98px)',
        xl: '(min-width: 1200px) and (max-width: 1599.98px)',
        xxl: '(min-width: 1600px)'
      },function (n,k) {
        enquire.register("screen and "+n,{
          match:function () {
            self.screen = k;
          }
        })
      })
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

        if(self.isSmallScreen)self.asideComponentStatus = false;

        self.$message.info(`你点击了侧导航“${selectItem.title}”。`)
      },
    },

    watch:{
      screen(val){
        if(val === 'md' || val === 'sm' || val === 'xs'){
          this.asideComponentStatus = false;
          this.asideIsOpened = false;
        }else{
          this.asideComponentStatus = true;
          this.asideIsOpened = true;
        }
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
        document.body.style.overflow = val?'hidden':'';
      },
    }
  }
</script>

<style scoped>

</style>