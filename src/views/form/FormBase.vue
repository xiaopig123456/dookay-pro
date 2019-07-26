<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="基础表单" description="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">
            <el-row type="flex" class="dk-form dk-form-base" justify="center">
                <el-col :sm="24" :md="19" :lg="15" :xl="13">
                    <el-form action="javascript:void(0);" @submit.native="submitForm" :model="form" :rules="rules" ref="form" label-width="auto">
                        <!-- 表单控件 开始 -->
                        <el-form-item label="标题：" prop="title" key="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                        <el-form-item label="封面图：" prop="thumb" key="thumb">
                            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :limit="1">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="目标描述：" prop="description" key="description">
                            <el-input type="textarea" :rows="3" v-model="form.description"></el-input>
                        </el-form-item>
                        <el-form-item label="起止日期：" prop="dateRange" key="dateRange">
                            <el-date-picker
                                    v-model="form.dateRange"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="类型选择：" prop="type" key="type">
                            <el-select v-model="form.type" :clearable="true" placeholder="请选择">
                                <el-option label="动物" value="动物"></el-option>
                                <el-option label="植物" value="植物"></el-option>
                                <el-option label="昆虫" value="昆虫"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="完成进度：" prop="progress" key="progress">
                            <el-slider v-model="form.progress"></el-slider>
                        </el-form-item>
                        <el-form-item label="使用人数：" prop="number" key="number">
                            <el-input-number v-model="form.number" controls-position="right" :min="1" :max="10"></el-input-number>
                        </el-form-item>
                        <el-form-item label="是否推荐：" prop="isPush" key="isPush">
                            <el-switch v-model="form.isPush"></el-switch>
                        </el-form-item>
                        <el-form-item label="状态：" prop="status" key="status">
                            <el-radio-group v-model="form.status">
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="2">草稿</el-radio>
                                <el-radio :label="3">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="特殊资源：" prop="resource" key="resource">
                            <el-checkbox-group v-model="form.resource">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="发布日期：" prop="createdAt" key="createdAt">
                            <el-date-picker v-model="form.createdAt" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item key="submit">
                            <el-button native-type="submit" type="primary" :loading="formLoading">提交</el-button>
                            <el-button>返回</el-button>
                        </el-form-item>
                        <!-- 表单控件 结束 -->
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "FormBase",
    data(){
      return {
        breadcrumb:[{title:'首页',name:'index'},{title:'表单页'},{title:'基础表单'}],
        formLoading:false,
        form: {
          title: '',
          thumb:'',
          dateRange:'',
          description:'',
          type:'',
          progress:0,
          number:0,
          isPush:false,
          status:1,
          resource:[],
          createdAt:'',
        },
        rules: {
          title: [
            { required: true, message: '请输入标题。'},
          ],
        }
      }
    },
    methods:{
      submitForm(){
        const self = this;
        self.$refs.form.validate((valid) => {
          if (!valid) return false;

          self.formLoading = true;
          console.log(self.form);
          setTimeout(function () {
            self.formLoading = false;
          },3000);
        })
      }
    },
  }
</script>

<style scoped>

</style>