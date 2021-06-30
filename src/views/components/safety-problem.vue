<template>
  <div>
    <el-dialog
      width="500px"
      :title="$t('checkSafetyProblem')"
      :visible.sync="dialogVisible"
      :before-close="close"
      :destroy-on-close="$store.state.elementUi.destroyOnClose"
      :close-on-click-modal="$store.state.elementUi.closeOnModal"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item v-if="isFind && step == 1" :label="$t('userName')" prop="userName">
          <el-input
            class="form-input"
            v-model="form.userName"
            @blur="form.userName && (form.userName = form.userName.trim())"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="(!isFind && !storeGlobal.firstLogin) || (isFind && step == 2)" :label="$t('safetyProblem')">
          <label>{{ safetyProblem || '--' }}</label>
        </el-form-item>
        <el-form-item v-if="(!isFind && !storeGlobal.firstLogin) || (isFind && step == 2)" :label="$t('answer')" prop="securityAnswer">
          <el-input
            class="form-input"
            v-model="form.securityAnswer"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!isFind" :label="$t('newSafetyProblem')" prop="securityQuestion">
          <el-input
            class="form-input"
            v-model="form.securityQuestion"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!isFind" :label="$t('newAnswer')" prop="newSecurityAnswer">
          <el-input
            class="form-input"
            v-model="form.newSecurityAnswer"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="commit">{{ $t('confirm') }}</el-button>
        <el-button @click="close">{{ $t('cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import axios, { AxiosResponse } from 'axios';
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import Static from '@/constants/common';
  import vRules from '@/utils/verification-rules';
  import { State } from 'vuex-class';

  @Component
  export default class SafetyProblem extends Vue {
    @Prop() private dialogVisible: any;
    @Prop({ type: Boolean, default: false }) private isFind!: any;
    @State('storeGlobal') private storeGlobal: any;
    private form: any = {};
    private rules: any = {};
    private step: any = 1;
    private safetyProblem: any = '';

    private beforeMount() {
      this.formInit();
      this.ruleInit();
      if (!this.isFind && !this.storeGlobal.firstLogin) {
        this.getSafetyProblem();
      }
    }

    // 表单数据初始化
    private formInit() {
      this.form = {
        userName: '',
        securityAnswer: '',
        securityQuestion: '',
        newSecurityAnswer: '',
      };
    }

    private ruleInit() {
      this.rules = {
        userName: [
          { required: true, message: this.$t('userNameInputTip'), trigger: 'blur' },
          vRules.userName,
        ],
        securityAnswer: [
          { required: true, message: this.$t('safetyProblemAnswerInputTip'), trigger: 'blur' },
          vRules.description,
        ],
        securityQuestion: [
          { required: true, message: this.$t('newSafetyProblemInputTip'), trigger: 'blur' },
          vRules.description,
        ],
        newSecurityAnswer: [
          { required: true, message: this.$t('newSafetyProblemAnswerInputTip'), trigger: 'blur' },
          vRules.description,
        ],
      };
    }

    private commit() {
      const form: any = this.$refs.form;
      form.validate((valid: any) => {
        if (valid) {
          if (this.isFind && this.step === 1) {
            this.getSafetyProblem();
          } else if (this.isFind) {
            this.checkSafetyProblem();
          } else {
            this.editSafetyProblem();
          }
        } else {
          return false;
        }
      });
    }

    private getSafetyProblem() {
      const options = {
        userName: this.form.userName,
      }
      axios.post('/oamApi/finance/renshu/v1/account/securityQuestion/query', options).then((res: AxiosResponse) => {
        if (res.data && res.data.code === Static.SUSSECC_CODE && res.data.data) {
          this.safetyProblem = res.data.data.sercurityAnswer || '';
          this.step ++;
        }
      });
    }

    private checkSafetyProblem() {
      const options = {
        userName: this.form.userName,
        securityAnswer: this.form.securityAnswer,
      }
      axios.post('/oamApi/finance/renshu/v1/account/findPwd', options).then((res: AxiosResponse) => {
        if (res.data && res.data.code === Static.SUSSECC_CODE && res.data.data) {
          this.$emit('setToken', res.data.data.resetToken);
        }
      });
    }

    private editSafetyProblem() {
      const options: any = {
        userName: this.storeGlobal.userName,
        securityQuestion: this.form.securityQuestion,
        securityAnswer: this.form.newSecurityAnswer,
      }
      if (!this.storeGlobal.firstLogin) {
        options.oldSecurityAnswer = this.form.securityAnswer;
      }
      axios.post('/oamApi/finance/renshu/v1/account/securityQuestion/update', options).then((res: AxiosResponse) => {
        if (res.data && res.data.code === Static.SUSSECC_CODE) {
          this.close();
          this.$message({ type: 'success', message: this.$t('editSafetyProblemSuccess').toString() });
        }
      });
    }

    private close() {
      this.$emit('close');
    }
  }
</script>
