<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <side-nav ref="sideNav" v-if="isMobile" v-show="isShowSideNav"></side-nav>
    <main @click="hideMenu" class="main">
      <!-- <transition name="fade"></transition> -->
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
      title: 'Nice Links',
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
    this.$bus.on('trigger-sidenav', () => {
      let app = document.getElementById('app')
      app.className = !app.className ? 'menu-expand' : ''
      this.isShowSideNav = !this.isShowSideNav
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
