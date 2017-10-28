<template>
  <div class="wrapper" id="manage-index">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="operate-area">
          <el-button :plain="true" type="success"
            @click="onJumpClick('links')">管理链接</el-button>
          <el-button :plain="true" type="success"
            @click="onJumpClick('users')">管理用户</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageIndex',
  data () {
    return {
    }
  },

  components: {
  },

  created () {
  },

  methods: {
    onJumpClick (i) {
      this.$router.push(`/manage/${i}`)
    }
  }
}
</script>

<style lang="scss">
#manage-index{
  .operate-area{
    min-height: 300px;
  }
}
</style>
