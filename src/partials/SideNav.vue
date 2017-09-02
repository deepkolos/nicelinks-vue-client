<template>
<div class="side-nav">
  <el-menu
    :default-openeds="['1']"
    default-active="1" class="el-menu-vertical-demo"
    @open="handleOpen" @close="handleClose" theme="light">
    <el-submenu index="1">
      <template slot="title">{{ $t('niceLinksStr') }}</template>
      <el-menu-item v-for="item in navList" :key="item.value" index="1-1">
        <span @click="handleClick(item)"> {{ item.key }} </span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="2" @click="onActivateInjectDlg">
      {{ $t('injectLinks') }}
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
import $config from 'config'

export default {
  name: 'SideNav',
  data () {
    return {
      navList: $config.classify
    }
  },

  components: {
  },

  methods: {
    onActivateInjectDlg () {
      console.log('onActivateInjectDlg 1')
      this.$bus.emit('activate-inject-dlg')
      this.triggerSideNav()
    },

    handleClick (item) {
      this.$router.push(`/${item.name}`)
      this.$bus.emit('fetch-search', {
        'classify': item.value
      })
      this.triggerSideNav()
    },

    triggerSideNav () {
      this.$bus.$emit('trigger-sidenav')
    },

    handleOpen () {
    },

    handleClose () {
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
  .side-nav{
    height: 100%;
    min-height: 100%;
    position: fixed;
    overflow-y: scroll;
    left: 0;
    top: $header-height;
    z-index: 1000;
    width: 210px;
    &::-webkit-scrollbar {
      background: transparent;
      width: 0px;
    }
    &:hover::-webkit-scrollbar {
      background: transparent;
      width: 0px;
    }
  }
</style>
