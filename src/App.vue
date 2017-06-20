<template>
  <div id="app">
    <v-header></v-header>
    <div class="container-fluid">
  <div class="row">
        <Menu></Menu>
          <Content></Content>
  </div>

    </div>
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
      Menu: Menu,
      Content: Content
  },
  methods: {
      cFn(){
          console.log($('#app'))
      }
  },
  created(){
    this.cFn()
  }
}
</script>

<style lang="sass">
  @import '../src/assets/reset.css'
</style>
