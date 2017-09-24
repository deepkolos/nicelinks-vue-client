import Vue from 'vue'
import Cookies from 'js-cookie'
import { $util } from 'helper'
import {mapState, mapActions} from 'vuex'

Vue.mixin({
  data () {
    return {
    }
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },

  methods: {
    ...mapActions([
      'getUserInfo'
    ]),

    $isLogin () {
      return this.$auth.checkSession()
    },

    $getCurrentLang () {
      return Vue.config.lang || 'zh'
    },

    $switchLang () {
      let currentLang = Vue.config.lang === 'zh' ? 'en' : 'zh'
      Vue.config.lang = currentLang
      Cookies.set('lang', currentLang)
    },

    $verifyUrl (rule, value, callback) {
      if (!value || value.length <= 0) {
        callback()
      } if (!$util.isLegalUrl(value)) {
        callback(new Error(this.$t('enterLegalUrl')))
      } else {
        callback()
      }
    }
  }
})
