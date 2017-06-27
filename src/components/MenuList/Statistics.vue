<!--功能统计-->
<template>
  <div class="statistics content-box">
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
            <el-col :span="6" v-for="item in list" :key="item.id">
              <div class="grid-content bg-purple">
                <div class="top-title">{{item.title}}
                  <h2><span>{{item.name}}</span> {{item.number}}</h2>
                  <h2><span>{{item.names}}</span> {{item.numbers}}</h2>
          <!--        <el-popover
                    placement="bottom"
                    v-bind:title="item.message"
                    width="200"
                    trigger="hover">
                    <i class="el-icon-information" slot="reference"></i>
                  </el-popover>-->
                </div>

              </div>
            </el-col>

          </el-row>
        </div>
      </div>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>

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
          {id: "1", title: "单聊",name:"消息数",names:"", message: 'Foo', number: "8096798", numbers: ""},
          {id: "2", title: "单聊-短语音",name:"消息数",names:"时长", message: 'Foo', number: "8096798", numbers: "8096798"},
          {id: "3", title: "单聊-图片",name:"图片数",names:"", message: 'Foo', number: "8096798", numbers: ""},
          {id: "4", title: "单聊-短视频",name:"消息数",names:"时长", message: 'Foo', number: "8096798", numbers: "8096798"},
          {id: "5", title: "单聊-文件",name:"文件个数",names:"文件大小", message: 'Foo', number: "8096798", numbers: "8096798"},
          {id: "6", title: "单聊-语音通话",name:"消息数",names:"时长", message: 'Foo', number: "8096798", numbers: "8096798"},
          {id: "7", title: "单聊-视频通话",name:"消息数",names:"时长", message: 'Foo', number: "8096798", numbers: "8096798"}
        ],
        radio2: 1
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
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/statistics.scss';
</style>
