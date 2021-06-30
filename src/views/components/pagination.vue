<template>
  <el-pagination
    align="center"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next"
    :total="total"
  >
  </el-pagination>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop() private currentPage!: number;
  @Prop({ default: 0 }) private total!: number;
  @Prop({ default: 10 }) private pageSize!: number;
  @Prop({ default: () => [5, 10, 20, 40] }) private pageSizes?: number[];

  private handleSizeChange(val: any) {
    this.$emit('change', {
      page: 1,
      size: val
    });
  }

  private handleCurrentChange(val: any) {
    this.$emit('change', {
      page: val,
      size: this.pageSize
    });
  }
}
</script>
