<template>
  <div id="app">
    <v-header v-if="!$route.meta.showComponent"></v-header>
    <div class="container-fluid">
      <div class="row">
          <v-menu v-if="!$route.meta.showComponent"></v-menu>
      </div>
    </div>
    <router-view></router-view>
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
  @import '../src/assets/reset.css'
</style>
