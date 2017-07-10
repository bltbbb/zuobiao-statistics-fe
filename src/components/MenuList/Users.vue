<!--用户属性-->
<template>
  <div class="Users content-box">
    <div class="header-wrapper">
      <h1>
        用户属性
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
      <Calendar @timeValue="getTime"></Calendar>
      <div class="title-select-box">
        <el-select v-model="platVal" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.value"
            :label="plat.label"
            :value="plat.value">
          </el-option>
        </el-select>
        <el-select v-model="canalVal" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
          </el-option>
        </el-select>
        <el-select v-model="evalVal" placeholder="版本">
          <el-option
            v-for="edition in editions"
            :key="edition.Eval"
            :label="edition.label"
            :value="edition.Eval">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="top-wrapper">
        <div id="sexRatio"></div>
        <div id="ageChart"></div>
      </div>
      <div id="industry"></div>
    </div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入饼图组件
  require('echarts/lib/chart/pie');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  import Calendar from '@/components/calendar/Calendar'

  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
        select: "",
        platVal: '1',
        canalVal: '1',
        evalVal: '1',
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
        canals: [{
          val: '1',
          label: '全部渠道'
        }],
        editions: [{
          Eval: '1',
          label: '全部版本'
        },
          {
            Eval: '2',
            label: '1.4'
          }],
        sexOptions: {
          title:{
              text: '性别比例',
              x: 'center',
              y: 'top'
          },
          tooltip: {
            trigger: 'item',
            formatter: "比例 <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data:['男','女'],
            formatter: "{name}"
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outer',
                  textStyle: {
                      fontSize: '24'
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 40
                }
              },
              data:[
                {value:68, name:'男'},
                {value:45, name:'女'}
              ]
            }
          ],
          color:['#009999', '#FF9999']
        },
        ageOptions: {
          title:{
            text: '年龄分布',
            x: 'center',
            y: 'top'
          },
          tooltip: {
            trigger: 'item',
            formatter: "<div style='padding: 3px 6px'><span style='display: inline-block;width: 10px;height: 10px;border-radius:50%;background: #009999;margin-right: 5px';></span>{b}:<br/> <span style='padding-left:15px;padding-top: 10px'>{c}%</span></div>"
          },
          xAxis: {
            axisTick: {show: false},
            axisLabel: {
              formatter: 'barGap: \'-100%\''
            },
            show: false
          },
          yAxis: {
            data: ['18岁以下', '18-24岁', '25-34岁', '35-44岁', '45-54岁', '55-64岁', '65岁以上'],
            splitLine: {show: false},
            axisLabel: {
              formatter:'{value}',
              margin: 10
            },
            axisLine: {show: false},
            axisTick: {show: false},
          },
          animationDurationUpdate: 1200,
          series: [{
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ddd'
              }
            },
            silent: true,
            barWidth: 19,
            barGap: '-100%', // Make series be overlap
            data: [100, 100, 100, 100, 100, 100, 100]
          }, {
            type: 'bar',
            barWidth: 20,
            z: 10,
            itemStyle: {
              normal: {
                color: '#009999'
              }
            },
            label:{
              normal:{
                show: true,
                position: 'insideBottomRight',
                formatter: '{c}%',
                textStyle: {
                  color: '#e1e1e1'
                }
              }

            },
            data: [45, 60, 13, 25, 35, 15, 30]
          }]
        },
        indOptions:{
          title:{
            text: '行业分布',
            x: 'center',
            y: 'top'
          },
          tooltip: {
            trigger: 'item',
            formatter: "<div style='padding: 3px 6px'><span style='display: inline-block;width: 10px;height: 10px;border-radius:50%;background: #009999;margin-right: 5px';></span>{b}:<br/> <span style='padding-left:15px;padding-top: 10px'>{c}%</span></div>"
          },
          xAxis: {
            data: ['医药卫生', '金融保险', 'IT通信电子', '教育', '社会公共管理', '能源采矿化工', '建筑房地产', '机械制造', '住宿旅游', '广告营销'],
            axisTick: {show: false},
            axisLabel: {
              formatter:'{value}',
              margin: 20,
              interval: 0
            },
            axisLine: {show: false},
          },
          yAxis: {
            show: false,
            splitLine: {show: false},
            axisLabel: {
              formatter:'{value}',
              margin: 20
            },

            axisTick: {show: false},

          },
          animationDurationUpdate: 1200,
          series: [{
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ddd'
              }
            },
            silent: true,
            barWidth: 40,
            barGap: '-100%', // Make series be overlap
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          }, {
            type: 'bar',
            barWidth: 40,
            z: 10,
            itemStyle: {
              normal: {
                color: '#009999'
              }
            },
            label:{
              normal:{
                show: true,
                position: 'insideTopRight',
                formatter: '{c}%',
                textStyle: {
                  color: '#eeeeee'
                }
              }
            },
            data: [45, 60, 13, 25, 35, 15, 30, 35, 15, 30]
          }]
        }
      }
    },
    components:{
      Calendar
    },
    methods:{
      //获取日历时间
      getTime(msg){
        console.log(msg)
      },
      drawLine(){
        let sexChart = echarts.init(document.getElementById('sexRatio'));
        sexChart.setOption(this.sexOptions)

        let ageChart = echarts.init(document.getElementById('ageChart'));
        ageChart.setOption(this.ageOptions)

        let indChart = echarts.init(document.getElementById('industry'));
        indChart.setOption(this.indOptions)

        window.onresize = indChart.resize;
      }
    },
    mounted(){
      this.drawLine()
    },
    watch: {
      platVal: function (val) {
        console.log(val)
      },
      evalVal: function (val) {
        console.log(val)
      },
      canalVal: function (val) {
        console.log(val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Users
    margin-top: 40px
    background: #fff
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
    .chart-wrapper
      margin-top: 20px
      width: 100%
      .top-wrapper
        height: 400px
        margin-bottom: 50px
        #sexRatio
          box-sizing: border-box
          float: left
          border-right: 1px solid #eeeeee
          padding: 20px 0 0 30px
          width: 50%
          height: 100%
        #ageChart
          box-sizing: border-box
          float: right
          padding: 20px 0 0 30px
          width: 50%
          height: 100%
      #industry
        border-top: 1px solid #eeeeee
        width: 100%
        height: 600px
        padding-top: 30px
</style>
