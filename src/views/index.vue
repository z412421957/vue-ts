<template>
  <div class="app flex-v clear">
    <Header />
    <div class="router-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RouterIndex extends Vue {
}
</script>

<style lang="scss" scoped>
.app {
  min-width: 1340px;
  height: 100%;
}
.router-container {
  width: 100%;
  background-color: #f0f2f5;
  flex-grow: 1;
  overflow: hidden;
}
</style>
