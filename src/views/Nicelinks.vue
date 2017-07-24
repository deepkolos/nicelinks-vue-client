<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr"></links-list>
            <div class="page-responsive" v-show="niceLinksArr.length">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableControl.pageCount"
                :page-sizes="[20, 50, 100]"
                :page-size="tableControl.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageTotal">
              </el-pagination>
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
      niceLinksArr: [],
      classifyList: $config.classify,
      pageTotal: 0,
      tableControl: {
        pageCount: 1,
        pageSize: 10,
        sortType: -1,
        sortTarget: ''
      }
    }
  },

  components: {
    InjectDialog,
    LinksList
  },

  watch: {
    '$route': function (to, from) {
      // 只是别名变化, Vue 无法监听到@17-07-18;
    }
  },

  created () {
    this.$bus.on('inject-success', this.fetchSearch)
    this.$bus.on('fetch-search', this.fetchSearch)
    this.$bus.on('activate-inject-dlg', () => {
      this.isShowDlgFlag = true
    })
  },

  mounted () {
    let currentPath = this.$route.path.replace('/', '')
    let currntItem = $config.classify.find(item => {
      return currentPath === item.name
    })
    let index = currntItem && currntItem['value'] || '0'
    let params = {
      'classify': index
    }
    this.fetchSearch(params)
  },

  methods: {
    fetchSearch (params = {}) {
      this.isLoading = true
      Object.assign(params, this.tableControl)
      params.userId = this.userInfo && this.userInfo._id || ''
      $apis.getNiceLinks(params).then(result => {
        this.niceLinksArr = result
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
        this.niceLinksArr = $config.default
      }).finally(() => {
        this.isLoading = false
      })
    },

    handleSortChange (obj) {
      console.log(obj)
      this.tableControl.sortTarget = obj.prop
      this.tableControl.sortType = obj.order === 'ascending' ? 1 : -1
      this.fetchSearch()
    },

    handleSizeChange (size) {
      this.tableControl.pageSize = size
      this.fetchSearch()
    },

    handleCurrentChange (val) {
      this.tableControl.pageCount = val
      this.fetchSearch()
    }
  }
}
</script>
