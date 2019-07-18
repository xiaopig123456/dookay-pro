<template>
    <ul :class="['dk-list-key-value',isButton?'dk-list-key-value-is-button':'']">
        <slot name="prepend"></slot>
        <li class="dk-list-item" v-for="(item,index) in list" :key="index" @click="e=>{itemClick(e,item,index)}">
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
      isButton:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      itemClick(e,item,index){
        if(!this.isButton) return;
        this.$emit('itemClick',e,item,index)
      }
    }
  }
</script>

<style scoped>

</style>