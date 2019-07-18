<template>
    <el-form ref="form" action="javascript:void(0);" @keyup.enter.native="submitForm" :model="form" :rules="rules" label-position="top">
        <el-tabs class="dk-passport-form-tab" v-model="activeTab">
            <el-tab-pane label="注册账户" name="register">
                <el-form-item class="dk-passport-form-cellphone" prop="cellphone">
                    <el-input v-model="form.cellphone" placeholder="手机号">
                        <el-select v-model="form.cellphoneCode" slot="prepend" placeholder="请选择">
                            <el-option label="+86" value="0086"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="密码，至少6位">
                        <i class="el-icon-lock" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password_repeat">
                    <el-input type="password" v-model="form.password_repeat" placeholder="确认密码">
                        <i class="el-icon-lock" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <el-input v-model="form.verificationCode" placeholder="验证码">
                        <i class="el-icon-message" slot="prefix"></i>
                        <el-button slot="append">获取验证码</el-button>
                    </el-input>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
        <el-form-item>
            <router-link :to="{name:'login'}" class="dk-pull-right">使用已有账户登录</router-link>
            <el-button class="dk-passport-single-btn" type="primary" @click="submitForm" :loading="formLoading">注 册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: "Register",
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
        activeTab:'register',

        formLoading:false,

        form: {
          cellphoneCode:'0086',
          cellphone:'',
          password:'',
          password_repeat:'',
          verificationCode:'',
        },
        rules: {
          cellphone: [
            { required: true, message: '请输入手机号。'},
          ],
          password: [
            { required: true, message: '请输入密码。'},
            { min: 6, message: '密码长度不能少于6位数。'}
          ],
          password_repeat: [
            { required: true, message: '请再次输入密码。'},
            { validator: validatePasswordRepeat},
          ],
          verificationCode: [
            { required: true, message: '请输入验证码。'},
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