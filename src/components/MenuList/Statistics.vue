<!--功能统计-->
<template>
  <div class="statistics content-box">
    {{msg}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'I am statistics'
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
