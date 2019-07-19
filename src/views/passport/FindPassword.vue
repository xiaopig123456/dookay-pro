<template>
    <el-form ref="form" action="javascript:void(0);" @submit.native="submitForm" :model="form" :rules="rules" label-position="top">
        <el-steps class="dk-step-main" :active="formStep" align-center>
            <el-step title="验证手机" :icon="formStep>0?'el-icon-circle-check':''"></el-step>
            <el-step title="重置密码" :icon="formStep>1?'el-icon-circle-check':''"></el-step>
            <el-step title="完成" :icon="formStep>2?'el-icon-circle-check':''"></el-step>
        </el-steps>
        <template v-if="formStep === 0">
            <el-form-item class="dk-passport-form-cellphone" prop="cellphone" key="cellphone">
                <el-input v-model="form.cellphone" placeholder="手机号">
                    <el-select v-model="form.cellphoneCode" slot="prepend" placeholder="请选择">
                        <el-option label="+86" value="0086"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item prop="verificationCode" key="verificationCode">
                <el-input v-model="form.verificationCode" placeholder="验证码">
                    <i class="el-icon-message" slot="prefix"></i>
                    <el-button slot="append">获取验证码</el-button>
                </el-input>
            </el-form-item>
            <el-form-item key="step1NextBtn">
                <el-button class="dk-btn-block" type="primary" @click="changeStep()">下一步</el-button>
            </el-form-item>
            <el-form-item class="dk-form-item-text" key="step1Back">
                <router-link :to="{name:'login'}">返回登录页</router-link>
            </el-form-item>
        </template>
        <template v-else-if="formStep === 1">
            <el-form-item prop="password" key="password">
                <el-input type="password" v-model="form.password" placeholder="新密码">
                    <i class="el-icon-lock" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password_repeat" key="password_repeat">
                <el-input type="password" v-model="form.password_repeat" placeholder="确认密码">
                    <i class="el-icon-lock" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item class="dk-form-item-double-btn" key="step2NextBtn">
                <el-button @click="changeStep(false)">上一步</el-button>
                <el-button type="primary" native-type="submit" :loading="formLoading">确 认</el-button>
            </el-form-item>
            <el-form-item class="dk-form-item-text" key="step2Back">
                <router-link :to="{name:'login'}">返回登录页</router-link>
            </el-form-item>
        </template>
        <dk-result v-else class="dk-passport-result" state="success" title="操作成功" content="恭喜您，找回密码成功，快去登录页登录吧。">
            <dk-link-button :to="{name:'login'}" type="primary">去登录</dk-link-button>
        </dk-result>
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
        formStep:0,
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
            self.formStep += 1;
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