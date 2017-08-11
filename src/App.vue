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
    },
    created(){
      document.title="统计分析-坐标";
    }
  }
</script>

<style lang="scss">
  @import '../src/assets/reset.css';
  @import '../src/assets/css/page/public.scss';
</style>
