import { $util } from 'helper'
import $types from 'store/types'

export default {
  [$types.RECORD_USERINFO] (state, info) {
    state.userId = info._id
    state.isLogin = true
    state.userInfo = info
    $util.setStorage('NiceLinksUserId', info._id)
  },

  [$types.GET_USERINFO] (state, info) {
    if (!info || (state.userInfo.username !== info.username)) {
      return
    }

    if (!state.isLogin) {
      return
    }

    state.userInfo = {...info}
  }
}
