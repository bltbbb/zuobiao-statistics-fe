/**
 *@autor:baolingtao
 *@time:2017/6/21
**/

<template>
  <div class="login-wrapper">
    <transition name="slide-down">
      <div class="login-table" v-show="showTable">
        <div class="login-content">
          <div class="img-wrapper"><img src="../../assets/img/login-logo.png" alt=""></div>
          <div class="clearfix nameBar">
            <input type="text" id="userName" placeholder="请输入用户名" v-model="userName" :class="{danger:userEmpty}" @focus="userEmpty = false">
          </div>
          <div class="clearfix pwBar">
            <input type="text" id="password" placeholder="请输入密码" v-model="password" :class="{danger:pwEmpty}" @focus="pwEmpty = false">
          </div>
        </div>
        <div :class="loginInfo?'success':'error'" v-show="showMsg">{{errorText}}</div>
        <button @click="login">登录</button>
      </div>
    </transition>

    <!--loding层-->
    <!--<div class="spinner">-->
      <!--<div class="rect1"></div>-->
      <!--<div class="rect2"></div>-->
      <!--<div class="rect3"></div>-->
      <!--<div class="rect4"></div>-->
      <!--<div class="rect5"></div>-->
    <!--</div>-->
    <!--<div class="screen"></div>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueCookie from 'vue-cookie'
  import lockr from 'lockr'
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
            showMsg: false,
            loginInfo: false
        }
    },
    methods: {
        login(){
          //如果没有用户名
          if (this.userName == '') {
            this.userEmpty = true;
            this.pwEmpty = true;
            this.showMsg = true;
            this.errorText = '请输入用户名和密码'
            return;
          }
          //如果没有密码
          if (this.password == '') {
            this.pwEmpty = true;
            this.showMsg = true;
            this.errorText = '请输入密码'
            return;
          }

          //登录参数
          let loginParams = new URLSearchParams();
          loginParams.append('loginName', this.userName);
          loginParams.append('password', this.password);



          //测试接口 登录成功后将获取的token保存在cookie中
          axios.post('http://192.168.1.201:9999/authc/login', loginParams).then((res)=>{
              if(res.data.status === 0){
                this.showMsg = true;
                this.loginInfo = true;
                this.errorText = '登录成功';
                //设置cookie
                this.$cookie.set('adoptToken', res.data.result.adoptToken, 1);

                //获取token参数 请求菜单接口
                let tokenParams = new URLSearchParams();
                tokenParams.append('adoptToken', res.data.result.adoptToken);

                //请求
                axios.post('http://192.168.1.201:9999/getAuthMenus',tokenParams).then((res)=>{
                  this.$store.state.menuInfo = res.data;
                  lockr.set("menuInfo",res.data);      //将数据存入localStorage 以便免登陆应用
                  this.$router.push('/Content/Survey');    //跳转
                })

              }else if(res.status === 1){
                this.showMsg = true;
                this.loginInfo = false;
                this.errorText = '用户名不存在'
              }else
              {
                this.showMsg = true;
                this.loginInfo = false;
                this.errorText = '用户名或密码错误'
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
      .nameBar
        overflow: hidden
      .pwBar
        overflow: hidden
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
        height: 20px
        font-size: 14px
      .success
        background: rgb(87, 194, 47)
        border-radius: 3px
        color: #fff
        padding: 5px 8px
        margin: 8px 0 15px 0
        height: 20px
        font-size: 14px

    /*登录框动画*/
  .slide-down-enter-active
    transition: all .8s ease

  .slide-down-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-down-enter, .slide-fade-leave-active
    transform: translateY(50px)
    opacity: 0


  /*loading*/
  .spinner
    position: relative
    left: 50%
    top: 50%
    margin-left: -25px
    margin-top: -20px
    width: 50px
    height: 40px
    text-align: center
    font-size: 10px
    z-index: 99
    > div
      background-color: #fff
      height: 100%
      width: 6px
      display: inline-block
      animation: sk-stretchdelay 1.2s infinite ease-in-out
    .rect2
      animation-delay: -1.1s
    .rect3
      animation-delay: -1.0s
    .rect4
      animation-delay: -0.9s
    .rect5
      animation-delay: -0.8s

  @-webkit-keyframes sk-stretchdelay
    0%, 40%, 100%
      -webkit-transform: scaleY(0.4)

    20%
      -webkit-transform: scaleY(1)


  @keyframes sk-stretchdelay
    0%, 40%, 100%
      transform: scaleY(0.4)
      -webkit-transform: scaleY(0.4)

    20%
      transform: scaleY(1)
      -webkit-transform: scaleY(1)

  .screen
    position: fixed
    left: 50%
    top: 50%
    margin-left: -50px
    margin-top: -40px
    width: 100px
    height: 80px
    background: rgba(0,0,0,0.5)
    border-radius: 5px
</style>
