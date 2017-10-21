import $config from 'config'

export default {
  data () {
    return {
      isLoading: false,
      isShowLoadMore: true,
      niceLinksArr: [],
      tableControl: {
        // default no classify.
        // classify: -1,
        pageCount: 1,
        pageSize: 15,
        sortType: -1,
        sortTarget: 'likes'
      }
    }
  },

  computed: {
  },

  methods: {
    drawAjaxParams (params = {}) {
      Object.assign(params, this.tableControl)
      params.userId = this.userInfo && this.userInfo._id || ''
      return params
    },

    fetchSearch (params = {}, isLoadMore) {
      this.isLoading = true
      this.$apis.getNiceLinks(this.drawAjaxParams(params)).then(result => {
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

    onSwitchTabs (item = {}) {
      this.tableControl.pageCount = 1
      this.tableControl.sortTarget = item.sortTarget
      this.tableControl.sortType = item.sortType
      this.fetchSearch()
    }
  }
}
