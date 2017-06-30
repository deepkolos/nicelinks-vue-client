export default {
  $vuexSetUserInfo (state, info) {
    if (!info) {
      return
    }
    state.userId = info._id
    state.isLogin = !!info._id
    state.userInfo = info
  }
}
