import axios from 'axios'
import $q from 'q'

function requestHandle (url, params, op) {
  let defer = $q.defer()
  axios(url, params, op)
    .then(res => {
      if (res && (res.unauthorized || res.statusCode === 401)) {
        window.location.href = '/login'
      }
      if (res.type === 'application/x-msdownload') {
        redirectToIframe(res.request.responseURL)
      } else if (res.data) {
        if (res.data.success) {
          defer.resolve(res.data.value)
        } else {
          defer.reject(res.data.message)
        }
      } else {
        defer.reject()
      }
    }).catch(err => {
      defer.reject(err)
    })

  return defer.promise
}

function redirectToIframe (url) {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

export default {
  post: function (url, params, op) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params
    })
  },
  get: function (url, params, op) {
    return requestHandle({
      method: 'get',
      url: url,
      data: params
    })
  }
}
