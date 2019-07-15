<template>
    <!--https://www.cnblogs.com/wangmaoling/p/9719443.html
    "color-js": "^1.0.5",
    -->
    <el-container :class="['dk-wrapper','dk-layout-'+ layout,'dk-header-'+ fixedHeader,asideIsOpened?'dk-aside-opened':'',fixedAside?'dk-aside-fixed':'']">
        <!-- 侧导航 -->
        <el-aside class="dk-aside-wrapper">
            <div class="dk-aside">
                <div class="dk-aside-brand">
                    <a href="javascript:void(0);">
                        <img src="../assets/img/logo-small.png">
                    </a>
                    <h1>{{title}}</h1>
                </div>
                <div class="dk-aside-menu-wrapper dk-scrollbar-prettify">
                    <el-menu
                            :mode="layout === 'top'?'horizontal':'vertical'"
                            :collapse="!asideIsOpened"
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
                <top-menu v-if="layout === 'top'" v-on:aside-collapse="asideCollapse"></top-menu>
            </div>
        </el-aside>
        <!-- 主内容 -->
        <el-container class="dk-container">
            <top-menu v-if="layout === 'aside'" v-on:aside-collapse="asideCollapse"></top-menu>
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

  export default {
    name: "Default",
    components: {SubMenu,TopMenu},
    data() {
      return {
        title:process.env.VUE_APP_TITLE,
        layout:process.env.VUE_APP_LAYOUT,
        fixedHeader:process.env.VUE_APP_FIXED_HEADER,
        fixedAside:process.env.VUE_APP_FIX_ASIDE_NAV !== 'false',

        // 侧边栏
        asideIsOpened:true,

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
    mounted(){
      if(this.fixedHeader === 'auto'){
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
        self.$message.info(`你点击了侧导航“${selectItem.title}”。`)
      },

      /**
       * 侧边栏展开收起状态
       * @param isOpened
       */
      asideCollapse(isOpened){
        this.asideIsOpened = isOpened;
      }
    }
  }
</script>

<style scoped>

</style>