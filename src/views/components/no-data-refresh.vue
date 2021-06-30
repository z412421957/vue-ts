<template>
  <div v-if="loading || noData" class="no-data-refresh-body">
    <div class="loading" v-show="loading">
      <svg class="icon loading">
        <use xlink:href="#spinner-light"></use>
      </svg>
    </div>
    <div class="no-data" v-show="!loading && noData">
      {{ $t('noDataTip') }}
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class NoDataRefresh extends Vue {
    @Prop({ default: false }) private loading: any;
    @Prop({ default: false }) private noData: any;
  }
</script>
<style lang="scss">
.no-data-refresh-body {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    width: 30px;
    height: 30px;
  }
}
</style>