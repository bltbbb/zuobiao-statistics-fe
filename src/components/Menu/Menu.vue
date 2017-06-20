<template>
  <div class="menu-wrapper">
    <div class="menu-item">
      <div class="header">
        <h2><router-link to="Survey">应用概况</router-link></h2>
      </div>
      <div class="list"></div>
    </div>
    <div class="menu-item">
      <div class="header">
        <h2><router-link to="TrendAnalysis">基本指标</router-link></h2>
      </div>
      <div class="list">
        <ul>
          <li>趋势分析</li>
          <li>活跃用户</li>
          <li>留存用户</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.menu-wrapper
  float: left
  display: inline-block
  width: 10%
  height: 1000px
  background: rgb(251,251,251)
  .menu-item

</style>
