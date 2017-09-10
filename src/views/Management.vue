<template>
  <div class="wrapper" id="manage-page">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="未审核" name="first"></el-tab-pane>
              <el-tab-pane label="已审核" name="second"></el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="classify" :label="$t('linkClassifyStr')" width="100">
                <template scope="scope">
                  {{ classifyList[scope.row.classify]['key'] }}
                </template>
              </el-table-column>
              <el-table-column prop="active" label="是否已激活" width="100">
                <template scope="scope">
                  <el-tag :type="scope.row.active ? 'success' : 'error'">
                    {{ scope.row.active ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="theme" :label="$t('linkThemeStr')" width="100">
                <template scope="scope">
                {{ fillThemeName(scope.row.classify, scope.row.theme) }}
                </template>
              </el-table-column>
              <el-table-column prop="urlPath" :label="$t('linkAddressStr')" width="180">
                <template scope="scope">
                  <a class="title-link" :href="scope.row.urlPath" target="_blank">
                    {{ scope.row.title }}
                  </a>
                </template>
              </el-table-column>
              <el-table-column prop="created" :label="$t('createdDateStr')" min-width="100">
                <template scope="scope">{{ scope.row.created | dateConvert }}</template>
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="table-operate">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableControl.pageCount"
                :page-sizes="[20, 50, 100]"
                :page-size="20" layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
          <!-- <aside-list></aside-list> -->
        </div>
      </div>
    </div>
    <edit-dialog v-model="isShowDlgFlag" :pdata="currentRowData"
      @update-success="onUpdateSuccess"></edit-dialog>
  </div>
</template>

<script>
import EditDialog from 'components/EditDialog'
import $config from 'config'
export default{
  name: 'Manage',

  data () {
    return {
      isLoading: false,
      isShowDlgFlag: false,
      activeName: 'first',
      classifyList: $config.classify,
      themeList: $config.theme,
      tableData: [],
      tableControl: {
        pageCount: 1,
        pageSize: 15,
        sortType: -1,
        sortTarget: 'created'
      },
      currentRowData: []
    }
  },

  components: {
    EditDialog
  },

  created () {
    this.initFetch()
  },

  watch: {
    activeName (val) {
      this.initFetch()
    }
  },

  methods: {
    initFetch () {
      let params = {}
      Object.assign(params, this.tableControl)
      params.active = !(this.activeName === 'first')

      this.isLoading = true
      this.$apis.getAllLinks(params).then(result => {
        this.isLoading = false
        this.tableData = result
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      }).finally(() => {
        this.isLoading = false
      })
    },

    fillThemeName (classify, theme) {
      let result = ''
      this.themeList[classify].map(item => {
        if (item.value === theme) {
          result = item.key
        }
      })
      return result
    },

    handleClick () {
    },

    handleSizeChange (val) {
      this.tableControl.pageSize = val
    },

    handleCurrentChange (val) {
      this.tableControl.pageCount = val
    },

    handleEdit (row) {
      this.isShowDlgFlag = true
      this.currentRowData = row
    },

    handleDelete (params) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        params.operatorId = this.userInfo && this.userInfo._id

        this.isLoading = true
        this.$apis.deleteNiceLinks(params).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.initFetch()
          this.isLoading = false
        }).catch((error) => {
          this.isLoading = false
          this.$message.error(`${error}`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    onUpdateSuccess () {
      this.initFetch()
    }
  },

  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#manage-page{
  .entry-list{
    width: 100%;
    padding: 15px;
    .classify-title{
      margin: 15px auto;
    }
  }
}
</style>
