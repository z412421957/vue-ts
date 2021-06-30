import Noty from 'noty';
import './noty.css';
import './bootstrap-v4.css';

const defaults = {
  layout: 'topRight',
  theme: 'bootstrap-v4',
  timeout: 4000,
  progressBar: true,
  closeWith: ['click'],
};

const VueNoty = {
  options: {},

  setOptions(opts: any) {
    this.options = Object.assign({}, defaults, opts);
    return this;
  },

  show(text: any, type = 'alert', opts = {}) {
    const params: any = Object.assign({}, this.options, opts, {
      type,
      text,
    });

    return new Noty(params).show();
  },

  closeAll(text: any = null) {
    if (text) {
      Noty.closeAll(text);
    } else {
      Noty.closeAll();
    }
  },

  setMaxVisible(num: any, text: any = null) {
    if (text) {
      Noty.setMaxVisible(num, text);
    } else {
      Noty.setMaxVisible(num);
    }
  },

  success(text: any, opts = {}) {
    return this.show(text, 'success', opts);
  },

  error(text: any, opts = {}) {
    return this.show(text, 'error', opts);
  },

  warning(text: any, opts = {}) {
    return this.show(text, 'warning', opts);
  },

  info(text: any, opts = {}) {
    return this.show(text, 'info', opts);
  },
};

export default {
  install: (Vue: any, opts: any) => {
    const noty = VueNoty.setOptions(opts);
    Vue.prototype.$noty = noty;
    Vue.noty = noty;
  },
};
