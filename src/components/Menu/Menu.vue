<template>
  <div class="menu-wrapper">
    <el-menu unique-opened default-active="2" class="el-menu-vertical-demo menu" @open="handleOpen" @close="handleClose" theme="dark">
<!--      <li class="logo"><img src="../../assets/img/logo.png"></li>-->
      <div class="menu-div" v-for="(item,key1,index1) in menuList" :key="index1">
        <el-menu-item :index="key1+''" v-if="!item.children && !item.emptyFolder && !(item.isShare == 2)">
          <router-link :to="'/Content/'+item.alias" style="text-align: left"><i :class="'el-icon-'+iconFont[item.alias]"></i>{{item.menuName}}</router-link>
        </el-menu-item>
        <el-submenu :index="key1+''" v-if="item.children && !item.emptyFolder && !(item.isShare == 2)">
          <template slot="title"><i :class="'el-icon-'+iconFont[item.alias]"></i>{{item.menuName}}</template>
          <el-menu-item-group v-if="item.children && !item.emptyFolder && !(item.isShare == 2)" >
            <el-menu-item v-for="(list,key2,index2) in item.children"  :index="key1+'-'+key2"  :key="index2" v-if="list.menuType != 3 && list.isShare != 2">
              <router-link :to="'/Content/'+list.alias">{{list.menuName}}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
      <!--<el-menu-item index="1">-->
        <!--<router-link to="/Content/Survey" style="text-align: left"><i class="el-icon-menu"></i>概况</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-submenu index="2">-->
        <!--<template slot="title"><i class="el-icon-information"></i>基本指标</template>-->
        <!--<el-menu-item-group>-->
          <!--<el-menu-item index="2-1">-->
            <!--<router-link to="/Content/Trend">趋势分析</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="2-2">-->
            <!--<router-link to="/Content/ActiveUsers">活跃用户</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="2-3">-->
            <!--<router-link to="/Content/Retained">留存用户</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="2-4">-->
            <!--<router-link to="/Content/Statistics">功能统计</router-link>-->
          <!--</el-menu-item>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->
      <!--&lt;!&ndash;             <el-menu-item index="3"><i class="el-icon-menu"></i>用户分析</el-menu-item>&ndash;&gt;-->
      <!--<el-submenu index="3">-->
        <!--<template slot="title"><i class="el-icon-star-on"></i>用户分析</template>-->
        <!--<el-menu-item-group>-->
          <!--<el-menu-item index="3-1">-->
            <!--<router-link to="/Content/Users">用户属性</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3-2">-->
            <!--<router-link to="/Content/Map">地域分布</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3-3">-->
            <!--<router-link to="/Content/Terminal">终端分析</router-link>-->
          <!--</el-menu-item>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->
      <!--<el-submenu index="4">-->
        <!--<template slot="title"><i class="el-icon-document"></i>事件分析</template>-->
        <!--<el-menu-item-group>-->
          <!--<el-menu-item index="4-1">-->
            <!--<router-link to="/Content/BuriedPoint">埋点分析</router-link>-->
          <!--</el-menu-item>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->
      <!--<el-submenu index="5">-->
        <!--<template slot="title"><i class="el-icon-plus"></i>日志分析</template>-->
        <!--<el-menu-item-group>-->
          <!--<el-menu-item index="5-1">-->
            <!--<router-link to="/Content/Error">错误报告</router-link>-->
          <!--</el-menu-item>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->
    </el-menu>
    <div class="main">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import '../../assets/js/page/menu.js'
  import lockr from 'lockr'

  export default {
    data() {
      return {
          iconFont: {
              //动态拼接icon class 关键字
            Survey: 'sta-gaikuang',
            Basicindex: 'sta-jibenzhibiao',
            UserAnalysis: 'sta-visitor',
            EventAnalysis: 'sta-shijianfenxi',
            LogAnalysis: 'sta-rizhifenxi',
            Manage: 'sta-xitongguanli',
            LogMan:'sta-rizhi',
            MemberMan: 'sta-huiyuanguanli',
            ContentMan: 'sta-neirongguanli'
          }
//        options: {
//            survey : {
//              menuName: survey
//            },
//            active : {
//                menuName: active,
//                children:{
//                }
//            }
//        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      menuList(){
        let objTemp = {}
        this.$store.commit('updateMenuInfo')
//        this.$store.state.menuInfo.forEach((item)=>{
//          objTemp[item.menuNameQp] = {}
//          objTemp[item.menuNameQp]["menuName"] = item.menuName
//          if(item.children){
//              objTemp[item.menuNameQp]["children"] = {}
//              item.children.forEach((list)=>{
//                objTemp[item.menuNameQp]["children"][list.menuNameQp] = list.menuName
//              })
//          }
//        })
//        this.$store.commit('updateMenuArr');
//        console.log(this.$store.state.menuInfo)
//        return objTemp
        return this.$store.state.menuInfo
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/menu.scss';
</style>

