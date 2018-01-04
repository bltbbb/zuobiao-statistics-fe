/**
 *@fileName:
 *@autor:baolingtao
 *@time:2017/6/22
 *@desc: Vuex 管理组件状态通信
 **/
import Vue from 'vue'
import lockr from 'lockr'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //domain:'http://192.168.1.21:9968', //保存后台请求的地址
    domain:'http://analysisapi.workinggo.com', //保存后台请求的地址
    //domain:'http://125.208.1.67:9968', //保存后台请求的地址
    //保存用户信息
    userInfo: [],
    //保存菜单信息
    menuInfo: [],
    menuArr: [],
    activeIndex: 'Survey'
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state) {
      state.userInfo = lockr.get('userInfo');
    },
    updateMenuInfo(state) {
      state.menuInfo = lockr.get('menuInfo');
    },
    updateMenuArr(state){
      state.menuArr = lockr.get('menuArr');
    },
    updateActiveIndex(state){
      state.activeIndex = lockr.get('activeIndex');
    }
  }
})
