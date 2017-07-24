<template>
  <div id="jade-gg-position">
    <h3 class="aside-widget-title">广而告之位</h3>
    <el-carousel trigger="click" class="jade-gg-body" height="256px">
      <el-carousel-item v-for="(item, index) in adsList" :key="index">
        <a :href="item.path" target=_blank>
          <img :src="item.image">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'AdsPosition',
  data () {
    return {
      adsList: $config.ads
    }
  },

  components: {
  },

  methods: {
  }
}
</script>

<style lang="scss">
#jade-gg-position{
  .jade-gg-body{
    width: 100%;
  }
}
</style>
