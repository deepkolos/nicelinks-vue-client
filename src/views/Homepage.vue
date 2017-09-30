<template>
  <div class="wrapper" id="homepage">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('homePage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ $t('homepage') }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>

              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="MyPublish"
                  :label="isUserSelf ? $t('myPublish') : $t('hisPublish')">
                </el-tab-pane>
                <el-tab-pane name="MyLikes"
                  :label="isUserSelf ? $t('myLikes') : $t('hisLikes')">
                </el-tab-pane>
                <el-tab-pane name="MyDislikes"
                  :label="isUserSelf ? $t('myDislikes') : $t('hisDislikes')">
                </el-tab-pane>
              </el-tabs>
              <links-list :pdata="myLinksList" :is-loading="isLoading"></links-list>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'HomePage',

  components: {
  },

  data () {
    return {
      isLoading: false,
      activeName: 'MyPublish',
      myLinksList: [],
      fillForm: {
      },
      rules: {},
      tabApiObj: {
        MyPublish: 'getMyPublish',
        MyLikes: 'getMyLikes',
        MyDislikes: 'getMyDislikes'
      },
      tabDataObj: {
        MyPublish: null,
        MyLikes: null,
        MyDislikes: null
      }
    }
  },

  computed: {
    isUserSelf () {
      return this.userInfo && this.userInfo.username === this.$route.params.id
    }
  },

  created () {
    this.requestApiUpdateList(this.activeName)
  },

  methods: {
    requestApiUpdateList (index) {
      if (this.tabDataObj[index]) {
        this.myLinksList = this.tabDataObj[index]
        return
      }

      let currentApi = this.tabApiObj[index]
      let params = {
        username: this.$route.params.id,
        userId: this.userInfo && this.userInfo._id || ''
      }

      this.isLoading = true
      this.$apis[currentApi](params).then(result => {
        this.myLinksList = this.tabDataObj[index] = result
        this.isLoading = false
      }).catch((error) => {
        this.$message.error(`${error}`)
        this.isLoading = true
      })
    },

    handleClick (item) {
      this.requestApiUpdateList(item.name)
    }
  },

  locales: {
    en: {
      myPublish: 'My Publish',
      myLikes: 'My Likes',
      myDislikes: 'My Dislikes',
      hisPublish: 'His Publish',
      hisLikes: 'His Likes',
      hisDislikes: 'His Dislikes'
    },
    zh: {
      myPublish: '我的发布',
      myLikes: '我的点赞',
      myDislikes: '我的狂踩',
      hisPublish: '他的发布',
      hisLikes: '他的点赞',
      hisDislikes: '他的狂踩'
    }
  }
}
</script>

