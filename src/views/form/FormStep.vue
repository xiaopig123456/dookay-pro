<template>
    <div>
        <dk-page-header :breadcrumb="breadcrumb" title="分步表单" description="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"></dk-page-header>
        <el-card class="dk-box-card-main" shadow="never">
            <el-steps class="dk-step-main" :active="formStep" align-center>
                <el-step title="填写转账信息" :icon="formStep>0?'el-icon-circle-check':''"></el-step>
                <el-step title="确认转账信息" :icon="formStep>1?'el-icon-circle-check':''"></el-step>
                <el-step title="完成" :icon="formStep>2?'el-icon-circle-check':''"></el-step>
            </el-steps>
            <el-row type="flex" class="dk-form dk-form-base" justify="center">
                <el-col :sm="24" :md="19" :lg="15" :xl="13">
                    <el-form action="javascript:void(0);" @submit.native="submitForm" :model="form" :rules="rules" ref="form" label-width="auto">
                        <!-- 表单控件 开始 -->
                        <template v-if="formStep === 0">
                            <el-form-item label="标题：" prop="title" key="title">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                            <el-form-item key="1-2">
                                <el-button type="primary" @click="changeStep">下一步</el-button>
                            </el-form-item>
                        </template>
                        <template v-if="formStep === 1">
                            <el-form-item label="金额：" prop="amount" key="amount">
                                <el-input v-model.number="form.amount"></el-input>
                            </el-form-item>
                            <el-form-item key="2-2">
                                <el-button @click="changeStep(false)">上一步</el-button>
                                <el-button type="primary" @click="changeStep">下一步</el-button>
                            </el-form-item>
                        </template>
                        <template v-if="formStep === 2">
                            <el-form-item label="确认：" prop="confirm" key="confirm">
                                <el-checkbox v-model="form.confirm"></el-checkbox>
                            </el-form-item>
                            <el-form-item key="3-2">
                                <el-button @click="changeStep(false)">上一步</el-button>
                                <el-button native-type="submit" type="primary" :loading="formLoading">提交</el-button>
                            </el-form-item>
                        </template>
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
        breadcrumb:[{title:'首页',name:'index'},{title:'表单页'},{title:'分步表单'}],
        formStep:0,
        formLoading:false,
        form: {
          title: '',
          amount: null,
          confirm: false,
        },
        rules: {
          title: [
            { required: true, message: '请输入标题。'},
          ],
          amount: [
            { required: true, message: '请输入金额。'},
            { type: 'number', message: '格式错误。'},
          ],
          confirm: [
            { validator:function (rule, value, callback) {
                if(value !== true){
                  callback(new Error('请确认。'));
                }else{
                  callback();
                }
              }},
          ],
        }
      }
    },
    methods:{
      submitForm(){
        const self = this;
        self.$refs.form.validate((valid) => {
          console.log(1)
          if (!valid) return false;

          self.formLoading = true;
          console.log(self.form);
          setTimeout(function () {
            self.formLoading = false;
          },3000);
        })
      },
      changeStep(isNext = true){
        const self = this;
        if(isNext){
          self.$refs.form.validate((valid) => {
            if (!valid) return false;
            self.formStep += 1;
          })
        }else{
          self.formStep -= 1;
        }
      }
    },
  }
</script>

<style scoped>

</style>