<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div class="operate-sort">
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane v-for="(item, index) in operateTabList"
                  :label="$t(item.name)" :name="item.name">
                </el-tab-pane>
              </el-tabs>
            </div>
            <links-list :pdata="niceLinksArr" :is-loading="isLoading"></links-list>
            <div class="load-more">
              <el-button type="primary" icon="plus" size="large" v-if="isShowLoadMore"
                @click="onLoadMoreClick">{{ $t('loadMoreStr') }}
              </el-button>
              <el-alert v-else :title="$t('noMoreInfo')" type="info"> </el-alert>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'nicelinks',
  data () {
    return {
      isLoading: false,
      isShowLoadMore: true,
      activeName: 'hot',
      niceLinksArr: [],
      tableControl: {
        classify: -1,
        pageCount: 1,
        pageSize: 15,
        sortType: -1,
        sortTarget: 'likes'
      },
      operateTabList: [
        {
          name: 'hot',
          sortTarget: 'likes',
          sortType: -1
        },
        {
          name: 'new',
          sortTarget: 'created',
          sortType: -1
        },
        {
          name: 'old',
          sortTarget: 'created',
          sortType: 1
        }
      ]
    }
  },

  components: {
  },

  watch: {
    '$route': function (to, from) {
      // 只是别名变化, Vue 无法监听到@17-07-18;
    },
    activeName (val) {
      let currentItem = this.operateTabList.find(item => {
        return item.name === val
      })
      this.tableControl.pageCount = 1
      this.tableControl.sortTarget = currentItem.sortTarget
      this.tableControl.sortType = currentItem.sortType
      this.fetchSearch()
    }
  },

  created () {
    this.$bus.on('inject-success', this.fetchSearch)
    this.$bus.on('fetch-search', this.fetchSearch)
  },

  mounted () {
    let currentPath = this.$route.path.replace('/', '')
    let currentItem = $config.classify.find(item => {
      return currentPath === item.name
    })

    if (currentItem && currentItem['value']) {
      this.tableControl.classify = currentItem && currentItem['value']
    } else {
      delete this.tableControl.classify
    }
    this.fetchSearch()
  },

  methods: {
    drawReuestParams (params = {}) {
      Object.assign(params, this.tableControl)
      params.userId = this.userInfo && this.userInfo._id || ''
      return params
    },

    fetchSearch (params = {}, isLoadMore) {
      this.isLoading = true
      this.$apis.getNiceLinks(this.drawReuestParams(params)).then(result => {
        this.isLoading = false
        if (!result || result.length <= 0) {
          this.isShowLoadMore = false
          return
        }
        this.niceLinksArr = isLoadMore ? this.niceLinksArr.concat(result) : result
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
        this.niceLinksArr = $config.default
      }).finally(() => {
        this.isLoading = false
      })
    },

    onLoadMoreClick () {
      this.tableControl.pageCount += 1
      this.fetchSearch({}, true)
    }
  },

  locales: {
    zh: {
      hot: '热门分享',
      new: '最新分享',
      old: '最早分享',
      noMoreInfo: '大人，暂未能获取到更多数据'
    },
    en: {
      hot: 'Popular Share',
      new: 'Latest Share',
      old: 'Earliest Share',
      noMoreInfo: 'King, No more data available yet.'
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import "../assets/scss/variables.scss";
.entry-list{
  .operate-sort{
    padding-top: 15px;
  }
  .el-button{
    background-color: $entry-btn-grey;
    transition: 1s background-color ease-in;
    border-radius: 20px;
    border: none;
    width: 80%;
    &:hover{
      background-color: $entry-btn-hover;
    }
  }
  .el-alert{
    border-radius: 20px;
  }
  .load-more{
    width: 70%;
    margin: auto;
    padding: 15px 0;
  }
}
</style>
