<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'app',
    mounted(){
      //组件开始挂载时获取用户信息
      //this.getUserInfo();
    },
    methods:{
//      getUserInfo(){
//          setTimeout(()=>{
//              console.log(this.$store)
//          },500)
//      }
    }
  }
</script>

<style lang="sass">
  @import '../src/assets/reset.css'
</style>
