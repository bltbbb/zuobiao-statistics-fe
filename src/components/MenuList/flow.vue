<!--功能统计-->
<template>
  <div class="Message">
    <div class="header-wrapper"><h1>功能统计<i class="el-icon-information"></i></h1></div>
    <div class="title-box">
      <el-radio-group v-model="chatType" class="chat">
        <el-radio-button label="单聊"></el-radio-button>
        <el-radio-button label="群聊"></el-radio-button>
      </el-radio-group>
      <Calendar @timeValue="getTime"></Calendar>
      <div class="title-select-box">
        <el-select v-model="value" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.value"
            :label="plat.label"
            :value="plat.value">
          </el-option>
        </el-select>
        <el-select v-model="Eval" placeholder="版本">
          <el-option
            v-for="edition in editions"
            :key="edition.Eval"
            :label="edition.label"
            :value="edition.Eval">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="trend-box">
      <div class="part1">
        <div class="part1">
          <el-row :gutter="20">
            <el-col :span="12" v-for="item in list" :key="item.id">
              <div class="grid-content bg-purple">
                <div class="top-title"><span class="title">{{item.title}}</span>
                  <h2><span style="padding-right: 10px;">{{item.name}}</span> <span style="font-weight: bold;">{{item.number}}</span></h2>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <div class="checkbox-wrapper"><el-checkbox v-model="checked">按平台拆分</el-checkbox></div>
    </div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入折现图组件
  require('echarts/lib/chart/line');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        chatType:"单聊",
        plats: [{
          value: '1',
          label: '全平台'
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
        editions: [{
          Eval: '1',
          label: '全部版本'
        },
          {
            Eval: '2',
            label: '1.4'
          }],
        Eval: "1",
        // 第一部分
        list: [
          {id: "1", title: "群聊上行消息数",name:"昨日", number: "8096798"},
          {id: "2", title: "群聊下行消息数",name:"昨日", number: "8096798"}
        ],
        radio2: 1,
        checked: true
      }
    }
    ,
    // 平台图表格-->
    mounted()
    {
      this.drawLine();
    }
    ,
    components: {
      Calendar
    },
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      }
      ,
      // 图表格绘制
      drawLine()
      {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('TendChart'));
        // 绘制图表
        myChart.setOption({
          title: {text: '群聊上行消息数'},
          legend: {
            show: true,
            data: ['所有平台']
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: ["5月15日", "5月18日","5月21日","5月24日","5月27日","5月30日","6月2日","6月5日","6月8日","6月11日"]
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '所有平台',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 10, 10, 20, 13],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(199, 237, 250,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(199, 237, 250,0.2)'
                }], false)
              }
            },
            itemStyle: {
              normal: {
                color: '#58c8da'
              }
            }
          }]

        });
        window.onresize = myChart.resize;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //获取日历时间
      getTime(msg){
        console.log(msg)
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Message
    margin-top: 40px
    background: #fff
    .header-wrapper
      padding: 10px
      background: #f0f0f0
      h1
        color: #000
        font-size: 18px
        i
          display: inline-block
          padding-left: 7px
          color: #9d9d9d
          font-size: 16px
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
      .chat
        float: left
        margin-right: 10px
    .trend-box
      padding: 20px
      .part1
        .el-col
          color: #fff
          font-size: 14px
          &:nth-of-type(1)
            .bg-purple
              background: #8a65ce
          &:nth-of-type(2)
            .bg-purple
              background: #ff8264
          .bg-purple
            text-align: center
            padding: 20px 16px
            border-radius: 4px
            min-height: 60px
            .title
              display: inline-block
              font-size: 16px
              padding-bottom: 10px
      .checkbox-wrapper
        padding-top: 30px
        text-align: center

</style>
