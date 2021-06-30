<template>
  <div class="login-body flex-h">
    <el-row>
      <el-col :span="8">
        <div class="login-container clear">
          <h1 class="mb-20 title">
            <span class="grey">{{ $t('systemName') }}</span>
          </h1>
          <el-form :model="form" ref="form" :rules="rules" label-width="0px">
            <el-form-item prop="userName">
              <div @keyup.enter="commit">
                <el-input
                  class="form-input"
                  v-model="form.userName"
                  :placeholder="$t('userName')"
                  @blur="form.userName && (form.userName = form.userName.trim())"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div @keyup.enter="commit">
                <el-input
                  class="form-input"
                  v-model="form.password"
                  :placeholder="$t('passWord')"
                  show-password
                ></el-input>
              </div>
            </el-form-item>
          </el-form>
          <div class="mb-20 w100 pull-left clear">
            <el-checkbox class="pull-left" v-model="rememberPw">
              {{ $t('rememberPw') }}
            </el-checkbox>
            <el-link class="pull-right" type="primary" @click="forgetPw">
              {{ $t('forgetPw') }}
            </el-link>
          </div>
          <el-button class="pd-btn login-btn" type="primary" @click="commit">
            {{ $t('login') }}
          </el-button>
        </div>
      </el-col>
      <el-col :span="16">
        <img style="width:100%;height:100%;" src="@/assets/img/home_banner.png" alt="skate" />
      </el-col>
    </el-row>
    <div v-if="safetyDialog">
      <SafetyProblem
        :isFind="true"
        :dialogVisible="safetyDialog"
        @setToken="setToken"
        @close="closeDialog"
      ></SafetyProblem>
    </div>
    <div v-if="passwordDialog">
      <EditPassWord
        :token="token"
        :dialogVisible="passwordDialog"
        @close="closeDialog"
      ></EditPassWord>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import axios, { AxiosResponse } from 'axios';
  import Static from '@/constants/common';
  import vRules from '@/utils/verification-rules';
  import SafetyProblem from './components/safety-problem.vue';
  import EditPassWord from './components/edit-password.vue';
  import store from '../store';

  @Component({
    components: {
      SafetyProblem,
      EditPassWord,
    },
  })
  export default class Login extends Vue {
    
    private form: any = {
      userName: '',
      password: ''
    };
    private rules: any = {};
    private rememberPw: any = false;
    private safetyDialog: boolean = false;
    private passwordDialog: boolean = false;
    private token: any = '';

    private beforeMount() {
      this.rulesInit();
      const userInfo = window.localStorage.getItem('rememberPw');
      if (userInfo) {
        const details: any = window.atob(userInfo);
        this.rememberPw = true;
        this.form.userName = details.userName;
        this.form.password = details.passWord;
      }
    }

    private rulesInit() {
      this.rules = {
        userName: [
          { required: true, message: this.$t('userNameInputTip'), trigger: 'blur' },
          vRules.userName,
        ],
        password: [
          { required: true, message: this.$t('passWordInputTip'), trigger: 'blur' },
          vRules.passWord,
        ],
      };
    }

    private commit() {
      const form: any = this.$refs.form;
      form.validate((valid: any) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    }
    
    private login() {
      axios.post('/oamApi/finance/renshu/v1/login', this.form)
        .then((res: AxiosResponse) => {
          if (res.data && res.data.code === Static.SUSSECC_CODE && res.data.data) {
            if (this.rememberPw) {
              window.localStorage.setItem('rememberPw', window.btoa(this.form));
            } else {
              window.localStorage.removeItem('rememberPw');
            }
            window.localStorage.setItem('authority', this.form.userName);
            this.$router.push('/home');
          }
        })
    }

    private forgetPw() {
      this.safetyDialog = true;
    }

    private setToken(token: any) {
      if (token) {
        this.token = token;
        this.safetyDialog = false;
        this.passwordDialog = true;
      }
    }

    private closeDialog() {
      this.safetyDialog = false;
      this.passwordDialog = false;
      this.token = '';
    }
  }
</script>

<style lang="scss" scoped>
  .login-body {
    width: 100%;
    height: 100%;
  }
  .login-container{
    width: 300px;
    margin: 0 auto;
    text-align: center;
  }
  .login-btn {
    width: 300px;
  }
</style>
