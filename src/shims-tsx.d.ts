import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {}
  interface Window {
    Promise: any;
    moment: any;
    axiosCancel: any;
  }
}
