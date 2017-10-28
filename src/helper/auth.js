import Cookies from 'js-cookie'

export default {
  checkSession () {
    return Cookies.get('NiceLinksLoginCookie') || false
  },

  checkAuth () {
    return true
  }
}
