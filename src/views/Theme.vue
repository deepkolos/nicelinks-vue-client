<template>
  <div id="theme-page" class="wrapper">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <operate-tabs @switch-tabs="onSwitchTabs"></operate-tabs>
            <links-list :pdata="niceLinksArr" :is-loading="isLoading"></links-list>
            <load-more></load-more>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partsMixin from 'mixins/partsMixin.js'

export default {
  name: 'theme',

  mixins: [partsMixin],

  data () {
    return {
    }
  },

  watch: {
  },

  components: {
  },

  created () {
  },

  mounted () {
    this.tableControl.theme = decodeURIComponent(this.$route.params.theme)
    this.fetchSearch()
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#theme-page{
  .link-desc{
    color: $link-desc;
    border-left: 2px solid #000;
    margin: 15px auto;
    padding-left: 10px;
  }
}
</style>
