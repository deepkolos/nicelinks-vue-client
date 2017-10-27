export default {
  $vuexSetUserInfo (state, info) {
    if (!info || !state) {
      return
    }
    state.userId = info._id
    state.userInfo = info
  }
}
