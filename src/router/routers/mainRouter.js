import Frame from 'partials/Frame'
import { $util } from 'helper'

export default {
  path: '',
  component: Frame,
  children: [{
    path: '/',
    alias: ['resource', 'info', 'skill', 'life'],
    meta: {
      needAuth: false,
      title: $util.setTitleLang('', '')
    },
    component: resolve => require(['views/Nicelinks'], resolve)
  }, {
    path: 'setting',
    meta: {
      needAuth: true,
      title: $util.setTitleLang('设置', 'Setting')
    },
    component: resolve => require(['views/Setting'], resolve)
  }, {
    path: 'forgot-pwd',
    alias: 'reset-pwd',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('重设密码', 'Reset Password')
    },
    component: resolve => require(['views/ForgotPwd'], resolve)
  }, {
    path: 'account',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('账户激活', 'Activate Account')
    },
    component: resolve => require(['views/Account'], resolve)
  }, {
    path: 'member/:id',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('我的主页', 'My Homepage')
    },
    component: resolve => require(['views/Homepage'], resolve)
  }, {
    path: 'post/:id',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('', '')
    },
    component: resolve => require(['views/Post'], resolve)
  }, {
    path: 'tags/:tags',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('倾城标签', 'Nice Tags')
    },
    component: resolve => require(['views/Tags'], resolve)
  }, {
    path: 'collections/tags',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/TagsCollections'], resolve)
  }, {
    path: 'theme/:theme',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/Theme'], resolve)
  }, {
    path: 'collections/theme',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/ThemeCollections'], resolve)
  }]
}
