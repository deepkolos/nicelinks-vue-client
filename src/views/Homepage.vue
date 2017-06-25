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
                <el-tab-pane label="我的发布" name="first"></el-tab-pane>
                <el-tab-pane label="我的点赞" name="second"></el-tab-pane>
              </el-tabs>
              <links-list :pdata="myPublishArr"></links-list>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinksList from 'components/LinksList'

export default{
  name: 'HomePage',

  components: {
    LinksList
  },

  data () {
    return {
      isLoading: false,
      activeName: 'first',
      myPublishArr: [],
      fillForm: {
      },
      rules: {}
    }
  },

  created () {
    this.$apis.getMyPublish({userId: this.userInfo._id}).then(result => {
      this.myPublishArr = result
    }).catch((error) => {
      this.$message.error(`${error}`)
    })
  },

  methods: {
    handleClick () {}
  },

  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>

