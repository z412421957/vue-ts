import Header from './header.vue';
import NoDataRefresh from './no-data-refresh.vue';
import Pagination from './pagination.vue';
import SafetyProblem from './safety-problem.vue';

const components: any = {
  Header,
  NoDataRefresh,
  Pagination,
  SafetyProblem,
};

const componentsName: string[] = Object.keys(components);
export default {
  install: (vue: any) => {
    componentsName.forEach((i) => {
      vue.component(i, components[i]);
    });
  },
};
