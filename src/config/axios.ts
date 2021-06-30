import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router'

// 允许后端跨域修改cookie
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(config => {
  config.headers["Content-type"] = "application/json;charset=UTF-8;application/font-woff";
  // 添加取消标记
  config.cancelToken = new axios.CancelToken(cancel => {
    window.axiosCancel.push(cancel);
  })
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response: any) => {
  if ((response.config.url.indexOf('/oamApi') === 0) && response.data.code !== 200) {
    Message.error(response.data.msg || 'error');
  }
  return response;
}, function (error) {
  if (error.response && error.response.status === 401) {
    window.localStorage.removeItem('authority');
    router.push('/login');
  } else {
    if (error.message) {
      Message.error(error.message.toString());
    }
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});