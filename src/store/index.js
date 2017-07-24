const GlobalVue = window.Vue
window.Vue = null
import Vuex from 'vuex'
window.Vue = GlobalVue

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import {STORAGE_KEY} from 'config/constant'

const state = {
  isLogin: true,
  userId: '',
  userInfo: null
}

const debug = process.env.NODE_ENV !== 'production'

const persitedState = createPersistedState({
  key: STORAGE_KEY
})

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger(), persitedState] : [persitedState]
})
