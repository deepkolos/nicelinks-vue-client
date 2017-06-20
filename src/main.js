import 'babel-polyfill'
import Vue from 'vue'
import './global.js'
import './mixins/globalMixin.js'
import App from './App'
import router from './router'
import store from './store/'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
