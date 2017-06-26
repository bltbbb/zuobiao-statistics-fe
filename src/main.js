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

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueCookie)
Vue.config.productionTip = false;

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
  methods:{

//  checkLogin 初步设计为验证cookie中是否储存了adoptToken值
//  此方法在安全上有漏洞 可改为在验证存在adoptToken后再验证token值是否当前有效
    checkLogin(){
      //检查是否存在Token
      if(!this.$cookie.get('adoptToken')){
        //如果没有登录状态则跳转到登录页
        this.$router.push('/login');
      }else{
        //否则跳转到登录后的页面
        this.$router.push('/Content/Survey');
        this.$cookie.delete('adoptToken')
      }
    }
  }
})


//路由跳转验证token是否有效
//1.axios 拦截器
//2.router.beforeEach
