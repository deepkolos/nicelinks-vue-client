import Vue from 'vue'
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

    $verifyUrl (rule, value, callback) {
      if (!value || value.length <= 0) {
        callback()
      } if (!$util.isLegalUrl(value)) {
        callback(new Error('请输入合法地址'))
      } else {
        callback()
      }
    }
  }
})
