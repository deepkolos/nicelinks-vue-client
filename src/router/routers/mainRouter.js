function setTitleLang (zhStr, enStr) {
  return {
    zh: zhStr,
    en: enStr
  }
}

import Frame from 'partials/Frame'

export default {
  path: '',
  component: Frame,
  children: [{
    path: '/',
    alias: ['resource', 'info', 'skill', 'life'],
    meta: {
      needAuth: false,
      title: setTitleLang('倾城之链', 'Nice Links')
    },
    component: resolve => require(['views/Nicelinks'], resolve)
  }, {
    path: 'setting',
    meta: {
      needAuth: true,
      title: setTitleLang('设置', 'Setting')
    },
    component: resolve => require(['views/Setting'], resolve)
  }, {
    path: 'forgot-pwd',
    alias: 'reset-pwd',
    meta: {
      needAuth: false,
      title: setTitleLang('重设密码', 'Reset Password')
    },
    component: resolve => require(['views/ForgotPwd'], resolve)
  }, {
    path: 'account',
    meta: {
      needAuth: false,
      title: setTitleLang('账户激活', 'Activate Account')
    },
    component: resolve => require(['views/Account'], resolve)
  }, {
    path: 'member/:id',
    meta: {
      needAuth: true,
      title: setTitleLang('我的主页', 'My Homepage')
    },
    component: resolve => require(['views/Homepage'], resolve)
  }, {
    path: 'post/:id',
    meta: {
      needAuth: false,
      title: setTitleLang('倾城之链', 'Nice Links')
    },
    component: resolve => require(['views/Post'], resolve)
  }, {
    path: 'tags/:tags',
    meta: {
      needAuth: false,
      title: setTitleLang('倾城标签', 'Nice Tags')
    },
    component: resolve => require(['views/Tags'], resolve)
  }, {
    path: 'collections/tags',
    meta: {
      needAuth: false,
      title: setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/TagsCollections'], resolve)
  }, {
    path: 'theme/:theme',
    meta: {
      needAuth: false,
      title: setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/Theme'], resolve)
  }, {
    path: 'collections/theme',
    meta: {
      needAuth: false,
      title: setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/ThemeCollections'], resolve)
  }]
}
