<template>
  <div class="home-container flex-v">
    <div class="info-container" ref="infoContainer">
      <div class="clear" v-for="(item, index) in infoList" :key="index">
        <div 
          class="bubbling-container mb-10"
          :class="{'bubbling-container-left': item.type == 'system', 'bubbling-container-right': item.type == 'user'}"
          v-html="item.value">
        </div>
      </div>
    </div>
    <div class="info-input clear">
      <div class="text-input" @keyup.enter="sendText">
        <el-input
          v-model="textInput"
          @blur="textInput && (textInput = textInput.trim())"
        ></el-input>
      </div>
      <el-button class="pull-right bt-ml" type="primary" @click="sendVoice">{{ '语音' }}</el-button>
      <el-button class="pull-right" type="primary" :disabled="!textInput" @click="sendText">{{ '发送' }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, Mutation, State } from 'vuex-class';
import axios, { AxiosResponse } from 'axios';
@Component
export default class HomePage extends Vue {

  private infoList: any = [];
  private textInput: any = "";

  private beforeMount() {
    this.queryQuickTips();
  }

  private queryQuickTips() {
    this.infoList = [];
  }

  private moveToScrollBottom() {
    this.$nextTick(function(){
      const ref: any = this.$refs.infoContainer;
      ref.scrollTop = ref.scrollHeight;
    });
  }

  private sendText() {
    if (!this.textInput.trim()) {
      return;
    }
    this.infoList.push({
      value: this.textInput,
      type: 'user',
    });
    this.textInput = '';
  }

  private sendVoice() {

  }

}
</script>

<style lang="scss">
.home-container {
  width: 100%;
  height: 100%;
}
.info-container {
  flex-grow: 1;
  width: 100%;
  padding: 10px 30px;
  overflow-y: auto;
}
.info-input {
  height: 40px;
  width: 100%;
  background: #f0f2f5;
}
.bubbling-container {
  width: auto;
  display: inline-block;
  min-width: 40px;
  min-height: 20px;
  line-height: 20px;
  font-size: 12px;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid #000;
  position: relative;
  padding: 10px 20px;
}
.bubbling-container-right {
  float: right;
}
.bubbling-container-left:before,
.bubbling-container-left:after,
.bubbling-container-right:before,
.bubbling-container-right:after {
  width: 0;
  height: 0;
  content: "";
  position: absolute;
  border: solid transparent;
}
.bubbling-container-left:before,
.bubbling-container-right:before {
  border-width: 10px;
  top: 10px;
}
.bubbling-container-left:after,
.bubbling-container-right:after {
  border-width: 8px;
  top: 12px;
}
.bubbling-container-left:before {
  border-right-color: #000;
  left: -20px;
}
.bubbling-container-left:after {
  border-right-color: #fff;
  left: -16px;
}
.bubbling-container-right:before {
  border-left-color: #000;
  left: 100%;
}
.bubbling-container-right:after {
  border-left-color: #fff;
  left: 100%;
}
.text-input {
  width: calc(100% - 201px) !important;
  display: inline-block;
}
.text-input .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
}
.info-input button {
  width: 100px;
  height: 40px;
}
.el-button+.el-button {
  margin-left: 0;
}
.bt-ml {
  margin-left: 1px;
}
</style>