<template>
    <el-form ref="form" action="javascript:void(0);" @keyup.enter.native="submitForm" :model="form" :rules="rules" label-position="top">
        <el-tabs class="dk-passport-form-tab-step" v-model="activeTab">
            <el-tab-pane label="第一步：验证手机" name="step1"></el-tab-pane>
            <el-tab-pane label="第二步：重置密码" name="step2"></el-tab-pane>
        </el-tabs>
        <template v-if="activeTab === 'step1'">
            <el-form-item class="dk-passport-form-cellphone" prop="cellphone" key="1-1">
                <el-input v-model="form.cellphone" placeholder="手机号">
                    <el-select v-model="form.cellphoneCode" slot="prepend" placeholder="请选择">
                        <el-option label="+86" value="0086"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item prop="verificationCode" key="1-2">
                <el-input v-model="form.verificationCode" placeholder="验证码">
                    <i class="el-icon-message" slot="prefix"></i>
                    <el-button slot="append">获取验证码</el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="dk-btn-block" type="primary" @click="changeStep(2,true)">下一步</el-button>
            </el-form-item>
        </template>
        <template v-else>
            <el-form-item prop="password" key="2-1">
                <el-input type="password" v-model="form.password" placeholder="新密码">
                    <i class="el-icon-lock" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password_repeat" key="2-2">
                <el-input type="password" v-model="form.password_repeat" placeholder="确认密码">
                    <i class="el-icon-lock" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item class="dk-form-item-double-btn">
                <el-button @click="changeStep(1)">上一步</el-button>
                <el-button type="primary" @click="submitForm" :loading="formLoading">确 认</el-button>
            </el-form-item>
        </template>
        <el-form-item class="dk-form-item-text">
            <router-link :to="{name:'login'}">返回登录页</router-link>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: "FindPassword",
    data() {
      const validatePasswordRepeat = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码。'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致。'));
        } else {
          callback();
        }
      };

      return {
        activeTab:'step1',

        formLoading:false,

        form: {
          cellphoneCode:'0086',
          cellphone:'',
          verificationCode:'',
          password:'',
          password_repeat:'',
        },
        rules: {
          cellphone: [
            { required: true, message: '请输入手机号。'},
          ],
          verificationCode: [
            { required: true, message: '请输入验证码。'},
          ],
          password: [
            { required: true, message: '请输入密码。'},
            { min: 6, message: '密码长度不能少于6位数。'}
          ],
          password_repeat: [
            { required: true, message: '请再次输入密码。'},
            { validator: validatePasswordRepeat},
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
      },
      changeStep(step,isNext){
        const self = this;
        if(isNext){
          self.$refs.form.validate((valid) => {
            if (!valid) return false;
            self.activeTab = 'step'+step;
          });
        }else{
          self.activeTab = 'step'+step;
        }
      }
    },
  }
</script>

<style scoped>

</style>