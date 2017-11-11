import Vue from 'vue'
import sha256 from 'crypto-js/sha256'
import md5 from 'crypto-js/md5'
import {STORAGE_PREFIX} from 'config/constant'

const getStorageName = (name = '') => {
  return `${STORAGE_PREFIX}-${name}`
}

if (typeof String.prototype.startsWith !== 'function') {
  Window.String.prototype.startsWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix
  }
}

/*
  DESC：对Date的扩展，将 Date 转化为指定格式的String。
      月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
      (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
window.Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export default {
  encryptPwd (str) {
    str = sha256(str).toString()
    str = md5(str).toString()
    return str
  },

  setTitleLang (zhStr, enStr) {
    let NICE_ZH = `倾城之链`
    let NICE_EN = `NICE LINKS`
    return {
      zh: zhStr ? `${NICE_ZH} | ${zhStr}` : NICE_ZH,
      en: enStr ? `${NICE_EN} | ${enStr}` : enStr
    }
  },

  getManageList () {
    return [{
      name: 'manageLinks',
      path: 'links'
    }, {
      name: 'manageUsers',
      path: 'users'
    }, {
      name: 'manageAdverts',
      path: 'adverts'
    }]
  },

  getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  },

  query (search) {
    let str = search || window.location.search
    let objURL = {}

    str.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      ($0, $1, $2, $3) => {
        objURL[$1] = $3
      }
    )
    return objURL
  },

  queryString (url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  },

  isLegalUrl (str) {
    let pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/
    return pattern.test(str)
  },

  isLegalUsername (str) {
    let pattern = /^[a-zA-Z0-9]{3,16}$/
    return pattern.test(str)
  },

  isLegalEmail (str) {
    let pattern = new RegExp('^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$', 'g')
    return pattern.test(str)
  },

  isLegalPassword (str) {
    let pattern = new RegExp('^(?=.*[0-9])(?=.*[A-Za-z])[a-zA-Z0-9!@#$%^&*]{6,18}$', 'g')
    return pattern.test(str)
  },

  setCurrentDate (date) {
    Vue.config.currentDate = date
  },

  getCurrentDate () {
    return Vue.config.currentDate || new Date()
  },

  getCurrentDateHMS (delimiter = '-') {
    let currentDate = new Date(Vue.config.currentDate) || new Date()
    let currentH = currentDate.getHours()
    let currentM = currentDate.getMinutes()
    let currentS = currentDate.getSeconds()
    return [currentH, currentM, currentS].join(delimiter)
  },

  /* -----------------------------localStorage------------------------------------ Start */
  /*
   * set localStorage
   */
  setLocalStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(getStorageName(name), content)
  },

  /**
   * get localStorage
   */
  getLocalStorage (name) {
    if (!name) return
    let content = window.localStorage.getItem(getStorageName(name))
    return JSON.parse(content)
  },

  /**
   * delete localStorage
   */
  removeLocalStorage (name) {
    if (!name) return
    window.localStorage.removeItem(getStorageName(name))
  },
  /* -----------------------------localStorage------------------------------------ End */
  /* ----------------------------sessionStorage----------------------------------- Start */
  setSessionStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(getStorageName(name), content)
  },

  /**
   * get sessionStorage
   */
  getSessionStorage (name) {
    if (!name) return
    let content = window.sessionStorage.getItem(getStorageName(name))
    return JSON.parse(content)
  },

  /**
   * delete sessionStorage
   */
  removeSessionStorage (name) {
    if (!name) return
    window.sessionStorage.removeItem(getStorageName(name))
  }
  /* ----------------------------sessionStorage----------------------------------- End */
}
