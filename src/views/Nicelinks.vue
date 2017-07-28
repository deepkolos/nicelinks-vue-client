<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div class="operate-sort">
              <el-tabs v-model="activeName" type="card" @tab-click="onHandleClick">
                <el-tab-pane v-for="(item, index) in operateTabList" :label="item.label" :name="item.name">
                </el-tab-pane>
              </el-tabs>
            </div>
            <links-list :pdata="niceLinksArr"></links-list>
            <div class="load-more">
              <el-button type="primary" icon="plus" size="large" v-if="isShowLoadMore"
                @click="onLoadMoreClick">{{ $t('loadMoreStr') }}
              </el-button>
              <el-alert v-else title="大人，暂未能获取到更多数据" type="info"> </el-alert>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
        <br>
      </div>
    </div>
    <inject-dialog v-model="isShowDlgFlag"></inject-dialog>
  </div>
</template>

<script>
import { $apis } from 'helper'
import $config from 'config'

import LinksList from 'components/LinksList'
import InjectDialog from 'components/InjectDialog'

export default {
  name: 'nicelinks',
  data () {
    return {
      isLoading: false,
      isShowDlgFlag: false,
      isShowLoadMore: true,
      activeName: 'new',
      niceLinksArr: [],
      tableControl: {
        classify: 0,
        pageCount: 1,
        pageSize: 15,
        sortType: -1,
        sortTarget: 'created'
      },
      operateTabList: [
        {
          label: '最新分享',
          name: 'new',
          sortTarget: 'created',
          sortType: -1
        },
        {
          label: '热门分享',
          name: 'hot',
          sortTarget: 'likes',
          sortType: -1
        },
        {
          label: '最早分享',
          name: 'old',
          sortTarget: 'created',
          sortType: 1
        }
      ]
    }
  },

  components: {
    InjectDialog,
    LinksList
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
    this.$bus.on('activate-inject-dlg', () => {
      if (this.$isLogin()) {
        this.isShowDlgFlag = true
      } else {
        this.$router.push('/login')
      }
    })
  },

  mounted () {
    let currentPath = this.$route.path.replace('/', '')
    let currentItem = $config.classify.find(item => {
      return currentPath === item.name
    })
    this.tableControl.classify = currentItem && currentItem['value'] || '0'
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
      $apis.getNiceLinks(this.drawReuestParams(params)).then(result => {
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
    },

    onHandleClick () {
    }
  }
}
</script>

<style type="text/css" lang="scss">
@import "../assets/scss/variables.scss";
.entry-list{
  .operate-sort{
    padding-top: 15px;
  }
  .el-button{
    background-color: $entry-btn-grey;
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
