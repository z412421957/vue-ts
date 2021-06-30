import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import axios, { AxiosResponse } from 'axios';
import Static from '@/constants/common';

Vue.use(Router);
window.axiosCancel = [];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [{
    path: '/login',
    component: (resolve) => require(['./views/login.vue'], resolve),
  }, {
    path: '/',
    redirect: 'home',
    component: (resolve) => require(['./views/index.vue'], resolve),
    children: [{
      path: 'home',
      component: (resolve) => require(['./views/home-page.vue'], resolve),
    }],
  }],
});

router.beforeEach((to, from, next) => {
  if (window.axiosCancel.length !== 0) {
    for (const func of window.axiosCancel) {
      setTimeout(func(), 0);
    }
    window.axiosCancel = [];
  }
  const userName = window.localStorage.getItem('authority');
  if (to.path === '/login') {
    if (userName) {
      next('/home');
    } else {
      next();
    }
  } else if (!userName) {
    store.commit('SET_USERNAME', '');
    next('/login');
  } else if (!store.state.userName) {
    axios.post(`/oamApi/finance/reshu/v1/rights/permissions/getUserPermissions/${userName}`)
    .then((res: AxiosResponse) => {
      if (res.data && res.data.code === Static.SUSSECC_CODE && res.data.data) {
        store.commit('SET_USERNAME', userName);
        store.commit('SET_FIRSTLOGIN', res.data.data.isFirstLogin === 1);
        store.commit('SET_PERMISSION', res.data.data.permissionIds || []);
        next();
      } else {
        window.localStorage.removeItem('authority');
        next('/login');
      }
    })
    .catch((err: any) => {
      window.localStorage.removeItem('authority');
      next('/login');
    });
  } else {
    next();
  }
});

export default router;
