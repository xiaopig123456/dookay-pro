<template>
    <ul :class="['dk-list-key-value',isButton?'dk-list-key-value-is-button':'']">
        <slot name="prepend"></slot>
        <li :class="['dk-list-item','dk-text-'+position]" v-for="(item,index) in list" :key="index">
            <div class="dk-list-key" v-html="item.key"></div>
            <div class="dk-list-value" v-html="item.value"></div>
        </li>
        <slot></slot>
    </ul>
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
      }
    }
  }
</script>

<style scoped>

</style>