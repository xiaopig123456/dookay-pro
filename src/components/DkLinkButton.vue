<template>
    <router-link :class="['el-button','el-button--'+type,round?'is-round':'',plain?'is-plain':'',circle?'is-circle':'',disabled?'is-disabled':'',size?'el-button--'+size:'']" :to="to" :target="target">
        <i v-if="icon" :class="icon"></i>
        <slot></slot>
    </router-link>
</template>

<script>
  export default {
    name: "DkLinkButton",
    props:{
      to:[String,Object],
      target:String,
      type:{
        type:String,
        default:'default'
      },
      size:String,
      plain:{
        type:Boolean,
        default:false
      },
      round:{
        type:Boolean,
        default:false
      },
      circle:{
        type:Boolean,
        default:false
      },
      disabled:{
        type:Boolean,
        default:false
      },
      icon:String,
    }
  }
</script>

<style scoped>

</style>