import Vue from 'vue';
import zh from '@/assets/lang/zh';
import en from '@/assets/lang/en';
import VueI18n from 'vue-i18n';
import eventBus from './event-bus';
import App from './App.vue';
import router from './router';
import store from './store';
import components from '@/views/components';
import ElementUI from 'element-ui';
import './assets/element-ui/theme/index.css';
import './assets/element-ui/theme/element-apm.css';
// import VModal from 'vue-js-modal';
import './assets';
import './config/axios';

Vue.use(eventBus);
Vue.use(VueI18n);
Vue.use(ElementUI);
Vue.use(components);
// Vue.use(VModal, { dialog: true });

const savedLanguage = window.localStorage.getItem('lang');
let language = navigator.language.split('-')[0];
if (!savedLanguage) {
  window.localStorage.setItem('lang', language);
}
language = savedLanguage ? savedLanguage : language;

const i18n = new VueI18n({
  locale: language,
  messages: {
    zh,
    en,
  },
});

if (!window.Promise) {
  window.Promise = Promise;
}

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
