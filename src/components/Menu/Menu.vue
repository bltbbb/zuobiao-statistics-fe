<template>
  <div class="menu-wrapper">
    <el-menu unique-opened :default-active="activeIndex" class="el-menu-vertical-demo menu" @open="handleOpen" @close="handleClose" theme="dark">
      <div class="menu-div" v-for="(item,key1,index1) in menuList" :key="index1">
        <el-menu-item :index="item.alias" v-if="!item.children && !item.emptyFolder && !(item.isShare == 2)">
          <router-link :to="'/Content/'+item.alias" style="text-align: left"><i :class="'el-icon-'+iconFont[item.alias]"></i>{{item.menuName}}</router-link>
        </el-menu-item>
        <el-submenu :index="item.alias" v-if="item.children && !item.emptyFolder && !(item.isShare == 2)">
          <template slot="title"><i :class="'el-icon-'+iconFont[item.alias]"></i>{{item.menuName}}</template>
          <el-menu-item-group v-if="item.children && !item.emptyFolder && !(item.isShare == 2)" >
            <el-menu-item v-for="(list,key2,index2) in item.children"  :index="list.alias"  :key="index2" v-if="list.menuType != 3 && list.isShare != 2">
              <router-link :to="'/Content/'+list.alias">{{list.menuName}}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
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
          },
          activeIndex: 'Survey'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
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
      },
    },
    /*保持导航高亮*/
    beforeUpdate(){
      switch(this.$route.matched[1].name)
      {
        case 'ErrorDetail':
          this.activeIndex = 'Error'
          break;
        case 'DetailMore':
          this.activeIndex = 'Error'
          break;
        case 'RoleManDetail':
          this.activeIndex = 'RoleMan'
          break;
        case 'AnalysisRegister':
          this.activeIndex = 'BuriedPoint'
          break;
        default:
          this.activeIndex = this.$route.matched[1].name
      }
      lockr.set("activeIndex",this.activeIndex);
    },
    mounted(){
      this.$store.commit('updateActiveIndex')
      this.activeIndex = this.$store.state.activeIndex
    }
    /*保持导航高亮*/
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/menu.scss';
</style>

