<template>
    <el-form ref="form" action="javascript:void(0);" @submit.native="submitForm" :model="form" :rules="rules" label-position="top">
        <el-tabs class="dk-passport-form-tab" v-model="activeTab">
            <el-tab-pane label="账号密码登录" name="password"></el-tab-pane>
            <el-tab-pane label="手机号登录" name="cellphone"></el-tab-pane>
        </el-tabs>
        <template v-if="activeTab === 'password'">
            <el-form-item prop="username" key="username">
                <el-input v-model="form.username" placeholder="用户名">
                    <i class="el-icon-user" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" key="password">
                <el-input type="password" v-model="form.password" placeholder="密码">
                    <i class="el-icon-lock" slot="prefix"></i>
                </el-input>
            </el-form-item>
        </template>
        <template v-else>
            <el-form-item prop="cellphone" key="cellphone">
                <el-input v-model="form.cellphone" placeholder="手机号">
                    <i class="el-icon-mobile-phone" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="verificationCode" key="verificationCode">
                <el-input v-model="form.verificationCode" placeholder="验证码">
                    <i class="el-icon-message" slot="prefix"></i>
                    <el-button slot="append">获取验证码</el-button>
                </el-input>
            </el-form-item>
        </template>

        <el-form-item class="dk-form-item-text" prop="rememberMe" key="rememberMe">
            <router-link :to="{name:'findPassword'}" class="dk-pull-right">忘记密码</router-link>
            <el-checkbox-group v-model="form.rememberMe">
                <el-checkbox label="自动登录" name="rememberMe"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item key="submit">
            <el-button class="dk-btn-block" type="primary" native-type="submit" :loading="formLoading">登 录</el-button>
        </el-form-item>
        <el-form-item class="dk-form-item-text dk-passport-other-login" key="other">
            <router-link :to="{name:'register'}" class="dk-pull-right">注册账户</router-link>
            <span class="dk-form-item-text-title">其他登录方式</span>
            <el-button icon="ion-logo-github"></el-button>
            <el-button icon="ion-logo-google"></el-button>
            <el-button icon="ion-logo-pinterest"></el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        activeTab:'password',

        formLoading:false,

        form: {
          username:'',
          password:'',
          rememberMe:true,
          cellphone:'',
          verificationCode:'',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名。'},
          ],
          password: [
            { required: true, message: '请输入密码。'},
          ],

          cellphone: [
            { required: true, message: '请输入手机号。'},
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