/**
 *@autor:baolingtao
 *@time:2017/6/21
**/

<template>
  <div class="login-wrapper">
    <transition name="slide-down">
      <div class="login-table" v-show="showTable">
        <div class="login-content">
          <div class="img-wrapper"><img src="../../assets/img/logo.png" alt=""></div>
          <div class="clearfix">
            <label for="userName"><span class="glyphicon glyphicon-user"></span></label>
            <input type="text" id="userName" placeholder="请输入用户名" v-model="userName" :class="{danger:userEmpty}" @focus="userEmpty = false">
          </div>
          <div class="clearfix">
            <label for="password"><span class="glyphicon glyphicon-lock"></span></label>
            <input type="text" id="password" placeholder="请输入密码" v-model="password" :class="{danger:pwEmpty}" @focus="pwEmpty = false">
          </div>
        </div>
        <div class="error" v-show="showError">{{errorText}}</div>
        <button @click="login">登录</button>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueCookie from 'vue-cookie'
  import axios from 'axios'

  Vue.use(VueCookie);
  export default {
    data(){
        return {
            userName: '',
            password: '',
            errorText: '用户名或密码错误',
            userEmpty: false,
            pwEmpty: false,
            showTable: false,
            showError: false
        }
    },
    methods: {
        login(){
          //如果没有用户名
          if (this.userName == '') {
            this.userEmpty = true;
            this.pwEmpty = true;
            this.showError = true;
            this.errorText = '请输入用户名和密码'
            return;
          }
          //如果没有密码
          if (this.password == '') {
            this.pwEmpty = true;
            this.showError = true;
            this.errorText = '请输入密码'
            return;
          }
          let params = new URLSearchParams();
          params.append('loginName', this.userName);
          params.append('password', this.password);
//          this.showError = true;
//          this.errorText = '登录失败'

          //测试接口 登录成功后将获取的token保存在cookie中
          axios.post('http://192.168.1.41:9999/authc/login', params).then((res)=>{
              if(res.status === 0){
                this.$cookie.set('adoptToken', res.adoptToken, 1);
              }
          });
        }
    },
    mounted(){
        this.showTable = true
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .login-wrapper
    position: fixed
    top: 0
    left: 0
    background: url("../../assets/img/login_bg.jpg") center center no-repeat
    width: 100%
    height: 100%
    .login-table
      box-sizing: border-box
      background: #fff
      position: absolute
      left: 50%
      top: 50%
      width: 400px
      margin-top: -160px
      margin-left: -200px
      padding: 40px 30px
      border-radius: 4px
      label
        float: left
        width: 5%
        padding: 0 0 3px 0
        height: 20px
      .glyphicon
        font-size: 12px
        color: #cccccc
        line-height: 20px
      .img-wrapper
        img
          display: block
          margin: 0 auto 50px
      input
        border-top: none
        border-left: none
        border-right: none
        border-bottom: 1px solid #eeeeee
        width: 95%
        float: left
        font-size: 12px
        color: #666666
        outline: none
        margin-bottom: 15px
        padding: 0 8px 3px 12px
        line-height: 21px
        &.danger
          border-color: rgba(255, 11, 36, 0.3)
      button
        border-radius: 3px
        background: rgb(122,143,224)
        color: #fff
        font-size: 14px
        font-weight: bold
        margin-top: 10px
        border: none
        outline: none
        width: 100%
        height: 40px
      .error
        background: rgba(255,11,36,0.1)
        border-radius: 3px
        color: rgba(0,0,0,0.5)
        padding: 5px 8px
        margin: 8px 0 15px 0

    /*登录框动画*/
  .slide-down-enter-active
    transition: all .8s ease

  .slide-down-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-down-enter, .slide-fade-leave-active
    transform: translateY(50px)
    opacity: 0

</style>
