<template>
  <div id="footer-nav">
    <footer class="footer">
      <div class="row">
        <div class="content">
          <p><a target="_blank" class="link" href="/">倾城之链</a>: 云集世间优秀站点</p>
        </div>
        <div class="icp">
          © 2017 nicelinks.com
          <a class="link" target="_blank" href="http://jeffjade.com">晚晴幽草轩</a>出品
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data () {
    return {
    }
  },

  components: {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/mixins.scss";
.footer{
  height: $footer-height;
  padding: 15px 20px;
  background-color: $footer-grey-bg;
  .content{
    font-size: $font-medium;
  }
  .icp{
    font-size: $font-small;
  }
  .link{
    color: $footer-link;
    &:hover{
      color: $footer-link-hover;
      text-decoration: none;
    }
  }
}
</style>
