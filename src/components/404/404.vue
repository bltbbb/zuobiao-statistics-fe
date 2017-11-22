<template>
    <div class="norFound">
      <h1>恭喜您进入了隐藏关卡！</h1>
      <h1 style="font-size: 70px;">404</h1>
      <h4>File not found
        The site configured at this address does not contain the requested file.
        If this is your site, make sure that the filename case matches the URL.</h4>
      <Button style="margin-top:30px;" type="primary" size="large"><router-link to="/Content/onlineScoring">获得指引</router-link></Button>
    </div>
</template>

<script>
    export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .norFound
    width: 600px
    margin: 200px auto 0
    text-align: center
    a
      color: #fff
</style>
