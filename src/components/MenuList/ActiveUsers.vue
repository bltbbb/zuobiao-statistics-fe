<!--活跃用户-->
<template>
  <div class="ActiveUsers content-box">
    {{msg}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'I am ActiveUsers'
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .content
    display: inline-block
    width: 90%
</style>
