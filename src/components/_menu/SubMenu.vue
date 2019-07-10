<template functional>
    <el-submenu v-if="props.menu" :index="props.menu.id">
        <template slot="title"><i v-if="props.level === 0" :class="props.menu.icon?props.menu.icon:'el-icon-document'"></i>{{props.menu.title}}</template>
        <template v-for="(item,i) in props.menu.children">
            <sub-menu v-if="item.children && item.children.length>0" :menu="item" :level="props.level+1" :key="i"></sub-menu>
            <el-menu-item v-else :index="item.id" :key="i">{{item.title}}</el-menu-item>
        </template>
    </el-submenu>
</template>

<script>
  export default {
    name: "SubMenu",
    props: {
      menu:Object,
      level:{
        type:Number,
        default:0
      }
    },
  }
</script>