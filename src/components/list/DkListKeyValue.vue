<template>
    <el-row :gutter="0" :class="['dk-list-key-value',isButton?'dk-list-key-value-is-button':'']">
        <slot name="prepend"></slot>
        <el-col :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl" :span="span?span:(!xs && !sm && !md && !lg && !xl?24/list.length:span)" :class="['dk-list-item','dk-text-'+position]" v-for="(item,index) in list" :key="index">
            <div class="dk-list-key" v-html="item.key"></div>
            <div class="dk-list-value" v-html="item.value"></div>
        </el-col>
        <slot></slot>
    </el-row>
</template>

<script>
  export default {
    name: "DkListKeyValue",
    props:{
      list:{
        type:Array,
        default(){
          return []
        }
      },
      position: {
        type: String,
        default: 'center', // 可选的值 left|center|right
      },
      isButton:{
        type:Boolean,
        default:false
      },
      xs:Number,
      sm:Number,
      md:Number,
      lg:Number,
      xl:Number,
      span:Number,
    }
  }
</script>

<style scoped>

</style>