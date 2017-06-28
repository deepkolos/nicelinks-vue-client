<template>
  <div class="login-wrap">
    <div class="login-box">
      <a href="/"><img src="../assets/images/nice_links.png" alt="nice links logo"></a>
      <h3>{{ isSignUpPage ? $t('signUp') : $t('signIn') }}</h3>
      <div class="form-group">
        <el-alert
          v-if="tipMessageObj.message"
          :title="tipMessageObj.message"
          :type="tipMessageObj.type">
        </el-alert>
      </div>
      <el-form :model="account" :rules="rules" ref="validateForm">
        <el-form-item prop="username" v-if="isSignUpPage">
          <el-input v-model.trim.lazy="account.username" :placeholder="$t('enterUsernameTip')"
            :icon="checkLoading ? 'loading' : ''"  :autofocus='true'
            @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="login-user"></icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model.trim="account.email" :placeholder="$t('enterEmailTip')"
            @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="login-email"></icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password"
            :placeholder="$t('enterPwdTip')" @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="password"></icon></template>
          </el-input>
        </el-form-item>
        <el-button type="primary" :loading="isLoading" v-if="!isSignUpPage"
          @click="onLoginClick" size="large">{{ $t('signIn') }}</el-button>
        <el-button :loading="isLoading" v-else
          @click="onSignupClick" size="large">{{ $t('signUp') }}</el-button>
        <el-button type="text" :loading="isLoading"
          @click="onForgotPwdClick" size="large">{{ $t('forgetPwd') }}</el-button>
      </el-form>
    </div>
    <div class="form-group login-bottom-tip" v-if="isSignUpPage">
      <p class="text-center">{{ $t('loginBottomTip') }}<a class="el-button--text" href="/login">{{ $t('signIn') }}</a></p>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        isLoading: false,
        checkLoading: false,
        tipMessageObj: {},
        account: {
          email: '',
          username: '',
          password: ''
        },
        _debounceSearch: null,
        rules: {
          username: [
            {required: true, validator: this.validateUsername, trigger: 'change,blur'}
          ],
          email: [
            {required: true, validator: this.validateEmail, trigger: 'change,blur'}
          ],
          password: [
            {required: true, validator: this.validatePassword, trigger: 'change,blur'}
          ]
        }
      }
    },

    created () {
      this._debounceSearch = this.$_.debounce(this.queryUsername, 300)
    },

    mounted () {
    },

    components: {
    },

    computed: {
      isSignUpPage () {
        return this.$route.path === '/register'
      }
    },

    methods: {
      composeParams () {
        return {
          email: this.account.email,
          username: this.account.username,
          password: this.$util.encryptPwd(this.account.password)
        }
      },

      queryUsername () {
        this.checkLoading = true
        return this.$apis.checkIsExisted({username: this.account.username}).then(result => {
          this.checkLoading = false
          return true
        }).catch(error => {
          this.checkLoading = false
          this.tipMessageObj = {
            message: error,
            type: 'error'
          }
          return false
        })
      },

      /* **************************Validate Related************************** */
      validateUsername (rule, value, callback) {
        if (!value || value.length <= 0) {
          callback(new Error(this.$t('enterUsernameTip')))
        } else if (!this.$util.isLegalUsername(value)) {
          callback(new Error(this.$t('enterLegalUsernameTip')))
        } else if (!this._debounceSearch()) {
          callback(new Error(this.$t('enterUsernameTip')))
        } else {
          callback()
        }
      },

      validateEmail (rule, value, callback) {
        if (!value || value.length <= 0) {
          callback(new Error(this.$t('enterEmailTip')))
        } else if (!this.$util.isLegalEmail(value)) {
          callback(new Error(this.$t('enterLegalEmailTip')))
        } else {
          callback()
        }
      },

      validatePassword (rule, value, callback) {
        if (!value || value.length <= 0) {
          callback(new Error(this.$t('enterPwdTip')))
        } else if (!this.$util.isLegalPassword(value)) {
          callback(new Error(this.$t('enterLegalPwdTip')))
        } else {
          callback()
        }
      },

      // ----------------------------onClickEvent-----------------------------
      onLoginClick () {
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            this.isLoading = false
            this.$apis.login(this.composeParams()).then(result => {
              // save user-id into vuex-state(& localStorage)
              this.$store.commit('$vuexSetUserInfo', {_id: result._id})

              this.isLoading = false
              this.$router.push('/')
            }).catch(error => {
              this.isLoading = false
              this.tipMessageObj = {
                message: error,
                type: 'error'
              }
            })
          } else {
            return false
          }
        })
      },

      onSignupClick () {
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            this.isLoading = false
            this.$apis.signup(this.composeParams()).then(result => {
              this.tipMessageObj = {
                message: result,
                type: 'success'
              }
            }).catch((error) => {
              this.isLoading = false
              this.tipMessageObj = {
                message: error,
                type: 'error'
              }
            })
          } else {
            return false
          }
        })
      },

      onForgotPwdClick () {
        this.$router.push('forgot-pwd')
      }
    },

    locales: {
      en: {
        enterUsernameTip: 'Please Enter UserName(Only letters and numbers，3-16)',
        enterLegalUsernameTip: 'Please Enter UserName(Only letters and numbers，3-16)',
        enterEmailTip: 'Please Enter Email',
        enterLegalEmailTip: 'Please Enter A Valid Email Box',
        enterPwdTip: 'Enter Password(Contains at least one letter and number, 6-18)',
        enterLegalPwdTip: 'Enter A Valid Password',
        loginBottomTip: `Don't have an account ?`
      },
      zh: {
        enterUsernameTip: '请输入用户名(仅限字母和数字，3至16位)',
        enterLegalUsernameTip: '请输入用户名(仅限字母和数字，3至16位)',
        enterEmailTip: '请输入邮箱',
        enterLegalEmailTip: '请输入有效邮箱',
        enterPwdTip: '请输入密码(至少包含一个字母和数字，6至18位)',
        enterLegalPwdTip: '请输入合法密码',
        loginBottomTip: `你已拥有一个账号？`
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/mixins.scss";

.login-wrap {
  width: 520px;
  margin: 0 auto;
  padding-top: 150px;
  min-height: 400px;
  position: relative;
  .login-bottom-tip{
    font-size: 1.56rem;
    padding: 15px 0;
  }
}
.login-box {
  width: 520px;
  padding: 30px 30px 0px 30px;
  height: 100%;
  background-color: #fff;
  clear: both;
  display: table;
  border-radius: 3px;
  border: 1px solid #d7dce5;
  .heading{
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    color: #707473;
  }
  img{
    display: block;
    margin: 0 auto 20px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }
  .el-button{
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .el-input{
    .icons{
      display: block;
      width: 20px;
      height: 20px;
      margin: 0;
      padding: 0;
    }
  }
}

@media (max-width: 500px) {
  .login-wrap {
    width: 100%;
    padding-top: 60px;
  }
  .login-box {
    width: 100%;
    border: 0 none;
  }
}
</style>
