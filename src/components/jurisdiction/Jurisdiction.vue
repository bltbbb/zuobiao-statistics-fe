<template>
    <div class="jurisdiction">
      <div class="left">
        <Button type="primary" size="large"><router-link to="/Content/onlineScoring">返回</router-link></Button>
        <h1>Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h3>如有不满哈哈哈哈</h3>
        <h3>你可以：</h3><br>
        <ul>
          <li><router-link style="color: #2b85e4" to="/Content/onlineScoring">返回</router-link></li>
          <li style="color: #2b85e4" @click="show">点我看图</li>
        </ul>
      </div>
      <div class="right">
        <img src="http://panjiachen.github.io/vue-element-admin/static/img/401.089007e.gif?1502265962549" alt="">
      </div>
    </div>
</template>

<script>
    export default {
      methods:{
        show(){
          this.$Modal.confirm({
            render: (h) => {
              return h('img', {
                style: {
                    width: '100%'
                },
                attrs: {
                  src: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
                }
              })
            },
            width: 500
          })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .jurisdiction
    width: 700px
    margin: 100px auto 0
    .left
      float: left
      ul
        font-size: 14px
    .right
      float: right
    a
      color: #fff
    h1
      font-size: 60px
      font-weight: 700
      color: #484848
    h2
      padding-bottom: 30px
</style>
