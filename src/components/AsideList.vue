<template>
  <aside class="aside-list">
    <ads-position></ads-position>
    <visit-count></visit-count>
  </aside>
</template>

<script>
import AdsPosition from 'components/AdsPosition'
import VisitCount from 'components/VisitCount'

export default {
  name: 'AsideList',
  data () {
    return {
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
}
</style>
