import Vue from 'vue';
import Vuex from 'vuex';
import storeGlobal, { State as storeGlobalState } from './global';
import elementUi, { State as elementUiState } from './element-ui';

Vue.use(Vuex);

export interface State {
  storeGlobal: storeGlobalState;
  elementUi: elementUiState;
}

export default new Vuex.Store({
  modules: {
    storeGlobal,
    elementUi,
  },
});
