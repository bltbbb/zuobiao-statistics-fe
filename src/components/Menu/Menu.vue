<template>
  <div class="menu-wrapper">
    <div class="col-sm-3 col-md-2 sidebar">
      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
          <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
              <div role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <router-link to="Survey"><span class="glyphicon glyphicon-th" aria-hidden="true"></span>概况</router-link><span class="sr-only">(current)</span>
              </div>
            </h4>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading" role="tab" id="headingTwo">
            <h4 class="panel-title">
              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <span class="glyphicon glyphicon-signal" aria-hidden="true"></span>基本指标
              </a>
            </h4>
          </div>
          <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="panel-body">
                    <ul class="nav nav-sidebar">
                        <li><a href="">趋势分析</a></li>
                        <li><a href="">活跃用户</a></li>
                        <li><a href="">留存用户</a></li>
                        <li><a href="">功能统计</a></li>
                    </ul>
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading" role="tab" id="headingThree">
            <h4 class="panel-title">
              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <span class="glyphicon glyphicon-education" aria-hidden="true"></span>用户分析
              </a>
            </h4>
          </div>
          <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div class="panel-body">
                    <ul class="nav nav-sidebar">
                        <li><a href="">用户属性</a></li>
                        <li><a href="">地域分布</a></li>
                        <li><a href="">终端分析</a></li>
                    </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <!--各级菜单对应组件渲染位置 即右侧内容-->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import '../../assets/js/page/menu.js'
  export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import '../../assets/css/page/menu.scss';
</style>

