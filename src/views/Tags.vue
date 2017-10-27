<template>
  <div id="tags-page" class="wrapper">
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
  name: 'Tags',

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
    this.tableControl.tags = decodeURIComponent(this.$route.params.tags)
    this.fetchSearch()
  },

  methods: {
    fetchSearch (params = {}) {
      this.$apis.getLinksByTag(this.drawAjaxParams(params)).then(result => {
        this.niceLinksArr = result
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
