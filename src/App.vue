<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'app',
    created(){
      document.title="统计分析-坐标";
    }
  }
</script>

<style lang="scss">
  @import '../src/assets/reset.css';
  @import '../src/assets/css/page/public.scss';
</style>
