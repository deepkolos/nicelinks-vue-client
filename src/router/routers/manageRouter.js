import Frame from 'partials/Frame'
import { $util } from 'helper'

export default {
  path: '/manage',
  component: Frame,
  children: [{
    path: '/',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('倾城管理', 'Management')
    },
    component: resolve => require(['views/manage/Index'], resolve)
  }, {
    path: 'links',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('倾城管理', 'Management')
    },
    component: resolve => require(['views/manage/Links'], resolve)
  }, {
    path: 'users',
    meta: {
      needAuth: false,
      title: $util.setTitleLang('倾城管理', 'Management')
    },
    component: resolve => require(['views/manage/Users'], resolve)
  }]
}
