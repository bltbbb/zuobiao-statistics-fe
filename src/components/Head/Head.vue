<template>
  <div class="head">
    <el-breadcrumb separator="/">
      <div class="logo">
        <img src="../../assets/img/logo2.png" style="float: left;">
      </div>

      <div class="nav-top">
        <a href="javascript:;"><i class="el-icon-date"></i><span>应用概况</span></a>
        <a href="javascript:;"><i class="el-icon-date"></i><span>{{userInfo.userName}}</span></a>
        <a href="javascript:;" @click="loginOut"><i class="el-icon-date"></i><span>退出</span></a>
      </div>

    </el-breadcrumb>
    <!--    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"></el-menu-item>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">退出</a></el-menu-item>
          <el-menu-item index="1">账号</el-menu-item>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">应用概况</a></el-menu-item>
        </el-menu>-->
    <!--   <nav class="navbar navbar-inverse navbar-fixed-top">
             <div class="container-fluid">
               <div class="navbar-header">
                 <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                   <span class="sr-only">Toggle navigation</span>
                   <span class="icon-bar"></span>
                   <span class="icon-bar"></span>
                   <span class="icon-bar"></span>
                 </button>
                 <a class="navbar-brand" href="#"><img src="../../assets/img/logo.png" /></a>
               </div>
               <div id="navbar" class="navbar-collapse collapse">
                 <ul class="nav navbar-nav navbar-right">
                   <li><router-link to="Survey"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>应用概况</router-link></li>
                   <li><a href="#"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>账号</a></li>
                   <li><a href="#"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>退出</a></li>
                 </ul>

               </div>
             </div>
           </nav>-->
  </div>
</template>

<script>
  import axios from 'axios'
  import lockr from 'lockr'
  export default {
      data(){
        return {
            userInfo: {}
        }
      },
      created(){
        let tokenParams = new URLSearchParams();
        tokenParams.append('adoptToken', this.$cookie.get('adoptToken'));
        //用户信息
        axios.post(this.$store.state.domain+'/getTokenUser',tokenParams).then((res)=>{
          this.userInfo = res.data.result
        })
      },
      methods:{
        loginOut(){
          lockr.rm("menuInfo");
          this.$cookie.delete('adoptToken');
          this.$router.push('/login');
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/header.scss';
</style>
