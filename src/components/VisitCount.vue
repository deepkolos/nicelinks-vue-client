<template>
  <div id="visit-count">
    <h3 class="aside-widget-title">{{ $t('visitCount') }}</h3>
    <div id="clustrmaps-count"></div>
  </div>
</template>

<script>
export default {
  name: 'VisitCount',
  data () {
    return {
    }
  },

  components: {
  },

  mounted () {
    let clustrmapsCount = document.getElementById('clustrmaps-count')
    let clustrmapsScript = document.createElement('script')
    clustrmapsScript.type = 'text/javascript'
    clustrmapsScript.id = 'clustrmaps'
    clustrmapsScript.src = '//cdn.clustrmaps.com/map_v2.js?d=_BvmVKKc1sJ7eaB66Dj16gQPcw4NyUxkIpfeDRnZoRA'
    clustrmapsCount.appendChild(clustrmapsScript)
  },

  methods: {
  }
}
</script>
