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
                <el-tab-pane name="BaseInfo"
                  :label="isUserSelf ? $t('baseInfo') : $t('baseInfo')">
                </el-tab-pane>
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
              <el-card class="box-card base-info" v-if="isShowBaseInfo">
                <div slot="header" class="clearfix">
                  <img class="avatar" :src="userAvatar" alt="">
                  <div class="info">
                    <p class="username">{{ mUserInfo.username }}</p>
                    <p class="nickname" v-if="mUserInfo.nickname">{{ mUserInfo.nickname }}</p>
                    <p class="gray">{{ nicerNumText }}</p>
                  </div>
                </div>
              </el-card>
              <links-list v-else :pdata="myLinksList" :is-loading="isLoading"></links-list>
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
      isShowBaseInfo: true,
      activeName: 'BaseInfo',
      myLinksList: [],
      mUserInfo: {},
      nicerNumText: '',
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
    },
    userAvatar () {
      if (this.mUserInfo) {
        let defaultAvatar = 'http://image.nicelinks.site/default-avatar.jpeg'
        let userAvatar = this.mUserInfo.profile && this.mUserInfo.profile.avatar
        return userAvatar ? `/api/avatar/${userAvatar}` : defaultAvatar
      }
    }
  },

  created () {
    this.getUserInfo()
    this.requestApiUpdateList('MyPublish')
  },

  methods: {
    getUserInfo () {
      let params = {username: this.$route.params.id}
      this.$apis.getUserInfo(params).then(result => {
        this.mUserInfo = result
        let cTemp = this.$t('nicerNumText').replace('@X', 1)
        this.nicerNumText = cTemp.replace('@TIME', result.activeTime || result.createdAt)
      }).catch((error) => {
        this.$message.error(`${error}`)
        this.isLoading = true
      })
    },

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
      this.isShowBaseInfo = item.name === 'BaseInfo'
      if (item.name !== 'BaseInfo') {
        this.requestApiUpdateList(item.name)
      }
    }
  },

  locales: {
    en: {
      baseInfo: 'Base Information',
      myPublish: 'My Publish',
      myLikes: 'My Likes',
      myDislikes: 'My Dislikes',
      hisPublish: 'His Publish',
      hisLikes: 'His Likes',
      hisDislikes: 'His Dislikes',
      nicerNumText: 'Nice Links Member No. @X, Join in @TIME'
    },
    zh: {
      baseInfo: '基本信息',
      myPublish: '我的发布',
      myLikes: '我的点赞',
      myDislikes: '我的狂踩',
      hisPublish: '他的发布',
      hisLikes: '他的点赞',
      hisDislikes: '他的狂踩',
      nicerNumText: '倾城之链第 @X 号成员，加入于 @TIME'
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";
@import './../assets/scss/mixins.scss';

.base-info{
  .avatar{
    float: left;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    box-shadow: 0 0 0 2px #fff;
    position: relative;
    margin: 0;
  }
  .info{
    @include flex-box-center(column, space-around, left);
    height: 80px;
    float: left;
    margin-left: 15px;
  }
}
</style>

