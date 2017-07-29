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

import './assets/js/function/DateFormat'

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueCookie)
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
      //为方便开发 不启用验证token
      else {
        axios.post('http://192.168.1.32/isAuthenticated', tokenParams).then((res)=>{
          if(res.data.status == 1){
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          lockr.rm("menuInfo");
          this.$cookie.delete('adoptToken');
          console.log(err.data+'main.js');
          //this.$router.push('/login');
        })
      }
    }
  }
})


//路由跳转验证token是否有效
//1.axios 拦截器
//2.router.beforeEach
