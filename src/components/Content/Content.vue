<template>
  <div class="content">
    <v-header></v-header>
    <div class="container-fluid">
      <div class="row">
        <v-menu></v-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from '@/components/Head/Head'
  import Menu from '@/components/Menu/Menu'

  export default {
    components: {
      'v-header': Head,
      'v-menu': Menu
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>
