<template>
  <div id="tags-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr"></links-list>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsCollections',

  data () {
    return {
      isLoading: false,
      niceLinksArr: []
    }
  },

  watch: {
    $router (val) {
      console.log(val)
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#tags-page{
  .link-desc{
    color: $link-desc;
    border-left: 2px solid #000;
    margin: 15px auto;
    padding-left: 10px;
  }
}
</style>
