<template>
  <div id="post-page" class="wrapper">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr" :is-loading="isLoading">
              <div slot="link-desc"
                class="link-desc"
                v-html="obtainLinkDesc(niceLinksArr[0])">
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
      isLoading: true,
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
    },

    obtainLinkDesc (item = {}) {
      return item.desc ? item.desc.split('\n').join('<br>') : ''
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
