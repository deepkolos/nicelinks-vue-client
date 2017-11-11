<template>
  <div class="load-more">
    <el-button type="primary" icon="plus" size="large" v-if="isShowLoadMore"
      @click="onLoadMoreClick">{{ $t('loadMoreStr') }}
    </el-button>
    <el-alert v-else :title="$t('noMoreDataTip')" type="info"> </el-alert>
  </div>
</template>

<script>
import partsMixin from 'mixins/partsMixin.js'

export default {
  name: 'LoadMore',

  mixins: [partsMixin],

  data () {
    return {
    }
  },

  watch: {
  },

  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    onLoadMoreClick () {
      this.tableControl.pageCount += 1
      this.fetchSearch({}, true)
    }
  },

  locales: {
    zh: {
      noMoreDataTip: '嘿，朋友，这儿是有底线的。'
    },
    en: {
      noMoreDataTip: `Hey, friend, The data here is limited.`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";

.load-more{
  width: 70%;
  margin: auto;
  padding: 15px 0;
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
}
</style>
