<template>
  <div class="rk-main-header flex-h">
    <div class="flex-h">
      <img src="@/assets/img/header_logo.png" alt="skate">
      <label class="header-logo-word">{{this.$t('systemName')}}</label>
    </div>
    <div class="flex-h">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ storeGlobal.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="editPassWord">{{ $t('editPassWord') }}</el-dropdown-item>
          <el-dropdown-item command="editSafetyProblem">{{ $t('editSafetyProblem') }}</el-dropdown-item>
          <el-dropdown-item command="logout">{{ $t('logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="passwordDialog">
      <EditPassWord
        :dialogVisible="passwordDialog"
        @close="closeDialog"
      ></EditPassWord>
    </div>
    <div v-if="safetyDialog">
      <SafetyProblem
        :dialogVisible="safetyDialog"
        @close="closeDialog"
      ></SafetyProblem>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';
import { Getter, State, Mutation } from 'vuex-class';
import Static from '@/constants/common';
import SafetyProblem from './safety-problem.vue';
import EditPassWord from './edit-password.vue';

@Component({
  components: {
    SafetyProblem,
    EditPassWord,
  },
})
export default class Header extends Vue {
  @Getter('noAuth') private noAuth: any;
  @State('storeGlobal') private storeGlobal: any;
  @Mutation('SET_PERMISSION') private SET_PERMISSION: any;
  private safetyDialog: boolean = false;
  private passwordDialog: boolean = false;

  private beforeMount() {
    if (this.noAuth('terminal-login')) {
      window.localStorage.removeItem('authority');
      this.$router.push('/login');
    }
  }

  private logout() {
    axios.get('/stnApi/auth/logout')
      .then((res: AxiosResponse) => {
        if (res.data && res.data.code === Static.SUSSECC_CODE) {
          window.localStorage.removeItem('authority');
          this.$message({type: 'success', message: this.$t('logoutSucceeded').toString()});
          this.$router.push('/login');
        }
      })
      .catch((error: any) => {
        this.$message({type: 'error', message: this.$t('logoutFailed').toString()});
      });
  }

  private handleCommand(command: any) {
    if (command === 'editPassWord') {
      this.passwordDialog = true;
    } else if (command === 'editSafetyProblem') {
      this.safetyDialog = true;
    } else if (command === 'logout') {
      this.logout();
    }
  }

  private closeDialog() {
    this.passwordDialog = false;
    this.safetyDialog = false;
  }

}
</script>

<style lang="scss" scoped>
.rk-main-header {
  width: 100%;
  min-width: 1340px;
  position: relative;
  flex-shrink: 0;
  justify-content: space-between;
  height: 48px;
  padding-right: 20px;
  padding-left: 20px;
  font-size: 13px;
  color: #9ea4b3;
  background-color: #252a2f;
  box-shadow: 0 1px 2px 0 rgba(26, 24, 29, 0.24);
}
.header-logo-word {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: right;
  margin: 0 0 0 10px;
  font-weight: normal;
}
.el-dropdown {
  color: #9ea4b3;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-link:hover {
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>