<template>
    <ul class="dk-list">
        <li class="dk-list-item" v-for="(item,index) in list" :key="index" @click="e=>{itemClick(e,item,index)}">
            <div v-if="item.image !== 'undefined'" :class="['dk-list-media','dk-list-media-'+mediaShape]">
                <slot name="media" :item="item">
                    <el-image :src="item.image" lazy></el-image>
                </slot>
            </div>
            <div class="dk-list-body">
                <div class="dk-list-heading" v-if="item.title !== 'undefined'">
                    <slot name="header" :item="item">
                        <h4 v-html="item.title"></h4>
                    </slot>
                </div>
                <slot name="body" :item="item">
                    <div v-if="item.description !== 'undefined'" class="dk-list-description" v-html="item.description"></div>
                </slot>
            </div>
            <slot :item="item"></slot>
        </li>
    </ul>
</template>

<script>
  export default {
    name: "DkList",
    props:{
      list:{
        type:Array,
        default(){
          return [];
        }
      },
      mediaShape:{
        type:String,
        default:'square', // 可选的值 circle|square
      }
    },
    methods:{
      itemClick(e,item,index){
        this.$emit('itemClick',e,item,index)
      }
    }
  }
</script>

<style scoped>

</style>