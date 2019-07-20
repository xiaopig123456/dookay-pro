<template>
    <div :class="['dk-result','dk-result-'+state]">
        <div class="dk-result-icon"><i :class="'el-icon-'+state"></i></div>

        <h3 class="dk-result-title" v-if="title" v-html="title"></h3>
        <h3 class="dk-result-title" v-else>{{state.toLocaleUpperCase()}}</h3>
        <div class="dk-result-description" v-if="content" v-html="content"></div>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "DkResult",
    props:{
      state:{
        type:String,
        default:'info', // 允许的值 info|question|warning|success|danger
      },
      title:String,
      content:String,
    }
  }
</script>