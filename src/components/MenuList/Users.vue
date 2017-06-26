<!--用户属性-->
<template>
  <div class="Users content-box">
    {{msg}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'I am Users'
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
