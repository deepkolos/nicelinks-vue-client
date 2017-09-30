<template>
  <div id="post-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr">
              <div slot="link-desc" class="link-desc" v-html="niceLinksArr[0] && niceLinksArr[0].desc">
              </div>
              <social-share slot="link-share"
                :share-url="currentPath"
                :share-content="makeShareContent(niceLinksArr[0])"
                :hashtags="makeShareTags(niceLinksArr[0])">
              </social-share>
            </links-list>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocialShare from 'components/SocialShare'

export default {
  name: 'Post',

  data () {
    return {
      isLoading: false,
      niceLinksArr: [],
      currentPath: window.document.location.href,
      shareTitle: ''
    }
  },

  watch: {
  },

  components: {
    SocialShare
  },

  created () {
  },

  mounted () {
    let params = {}
    params._id = this.$route.params.id
    params.userId = this.userInfo && this.userInfo._id || ''
    this.$apis.getNiceLinks(params).then(result => {
      this.niceLinksArr = result
    }).catch((error) => {
      this.isLoading = false
      this.$message.error(`${error}`)
    }).finally(() => {
      this.isLoading = false
    })
  },

  methods: {
    makeShareContent (item = {}) {
      let defaultText = '我在#倾城之链#发现绝好网站 —— @NAME：@URL (@DESC)；欢迎前来围观、品评。'
      return defaultText.replace('@NAME', item.title).replace('@URL', item.urlPath).replace('@DESC', item.desc)
    },

    makeShareTags (item = {}) {
      let defaultTagsStr = 'Skill,Resource,Life,Information'
      return item.tags ? item.tags.join(',') : defaultTagsStr
    }
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
