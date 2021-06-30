import * as types from '@/store/mutation-types';
import { ActionTree, Commit, MutationTree } from 'vuex';
import axios, { AxiosResponse } from 'axios';

export interface State {
  isLogin: boolean;
  userName: string,
  permissionIds: Array<string>,
  firstLogin: boolean,
}

const initState: State = {
  isLogin: false,
  userName: '',
  permissionIds: [],
  firstLogin: false,
};

// getters
const getters = {
  noAuth: (state: State) => {
    return (id: any) => {
      return state.permissionIds.indexOf(id) === -1;
    };
  }
};

// mutations
const mutations: MutationTree<State> = {
  [types.SET_PERMISSION](state: State, data: any): void {
    state.permissionIds = data;
  },
  [types.SET_USERNAME](state: State, data: any): void {
    state.userName = data;
  },
  [types.SET_FIRSTLOGIN](state: State, data: any): void {
    state.firstLogin = data;
  },
};

// actions
const actions: ActionTree<State, any> = {
  NO_AUTH(context: { state: State }, data: string): boolean {
    return context.state.permissionIds.indexOf(data) === -1;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
