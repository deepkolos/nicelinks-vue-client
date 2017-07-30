<template>
  <div id="post-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr">
              <div class="link-desc" v-html="niceLinksArr[0] && niceLinksArr[0].desc"></div>
            </links-list>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinksList from 'components/LinksList'

export default {
  name: 'post',
  data () {
    return {
      niceLinksArr: []
    }
  },

  watch: {
    $router (val) {
      console.log(val)
    }
  },

  components: {
    LinksList
  },

  created () {
  },

  mounted () {
    let postId = this.$route.params.id
    this.$apis.getNiceLinks({_id: postId}).then(result => {
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

#post-page{
  .link-desc{
    color: $link-desc;
    border-left: 2px solid #000;
    margin: 15px auto;
    padding-left: 10px;
  }
}
</style>
