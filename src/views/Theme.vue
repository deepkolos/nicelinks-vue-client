<template>
  <div id="theme-page" class="wrapper">
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
  name: 'theme',

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
    params.theme = decodeURIComponent(this.$route.params.theme)
    params.userId = this.userInfo && this.userInfo._id || ''

    this.isLoading = true
    this.$apis.getNiceLinks(params).then(result => {
      this.niceLinksArr = result
      this.isLoading = false
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

#theme-page{
  .link-desc{
    color: $link-desc;
    border-left: 2px solid #000;
    margin: 15px auto;
    padding-left: 10px;
  }
}
</style>
