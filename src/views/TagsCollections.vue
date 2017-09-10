<template>
  <div id="tags-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
          <h3 class="classify-title">{{ $t('tagsCollection') }}</h3>
            <el-button v-for="(item, index) in tagsList" :key="item"
              type="text" @click="onItemClick(item)">{{ item }}
            </el-button>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'TagsCollections',

  data () {
    return {
      isLoading: false,
      tagsList: $config.tags
    }
  },

  watch: {
  },

  created () {
    this.$apis.getAllTags().then(result => {
      this.tagsList = result.sort()
    }).catch((error) => {
      this.isLoading = false
      this.$message.error(`${error}`)
    })
  },

  mounted () {
  },

  methods: {
    onItemClick (tag) {
      this.$router.push(`/tags/${tag}`)
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#tags-coll-page{
  .entry-list{
    padding: 15px;
    .classify-title{
      margin: 15px auto;
    }
  }
}
</style>
