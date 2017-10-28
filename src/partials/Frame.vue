<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <transition name="slide">
      <side-nav ref="sideNav" v-if="isMobile" v-show="isShowSideNav"></side-nav>
    </transition>
    <main @click="hideMenu" class="main">
      <router-view  :key="$route.path"></router-view>
      <footer-nav></footer-nav>
    </main>
    <inject-dialog v-model="isShowDlgFlag"></inject-dialog>
  </div>
</template>

<script>
import HeaderNav from 'partials/HeaderNav'
import SideNav from 'partials/SideNav'
import FooterNav from 'partials/FooterNav'
import InjectDialog from 'components/InjectDialog'

export default {
  name: 'homepage',
  data () {
    return {
      isMobile: window.innerWidth <= 960,
      isShowSideNav: false,
      isShowDlgFlag: false
    }
  },

  components: {
    HeaderNav,
    SideNav,
    FooterNav,
    InjectDialog
  },

  created () {
    this.$bus.on('trigger-sidenav', (isHide = false) => {
      let app = document.getElementById('app')
      app.className = (!isHide && !app.className) ? 'menu-expand' : ''
      this.isShowSideNav = !isHide && !this.isShowSideNav
    })

    this.$bus.on('activate-inject-dlg', () => {
      console.log(this.$isLogin())
      if (this.$isLogin()) {
        this.isShowDlgFlag = true
      } else {
        this.$router.push('/login')
      }
    })

    if (!this.$auth.checkSession()) {
      this.$store.commit('$vuexSetUserInfo', {})
    }
  },

  methods: {
    hideMenu () {
      if (this.isShowSideNav) {
        this.$bus.$emit('trigger-sidenav')
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.slide-enter-active, .slide-leave-active {
  width: $side-nav-width;
  transition: width .5s;
}
.slide-enter, .slide-leave-to{
  width: 0;
}
</style>
