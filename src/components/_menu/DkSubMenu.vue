<template functional>
    <el-submenu :popper-class="props.popperClass" v-if="props.menu" :index="props.menu.key">
        <template slot="title"><i :class="props.menu.icon?props.menu.icon:(props.level === 0?'el-icon-document':'ion-empty')"></i><span slot="title">{{props.menu.title}}</span></template>
        <template v-for="(item,i) in props.menu.children">
            <dk-sub-menu v-if="item.children && item.children.length>0" :menu="item" :level="props.level+1" :key="i"></dk-sub-menu>
            <el-menu-item v-else :index="item.key" :key="i"><i class="ion-empty"></i><span slot="title">{{item.title}}</span></el-menu-item>
        </template>
    </el-submenu>
</template>

<script>
  export default {
    name: "DkSubMenu",
    props: {
      menu:Object,
      level:{
        type:Number,
        default:0
      },
      popperClass:{
        type:String,
        default:''
      }
    },
  }
</script>