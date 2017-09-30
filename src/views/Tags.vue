<template>
  <div id="tags-page" class="wrapper">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr" :is-loading="isLoading"></links-list>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',

  data () {
    return {
      isLoading: false,
      niceLinksArr: []
    }
  },

  watch: {
    $router (val) {
      console.log(val)
    }
  },

  components: {
  },

  created () {
  },

  mounted () {
    let params = {}
    params.tags = decodeURIComponent(this.$route.params.tags)
    params.userId = this.userInfo && this.userInfo._id || ''
    this.$apis.getLinksByTag(params).then(result => {
      this.niceLinksArr = result
    }).catch((error) => {
      this.isLoading = false
      this.$message.error(`${error}`)
    }).finally(() => {
      this.isLoading = false
    })
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#tags-page{
  .link-desc{
    color: $link-desc;
    border-left: 2px solid #000;
    margin: 15px auto;
    padding-left: 10px;
  }
}
</style>
