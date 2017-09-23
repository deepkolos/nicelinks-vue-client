import Vue from 'vue'
import './global.js'
import './mixins/globalMixin.js'
import App from './App'
import router from './router'
import store from './store/'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
