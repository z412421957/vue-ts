<template>
  <div>
    <el-dialog
      width="500px"
      :title="$t('editPassWord')"
      :visible.sync="dialogVisible"
      :before-close="close"
      :destroy-on-close="$store.state.elementUi.destroyOnClose"
      :close-on-click-modal="$store.state.elementUi.closeOnModal"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item v-if="!token" :label="$t('oldPassWord')" prop="oldPassword">
          <el-input
            class="form-input"
            v-model="form.oldPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('newPassWord')" prop="newPassword">
          <el-input
            class="form-input"
            v-model="form.newPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('reNewPassWord')" prop="reNewPassword">
          <el-input
            class="form-input"
            v-model="form.reNewPassword"
            show-password
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
  export default class EditPassWord extends Vue {
    @Prop() private dialogVisible: any;
    @Prop() private token?: any;
    @State('storeGlobal') private storeGlobal: any;
    private form: any = {};
    private rules: any = {};

    private beforeMount() {
      this.formInit();
      this.ruleInit();
    }

    // 表单数据初始化
    private formInit() {
      this.form = {
        oldPassword: '',
        newPassword: '',
        reNewPassword: '',
      };
    }

    private ruleInit() {
      this.rules = {
        oldPassword: [
          { required: true, message: this.$t('passWordInputTip'), trigger: 'blur' },
          vRules.passWord,
        ],
        newPassword: [
          { required: true, message: this.$t('passWordInputTip'), trigger: 'blur' },
          vRules.passWord,
        ],
        reNewPassword: [
          { required: true, message: this.$t('passWordInputTip'), trigger: 'blur' },
          vRules.passWord,
          {
            validator: (rule: any, v: any, cb: any) => {
              if (this.form.newPassword !== v) {
                return cb(new Error(this.$t('passWordDifferent').toString()));
              }
              cb();
            },
            trigger: 'blur',
          }
        ],
      };
    }

    private commit() {
      const form: any = this.$refs.form;
      form.validate((valid: any) => {
        if (valid) {
          if (this.token) {
            this.resetPassWord();
          } else {
            this.editPassWord();
          }
        } else {
          return false;
        }
      });
    }

    private resetPassWord() {
      const options = {
        resetToken: this.token,
        password: this.form.newPassword,
      }
      axios.post('/oamApi/finance/renshu/v1/account/reset', options).then((res: AxiosResponse) => {
        if (res.data && res.data.code === Static.SUSSECC_CODE) {
          this.close();
          this.$message({ type: 'success', message: this.$t('editPassWordSuccess').toString() });
        }
      });
    }

    private editPassWord() {
      const options = {
        userName: this.storeGlobal.userName,
        oldPassword: this.form.oldPassWord,
        newPassword: this.form.newPassWord,
      }
      axios.post('/oamApi/finance/renshu/v1/account/password', options).then((res: AxiosResponse) => {
        if (res.data && res.data.code === Static.SUSSECC_CODE) {
          this.close();
          this.$message({ type: 'success', message: this.$t('editPassWordSuccess').toString() });
        }
      });
    }

    private close() {
      this.$emit('close');
    }
  }
</script>
