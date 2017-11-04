<template>
  <div class="wrapper" id="manage-users">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="path" label="地址" min-width="200">
                <template scope="scope">
                  <el-input v-model="scope.row.path"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="image" label="图片" min-width="200">
                <template scope="scope">
                  <el-input v-model="scope.row.image"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="active" :label="$t('isActived')" width="100">
                <template scope="scope">
                  <el-switch
                    v-model="scope.row.active"
                    :on-text="$t('yes')" :off-text="$t('no')"
                    on-color="#13ce66" off-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="modifyTime" label="修改时间" width="160">
                <template scope="scope">{{ scope.row.registeTime | dateConvert }}</template>
              </el-table-column>
              <el-table-column :label="$t('operation')" width="160">
                <template scope="scope">
                  <el-button size="small"
                    @click="handleSave(scope.row)">{{ $t('edit') }}
                  </el-button>
                  <el-button size="small" type="danger"
                    @click="handleDelete(scope.row)">{{ $t('delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'ManageAdverts',

  data () {
    return {
      isLoading: false,
      tableData: []
    }
  },

  components: {
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
      this.isLoading = true
      this.$apis.getAdverts({}).then(result => {
        this.isLoading = false
        this.tableData = result
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      }).finally(() => {
        this.isLoading = false
      })
    },

    handleSave (row) {
    },

    handleDelete (params) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // body
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    onUpdateSuccess () {
      this.initFetch()
    },

    onUserClick (username) {
      let userName = username || this.userInfo.username
      this.$router.push(`/member/${userName}`)
    },

    onCreaterClick (username) {
      this.$router.push(`/member/${username}`)
    }
  },

  locales: {
    en: {
      approved: 'Approved',
      unapproved: 'Unapproved',
      isActived: 'Is Actived',
      creater: 'Creater'
    },
    zh: {
      approved: '已审核',
      unapproved: '未审核',
      isActived: '是否已激活',
      creater: '创建者'
    }
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";

#manage-users{
  .entry-list{
    width: 100%;
    padding: 15px;
    .classify-title{
      margin: 15px auto;
    }
  }
}
</style>
