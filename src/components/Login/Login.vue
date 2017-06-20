<template>
  <div class="login">

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueCookie from 'vue-cookie'
  Vue.use(VueCookie);

  export default {
      methods:{
          setCookie(name, value, day){
            var str = name + "=" + encodeURIComponent(value);
            const Days = day ? day : Services.cookiesExpires;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            str += ";expires=" + exp.toGMTString();
            document.cookie = str;
          },
          getCookie(name) {

          }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .content
    display: inline-block
    width: 90%
</style>
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
