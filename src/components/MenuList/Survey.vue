<template>
  <div class="Survey content-box">
    <div class="header-wrapper"><h1>趋势分析</h1></div>
    <!--    {{msg}}-->
    <!--  第一部分-->
    <div class="part1">
      <el-row :gutter="20">
        <el-col :span="8"  v-for="item in list" :key="item.id"><div class="grid-content bg-purple">
          <div class="top-title">{{item.title}}
            <el-popover
              placement="right"
              v-bind:title="item.message"
              width="200"
              trigger="hover">
              <div class="content">{{item.content}}</div>
              <i class="el-icon-information" slot="reference"></i>
            </el-popover>
          </div>
          <h1>{{item.number}}</h1>
        </div></el-col>

      </el-row>

    </div>
    <!--  第二部分-->
    <div class="all">
      <!-- 平台切换-->
      <el-tabs type="border-card" v-model="activeId">
        <el-tab-pane v-for="gameName in gameNames" :key="gameName.id" :name="gameName.id" >
          <span slot="label"><i class="el-icon-date"></i> {{gameName.plat}}</span>
          <div class="box">
            <div class="box-list" v-for="dataList in dataLists">
              <div class="">{{dataList.title}}</div>
              <div class="">{{dataList.today}}</div>
              <div class="">{{dataList.yday}}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 平台对应数据-->
      <div class="select-box">
        <el-select v-model="dateSelect" placeholder="请选择">
          <el-option
            v-for="select in options"
            :key="select.value"
            :label="select.label"
            :value="select.value">
          </el-option>
        </el-select>
      </div>
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
  require('echarts/lib/component/legend');
  export default {
    data () {
      return {
        activeId: '3',
        // 第一部分
        list: [
          {id: "1", title: "累积用户", message: 'Foo', number: "8096798", content: "我是累积用户的说明"},
          {id: "2", title: "过去7天活跃用户", message: 'Bar', number: "8096798", content: "我是过去7天活跃用户的说明"},
          {id: "3", title: "过去30天活跃用户", message: 'Bar', number: "8096798", content: "我是过去30天活跃用户的说明"}
        ],
        // 平台切换
        gameNames: [{id: "1", plat: '全平台', name: "All"},
          {id: "2", plat: '安卓端', name: "Android"},
          {id: "3", plat: 'PC端', name: "PC"},
          {id: "4", plat: 'WEB端', name: "WEB"}
        ],
        plat: '全平台',
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
        dateSelect: '1'
      }

    }
    ,
    // 平台图表格-->
    mounted()
    {
      this.drawLine();
    }
    ,
    watch: {
      activeId:function () {
          //平台切换异步操作
          console.log(this.activeId)
        },
        dateSelect:function () {
          //date切换异步操作
          console.log(this.dateSelect)
        }
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
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/index.scss';

  .Survey.content-box {
    background: #fff;
    overflow: hidden;
    margin-top: 40px;
    .part1 {
      box-sizing: border-box;
      padding: 20px;
    }
    .all {
      box-sizing: border-box;
      padding: 20px;
    }
    .select-box {
      box-sizing: border-box;
      padding: 20px;
    }
    .chart {
      box-sizing: border-box;
      padding: 20px;
    }
  }
</style>
