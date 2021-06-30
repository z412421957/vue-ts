
import noty from './noty';
import RkMainHeader from './rk-main-header.vue';
import RKMenu from './apm/rk-menu.vue';
import RkPage from './apm/rk-page.vue';
import RkEcharts from './apm/rk-echarts.vue';
import RkSelect from './apm/rk-select.vue';
import RkButton from './apm/rk-button.vue';
import RkIcon from './apm/rk-icon.vue';

import Pagination from './sentinel/pagination.vue';

const components: any = {
  RkMainHeader,
  RKMenu,
  RkEcharts,
  RkPage,
  RkSelect,
  RkButton,
  RkIcon,
  Pagination,
};

const componentsName: string[] = Object.keys(components);
export default {
  install: (vue: any) => {
    componentsName.forEach((i) => {
      vue.component(i, components[i]);
    });
    vue.use(noty);
  },
};
