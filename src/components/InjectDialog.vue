<template>
  <div id="inject-links-dlg">
    <el-dialog stripe :title="$t('injectLinks')"
      v-model="isShowDlgFlag" size="small" v-loading.body="isLoading">
      <div class="form form-horizontal">
        <el-form :model="fillForm" :rules="rules" ref="fillForm">
          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkAddressStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="urlPath">
                <el-input
                  v-model="fillForm.urlPath"
                  @blur="getLinkPageData"
                  :placeholder="this.$t('pleaseEnter') + this.$t('linkAddressStr')"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkNameStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="title">
                <el-input
                  v-model="fillForm.title"
                  :placeholder="this.$t('pleaseEnter') + this.$t('linkNameStr')"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkClassifyStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="classify">
                <el-select class="wrap-block" v-model="fillForm.classify"
                  :placeholder="this.$t('pleaseSelect') + this.$t('linkClassifyStr')">
                  <el-option
                    v-for="item in classifyList" :key="item.key"
                    :label="item.key"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkThemeStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="theme">
                <el-select class="wrap-block" v-model="fillForm.theme"
                  :placeholder="this.$t('pleaseSelect') + this.$t('linkThemeStr')">
                  <el-option
                    v-for="item in themeList" :key="item.key"
                    :label="item.key"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkTagsStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="tags">
                <el-select class="wrap-block"
                  v-model="fillForm.tags" allow-create multiple filterable
                  :multiple-limit="3"
                  :placeholder="this.$t('pleaseSelect') + this.$t('linkTagsStr')">
                  <el-option
                    v-for="item in tagsList" :key="item.key"
                    :label="item.key"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkDescStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="desc">
                <el-input :placeholder="this.$t('pleaseSelect') + this.$t('linkDescStr')" v-model="fillForm.desc"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDlgFlag = false">{{ this.$t('cancel') }}</el-button>
        <el-button type="primary" @click="onCommitClick">{{ this.$t('confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $config from 'config'

export default {
  data () {
    return {
      isShowDlgFlag: false,
      isLoading: false,
      fillForm: {
        urlPath: '',
        title: '',
        desc: '',
        classify: '',
        theme: '',
        tags: []
      },
      themeList: [],
      tagsList: [],
      classifyList: $config.classify,
      rules: {
        urlPath: [
          { required: true, validator: this.$verifyUrl, trigger: 'change,blur' }
        ],
        title: [
          { required: true, message: this.$t('pleaseEnter') + this.$t('linkNameStr'), trigger: 'change,blur' }
        ],
        theme: [
          { required: true, message: this.$t('pleaseSelect') + this.$t('linkThemeStr'), trigger: 'change,blur' }
        ],
        classify: [
          { required: true, message: this.$t('pleaseSelect') + this.$t('linkClassifyStr'), trigger: 'change,blur' }
        ]
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
  },

  watch: {
    value (val) {
      this.isShowDlgFlag = val
    },
    isShowDlgFlag (val) {
      this.$emit('input', val)
    },
    'fillForm.classify': function (val) {
      this.themeList = $config.theme[this.fillForm.classify] || []
      this.tagsList = $config.tags[this.fillForm.classify] || []
    }
  },

  methods: {
    getLinkPageData () {
      this.$apis.crawlLinksInfo({url: this.fillForm.urlPath}).then(result => {
        this.fillForm.title = result.title
        this.fillForm.desc = result.desc
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
        this.$message.error(`${error}`)
      })
    },

    onCommitClick () {
      this.$refs.fillForm.validate((valid) => {
        if (valid) {
          this.isLoading = true

          let params = this.$_.clone(this.fillForm, true)
          params.userId = this.userInfo && this.userInfo._id
          params.createdBy = this.userInfo && this.userInfo.username

          this.$apis.addNiceLinks(params).then(result => {
            this.isLoading = false
            this.isShowDlgFlag = false
            this.$message({
              message: this.$t('successAddTip'),
              type: 'success'
            })
            this.$bus.emit('inject-success')
          }).catch((error) => {
            console.log(error)
            this.isLoading = false
            this.$message.error(`${error}`)
          })
        }
      })
    }
  },

  locales: {
    en: {
      successAddTip: 'Well, you have successfully added the link'
    },
    zh: {
      successAddTip: '很好，您已成功添加该链接'
    }
  }
}
</script>
