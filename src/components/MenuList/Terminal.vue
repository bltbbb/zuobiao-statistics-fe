<!--终端分析-->
<template>
  <div class="Terminal content-box">
    <div class="header-wrapper">
      <h1>
        终端分析
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          popper-class="popover-class">
          <slot>{{explain}}</slot>
          <i class="el-icon-information" slot="reference"></i>
        </el-popover>
      </h1>
    </div>
    <div class="title-box">
      <Calendar></Calendar>
      <div class="title-select-box">
        <el-select v-model="value" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.value"
            :label="plat.label"
            :value="plat.value">
          </el-option>
        </el-select>
        <el-select v-model="val" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="radio-wrapper">
        <label class="raido-label">选择终端属性</label>
        <el-radio-group v-model="radioValue">
          <el-radio label="0">设备型号</el-radio>
          <el-radio label="1">操作系统</el-radio>
          <el-radio label="2">运营商</el-radio>
          <el-radio label="3">联网方式</el-radio>
        </el-radio-group>
    </div>
    <div class="user-wrapper">
      <div class="user-box">
        <h1>累计登录用户数</h1>
        <span>8765182</span>
      </div>
    </div>
    <div class="chart-wrapper">
      <div id="chart-content"></div>
    </div>
    <div class="raido2-wrapper">
      <el-radio-group v-model="radioValue2">
        <el-radio label="0">累计登陆用户数</el-radio>
      </el-radio-group>
    </div>
    <div class="tabel-wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="设备型号" width="180" label-class-name="headerName1" class-name="bodyName1">
        </el-table-column>
        <el-table-column prop="number" label="累计登录次数" width="180" label-class-name="headerName" class-name="bodyName">
        </el-table-column>
        <el-table-column prop="percentage1" label="累计登录次数占比" label-class-name="headerName" class-name="bodyName">
        </el-table-column>
        <el-table-column prop="percentage2" label="累计注册用户占比" label-class-name="headerName" class-name="bodyName">
        </el-table-column>
        <el-table-column prop="percentage3" label="累计登录用户占比" label-class-name="headerName" class-name="bodyName">
        </el-table-column>
      </el-table>
    </div>
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
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
        plats: [{
          value: '1',
          label: '全部平台'
        }, {
          value: '2',
          label: 'iOS'
        },
          {
            value: '3',
            label: 'Android'
          },
          {
            value: '4',
            label: 'PC'
          },
          {
            value: '5',
            label: 'web'
          }
        ],
        value: '1',
        canals: [{
          val: '1',
          label: '全部渠道'
        }],
        val: '1',
        radioValue: '0',
        radioValue2: '0',
        options:{
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : {
            type: 'value',
            axisLabel: {
              formatter: '{value} /次'
            }
          },
          series : {
              top: 'top',
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[1000, 4100, 200, 300, 900, 300, 200, 900, 300, 2020]
            }
        },
        tableData: [
          {type:"iPhone 4s",number:"3212",percentage1:"12.25%",percentage2:"12.25%",percentage3:"12.25%"},
          {type:"iPhone 4s",number:"3212",percentage1:"12.25%",percentage2:"12.25%",percentage3:"12.25%"},
          {type:"iPhone 4s",number:"3212",percentage1:"12.25%",percentage2:"12.25%",percentage3:"12.25%"},
          {type:"iPhone 4s",number:"3212",percentage1:"12.25%",percentage2:"12.25%",percentage3:"12.25%"},
          {type:"iPhone 4s",number:"3212",percentage1:"12.25%",percentage2:"12.25%",percentage3:"12.25%"}
        ]
      }
    },
    components:{
      Calendar
    },
    methods: {
      drawLine(){
          let myChart = echarts.init(document.getElementById('chart-content'))
          myChart.setOption(this.options)

          window.onresize = myChart.resize;
      }
    },
    mounted(){
      this.drawLine()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Terminal
    margin-top: 40px
    background: #fff
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
    .radio-wrapper
      padding-top: 30px
      text-align: center
      .raido-label
        padding-right: 15px
        font-size: 14px
        color: #1f2d3d
    .user-wrapper
      padding: 30px 20px
      .user-box
        text-align: center
        padding: 20px 16px
        background: #009999
        color: #fff
        border-radius: 4px
        font-size: 16px
    .chart-wrapper
      padding: 0 20px 20px 20px
      #chart-content
        width: 100%
        height: 500px
    .raido2-wrapper
      text-align: center
    .tabel-wrapper
      padding: 20px

</style>
<style lang="sass">
  .headerName
    padding: 0 10px
    text-align: right
  .bodyName
    padding: 0 10px
    text-align: right
</style>
