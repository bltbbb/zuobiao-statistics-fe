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
    domain:'http://test.example.com', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
    userInfo: { //保存用户信息
      nick: null,
      ulevel: null,
      uid: null,
      portrait: null
    },
    menuInfo: {}
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    updateMenuInfo(state) {
      state.menuInfo = lockr.get('menuInfo')
    }
  }
})
