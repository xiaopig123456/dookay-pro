<template>
    <ul class="dk-list">
        <li class="dk-media dk-list-item" v-for="(item,index) in (isSingleData?[list]:list)" :key="index">
            <div v-if="typeof item.image !== 'undefined'"
                 :class="['dk-media-aside','dk-media-'+mediaShape,'dk-media-'+mediaPosition]">
                <slot name="media" :row="item">
                    <el-image :src="item.image" lazy></el-image>
                </slot>
            </div>
            <div class="dk-media-body">
                <div class="dk-media-heading" v-if="typeof item.title !== 'undefined'">
                    <slot name="header" :row="item">
                        <h4 v-html="item.title"></h4>
                    </slot>
                </div>
                <slot name="body" :row="item">
                    <div v-if="typeof item.description !== 'undefined'" class="dk-media-description"
                         v-html="item.description"></div>
                </slot>
            </div>
            <slot :row="item"></slot>
        </li>
    </ul>
</template>

<script>
  export default {
    name: "DkList",
    props: {
      list: {
        type: [Array,Object],
        default() {
          return [];
        }
      },
      // 是否单条数据
      isSingleData:{
        type:Boolean,
        default:false
      },
      // 图片形状
      mediaShape: {
        type: String,
        default: 'square', // 可选的值 circle|square
      },
      // 图片位置
      mediaPosition: {
        type: String,
        default: 'left', // 可选的值 left|right
      },
    }
  }
</script>