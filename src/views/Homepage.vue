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
                <el-tab-pane :label="$t('myPublish')" name="MyPublish"></el-tab-pane>
                <el-tab-pane :label="$t('myLikes')" name="MyLikes"></el-tab-pane>
                <el-tab-pane :label="$t('myDislikes')" name="MyDislikes"></el-tab-pane>
              </el-tabs>
              <links-list :pdata="myLinksList"></links-list>
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
      this.isLoading = true
      this.$apis[currentApi]({userId: this.userInfo._id}).then(result => {
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
      myDislikes: 'My Dislikes'
    },
    zh: {
      myPublish: '我的发布',
      myLikes: '我的点赞',
      myDislikes: '我的狂踩'
    }
  }
}
</script>

