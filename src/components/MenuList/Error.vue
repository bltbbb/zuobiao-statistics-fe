<!--错误报告-->
<template>
  <div class="Error content-box">
    {{msg}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'I am Error'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>
