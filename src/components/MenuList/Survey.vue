<template>
  <div class="Survey content-box">
    <div class="header-wrapper">
      <h1>
        概况
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
    <!--    {{msg}}-->
    <!--  第一部分-->
    <div class="part1">
      <el-row :gutter="20">
        <el-col :span="8"  v-for="item in list" :key="item.id"><div class="grid-content bg-purple">
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
        </div></el-col>

      </el-row>

    </div>
    <!--  第二部分-->
    <div class="all">
      <!-- 平台切换-->
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane v-for="gameName in gameNames" :key="gameName.id" :name="gameName.id">
          <span slot="label"><i class="el-icon-date"></i> {{gameName.plat}}</span>
          <div class="box">
            <div class="box-list" v-for="dataList in dataLists" @click="choice(dataList.$index, dataList.id)">
              <div class="" name="first">{{dataList.title}}</div>
              <div class=""  name="second">{{dataList.today}}</div>
              <div class=""  name="third">{{dataList.yday}}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 平台对应数据-->
      <div class="select-box">
        <el-select v-model="dateVal" placeholder="请选择">
          <el-option
            v-for="(select,key) in options"
            :key="key"
            :label="select"
            :value="key">
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
        explain: '这是菜单的说明文字',
        // 第一部分
        list: {},
        // 平台切换
        gameNames: [],
        // 平台对应数据-->
        dataLists: [
          {title: "", today: "今日", yday: "昨日"},
          {id:"1",title: "注册用户", today: "333", yday: "333"},
          {id:"2",title: "登录用户", today: "1111", yday: "33"},
          {id:"3",title: "登录次数", today: "3", yday: "3"},
          {id:"4",title: "人均登录次数", today: "3", yday: "3"}
        ],
        options: {},
        dateVal: '1',
        activeName:"1",
        start: '',
        end: '',
        token: ''
      }
    }
    ,
    // 平台图表格-->
    mounted()
    {
      this.drawLine();
      this.initParams();
      this.init();
    }
    ,
    methods: {
      // 图表格绘制
      drawLine()
      {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          title: {
              text: '全平台注册用户',
              x: 'center',
              top: '0'
          },
          grid: {
            top: 80
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['今天', '昨天']
          },
          xAxis: {
            data: ["11","12","13","15","5"]
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '注册用户',
            type: 'line',
            data: [5,10,56,0,6],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(122, 143, 224,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(122, 143, 224,0.2)'
                }], false)
              }
            },
            itemStyle: {
              normal: {
                color: '#7a8fe0'
              }
            }
          }]

        });
        window.onresize = myChart.resize;
      },
      choice:function(row,value){
         console.log(value)
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

        this.start = start;
        this.end = date;
      },
      init:function () {
        //参数
        this.token = this.$cookie.get('adoptToken');

        this.$http.get('http://192.168.1.201:9999/getTotalSurvey',{
          params:{
            adoptToken:this.token
          }
        }).then((res)=>{
            if(res.data.status == 0){
              this.list = res.data.result.result
            }
            else{
              //view(res.data.msg)
              alert(res.data.msg)
            }
        },(err)=>{
            //view('网络错误')
            alert('网络错误')
        })

        this.$http.get('http://192.168.1.201:9999/getFullPlatform',{
          params:{
            adoptToken:this.token
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.gameNames = res.data.result.result.gameNames
            this.options = res.data.result.result.day
          }
          else{
            //view(res.data.msg)
            alert(res.data.msg)
          }
        },(err)=>{
          //view('网络错误')
          alert('网络错误')
        })

        this.getDate( this.start.Format("yyyy-M-d"),this.end.Format("yyyy-M-d") )
      },
      getDate:function (start,end) {
        let tokenParams = new URLSearchParams();
        tokenParams.append('adoptToken', this.token);
        tokenParams.append('startDate', start);
        tokenParams.append('stopDate', end);
        tokenParams.append('type', 1);  //careful！

        this.$http.post('http://192.168.1.201:9999/getDateNumber',tokenParams).then((res)=>{
          if(res.data.status == 0){
            let myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption({
              xAxis: {
                data: res.data.result.result.x
              },
              series: [{
                // 根据名字对应到相应的系列
                data: res.data.result.result.y
              }]
            })
          }
          else{
            //view(res.data.msg)
            alert(res.data.msg)
          }
        },(err)=>{
          //view('网络错误')
          alert('网络错误')
        })
      }
    }
    ,
    computed: {
      dateSelect(){
        let date = new Date();
        let start = new Date();
        if (this.dateVal == "1") {
          return [new Date(), new Date()];
        } else if (this.dateVal == "2") {
          start.setTime(date.getTime() - 3600 * 1000 * 24);
          return [start, start];
        }
        else if (this.dateVal == "3") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, date];
        }
        else if (this.dateVal == "4") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, date];
        }
        else if (this.dateVal == "5") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
          return [start, date];
        }
      }
    },
    watch:{
      dateSelect:function () {
        //异步请求数据
        this.start = this.dateSelect[0].toLocaleDateString();
        this.end = this.dateSelect[1].toLocaleDateString();
      },
      activeName: function (val) {
        console.log(val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/index.scss';
  .Survey {
    margin-top: 40px;
    background: #fff;
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
      padding: 0 20px;
      margin-top: 0;
    }
  }
</style>
