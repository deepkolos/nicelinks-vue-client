import Frame from 'partials/Frame'
import { $util } from 'helper'

export default {
  path: '/manage',
  component: Frame,
  meta: {
    isNeedAuth: true,
    title: $util.setTitleLang('倾城管理', 'Management')
  },
  children: [{
    path: '/',
    meta: {
      isNeedAuth: true,
      title: $util.setTitleLang('倾城管理', 'Management')
    },
    component: resolve => require(['views/manage/Index'], resolve)
  }, {
    path: 'links',
    meta: {
      isNeedAuth: true,
      title: $util.setTitleLang('倾城管理', 'Management')
    },
    component: resolve => require(['views/manage/Links'], resolve)
  }, {
    path: 'users',
    meta: {
      isNeedAuth: true,
      title: $util.setTitleLang('倾城管理', 'Management')
    },
    component: resolve => require(['views/manage/Users'], resolve)
  }]
}
