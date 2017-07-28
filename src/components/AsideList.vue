<template>
  <aside class="aside-list">
    <ads-position></ads-position>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="$t('visitCount')" name="visitCount">
        <visit-count v-if="activeNames.includes('visitCount')"></visit-count>
      </el-collapse-item>
    </el-collapse>
  </aside>
</template>

<script>
import AdsPosition from 'components/AdsPosition'
import VisitCount from 'components/VisitCount'

export default {
  name: 'AsideList',
  data () {
    return {
      activeNames: []
    }
  },

  watch: {
  },

  components: {
    AdsPosition,
    VisitCount
  },

  mounted () {
  },

  methods: {
    handleChange () {}
  }
}
</script>

<style type="text/css" lang="scss">
@import "./../assets/scss/variables.scss";

.aside-list{
  background-color: $entry-list-bg;
  display: inline-block;
  max-width: 360px;
  width: 32%;
  float: right;
  .el-collapse-item__header{
    text-align: left;
    font-size: $font-medium;
  }
}
</style>
