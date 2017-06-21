<template>
  <div class="login">
    {{msg}}
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueCookie from 'vue-cookie'
  Vue.use(VueCookie);

  export default {
      data() {
          return {
              options:{}
          }
      },
    methods:{
          ajax(){}
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content{
    display: inline-block;
    width: 90%;
  }

</style>
