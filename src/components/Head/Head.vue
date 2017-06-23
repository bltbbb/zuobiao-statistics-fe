<template>
  <div class="head">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应用概况</el-breadcrumb-item>
      <div class="nav-top">
        <a href="#"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>账号</a>
        <a href="#"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>退出</a>
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
  export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/header.scss';
</style>
