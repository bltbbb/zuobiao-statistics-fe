<template>
  <div class="Survey content-box">
    <!--    {{msg}}-->
    <!--  第一部分-->
    <div class="part1">
      <ul class="first-top">
        <li v-for="item in list">
          <div class="top-title">{{item.title}}
            <el-popover
              placement="bottom"
              v-bind:title="item.message"
              width="200"
              trigger="hover">
              <i class="el-icon-information" slot="reference"></i>
            </el-popover>

          </div>
          <h1>{{item.number}}</h1>
        </li>
      </ul>
    </div>
    <!--  第二部分-->
    <div class="all">
      <!-- 平台切换-->
      <el-tabs type="border-card">
        <el-tab-pane  v-for="gameName in gameNames">
          <span slot="label"><i class="el-icon-date"></i> {{gameName}}</span>
          <div class="box">
            <div class="box-list" v-for="dataList in dataLists">
              <div class="">{{dataList.title}}</div>
              <div class="">{{dataList.today}}</div>
              <div class="">{{dataList.yday}}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
<!--      <ul>
        <li class="collection-item"
            v-for="gameName in gameNames"
            @click="selected(gameName)"
            :class="{active: activeName == gameName}">{{gameName}}
        </li>
      </ul>-->
    </div>
    <!-- 平台对应数据-->

    <template>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </template>
    <div id="myChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/line');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    data () {
      return {
        // 第一部分
        list: [
          {id: "1", title: "累积用户", message: 'Foo', number: "8096798"},
          {id: "2", title: "过去7天活跃用户", message: 'Bar', number: "8096798"},
          {id: "3", title: "过去30天活跃用户", message: 'Bar', number: "8096798"}
          /*     {title: "过去7天平均日使用时长", message: 'Bar', number: "8096798"}*/
        ],
        // 平台切换
        gameNames: ['全平台', 'IOS端', '安卓端', 'PC端', 'WEB端'],
        activeName: '全平台',
        // 平台对应数据-->
        dataLists: [
          {title: "", today: "今日", yday: "昨日"},
          {title: "注册用户", today: "333", yday: "333"},
          {title: "登录用户", today: "1111", yday: "33"},
          {title: "登录次数", today: "3", yday: "3"},
          {title: "人均登录次数", today: "3", yday: "3"}
        ],
        options: [{
          value: '1',
          label: '今天'
        }, {
          value: '2',
          label: '明天'
        }],
        value: '1'
      }

    }
  ,
  // 平台图表格-->
  mounted()
  {
    this.drawLine();
  }
  ,
  methods: {
    selected: function (gameName) {
      this.activeName = gameName
    }
  ,
    // 图表格绘制
    drawLine()
    {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        title: {text: '全平台注册用户'},
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今天', '昨天']
        },
        xAxis: {
          data: ["0:00-0:59", "0:00-0:59", "0:00-0:59", "0:00-0:59", "0:00-0:59", "0:00-0:59"]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '注册用户',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]

      });
      window.onresize = myChart.resize;
    }
  }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import '../../assets/css/page/index.scss';
</style>
