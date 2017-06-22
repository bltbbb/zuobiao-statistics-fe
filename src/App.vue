<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import Head from '@/components/Head/Head'
  import Menu from '@/components/Menu/Menu'
  import Content from '@/components/Content/Content'

  export default {
    name: 'app',
    components: {
      'v-header': Head,
      'v-menu': Menu
    }
  }
</script>

<style lang="sass">
  @import '../src/assets/reset.css';
</style>
