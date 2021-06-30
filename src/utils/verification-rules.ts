import VueI18n from 'vue-i18n';
import zh from '@/assets/lang/zh';
import en from '@/assets/lang/en';

// // 国际化
// const i18n = new VueI18n({
//   locale: 'zh', // set locale
//   messages: {
//     zh,
//     en,
//   }
// });

const userName = {
  validator: (rule: any, v: any, cb: any) => {
    if (!/^[a-zA-Z0-9_]{6,24}$/.test(v)) {
      return cb(new Error());
    }
    cb();
  },
  trigger: 'blur',
};

const passWord = {
  validator: (rule: any, v: any, cb: any) => {
    if (v.length < 8 || v.length > 24) {
      return cb(new Error());
    }
    cb();
  },
  trigger: 'blur',
};

const name = {
  validator: (rule: any, v: any, cb: any) => {
    if (!/^[a-zA-Z0-9_]{0,24}$/.test(v)) {
      return cb(new Error());
    }
    cb();
  },
  trigger: 'blur',
};

const description = {
  validator: (rule: any, v: any, cb: any) => {
    if (v.length > 256) {
      return cb(new Error());
    }
    cb();
  },
  trigger: 'blur',
};

export default {
  userName,
  passWord,
  name,
  description,
};
