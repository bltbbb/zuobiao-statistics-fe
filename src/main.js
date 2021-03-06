// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import VueCookie from 'vue-cookie'
import lockr from 'lockr'
import axios from 'axios'
import HighLight from './highLight/highLight'

import './assets/js/function/DateFormat'
import './assets/css/page/iconfont.css'

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(HighLight);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

//接口地址
const Interface = 'http://192.168.1.201:9999';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router,
  store,
//    //监听路由检查登录 跳转路由时执行
   watch:{
     "$route" : 'checkLogin'
   },
//    //进入页面时 验证是否登录
   created() {
     this.checkLogin();
   },
  methods: {
    checkLogin(){
      let tokenParams = new URLSearchParams();
      tokenParams.append('adoptToken', this.$cookie.get('adoptToken'));
      //检查是否存在Token
      if (!this.$cookie.get('adoptToken')) {
        //如果没有登录状态则跳转到登录页 并移除localstorege
        lockr.rm("menuInfo");
        this.$router.push('/login');
      }
      else {
        axios.post(this.$store.state.domain+'/isAuthenticated', tokenParams).then((res)=>{
          if(res.data.status == 1){
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          lockr.rm("menuInfo");
          this.$cookie.delete('adoptToken');
          this.$router.push('/login');
        })
      }
    }
  }
})
