/*
* 路由跳转权限控制
*/
import Vue from 'vue'
import { $auth } from 'helper'

export default {
  // 检查登录态
  checkLoginAuth (to, from, next) {
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
    }

    if (to.meta && !to.meta.needLogin && !to.meta.needAuth) {
      next()
    } else {
      if ($auth.checkSession()) {
        if (to.meta.needAuth) {
          $auth.checkAuth() && next()
        } else {
          next()
        }
      } else {
        next({
          path: '/login'
        })
      }
    }
  }
}
