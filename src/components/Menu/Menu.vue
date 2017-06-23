<template>
  <div class="menu-wrapper">
    <el-menu default-active="2" class="el-menu-vertical-demo menu" @open="handleOpen" @close="handleClose" theme="dark">
      <li class="logo"><img src="../../assets/img/logo.png"> </li>
      <el-menu-item index="1"><i class="el-icon-menu"></i>概况</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-information"></i>基本指标</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">趋势分析</el-menu-item>
          <el-menu-item index="2-2">活跃用户</el-menu-item>
          <el-menu-item index="2-3">留存用户</el-menu-item>
          <el-menu-item index="2-4">功能统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!--             <el-menu-item index="3"><i class="el-icon-menu"></i>用户分析</el-menu-item>-->
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-star-on"></i>用户分析</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">用户属性</el-menu-item>
          <el-menu-item index="3-2">地域分布</el-menu-item>
          <el-menu-item index="3-3">终端分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-document"></i>事件分析</template>
        <el-menu-item-group>
          <el-menu-item index="4-1">埋点分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-plus"></i>日志分析</template>
        <el-menu-item-group>
          <el-menu-item index="5-1">错误报告</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import '../../assets/js/page/menu.js'
  export default {
    data() {
      return {
    /*    options: {}*/
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/menu.scss';
</style>

