import $ajax from './ajax'

function requestUrl (path) {
  return `/api/${path}`
}

export default {
  getNiceLinks (data) {
    return $ajax.get(requestUrl('getNiceLinks'), data)
  },

  getLinksByTag (data) {
    return $ajax.get(requestUrl('getLinksByTag'), data)
  },

  getAllTags () {
    return $ajax.get(requestUrl('getAllTags'))
  },

  addNiceLinks (data) {
    return $ajax.post(requestUrl('addNiceLinks'), data)
  },

  dispatchAction (data) {
    return $ajax.post(requestUrl('dispatchAction'), data)
  },

  getMyPublish (data) {
    return $ajax.get(requestUrl('getMyPublish'), data)
  },

  /* auth */
  checkIsExisted (data) {
    return $ajax.post(requestUrl('checkIsExisted'), data)
  },

  signup (data) {
    return $ajax.post(requestUrl('signup'), data)
  },

  login (data) {
    return $ajax.post(requestUrl('login'), data)
  },

  logout () {
    return $ajax.post(requestUrl('logout'))
  },

  logoff (data) {
    return $ajax.post(requestUrl('logoff'), data)
  },

  active (data) {
    return $ajax.post(requestUrl('active'), data)
  },

  requestResetPwd (data) {
    return $ajax.post(requestUrl('requestResetPwd'), data)
  },

  getProfile (data) {
    return $ajax.get(requestUrl('getProfile'), data)
  },

  setProfile (data) {
    return $ajax.post(requestUrl('setProfile'), data)
  },

  crawlLinksInfo (data) {
    return $ajax.get(requestUrl('crawlLinksInfo'), data)
  }
}
