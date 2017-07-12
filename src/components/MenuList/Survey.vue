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
          <el-tab-pane v-for="gameName in gameNames" :key="gameName.pid" :name="gameName.pid">
            <span slot="label"><i class="el-icon-date"></i> {{gameName.plat}}</span>
              <div class="box" :key="gameName.pid">
                <div class="headText">
                  <p class="slot"></p>
                  <p>今日</p>
                  <p>昨日</p>
                </div>
                <div class="box-list" v-for="data in gameName.dataNum" @click="choice(data.id)" :class="{active:type == data.id}">
                  <div class="" name="first">{{data.title}}</div>
                  <div class=""  name="second">{{data.today}}</div>
                  <div class=""  name="third">{{data.yday}}</div>
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
        options: {},
        dateVal: '1',
        activeName:"1",
        start: '',
        end: '',
        token: '',
        type: 1
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
      choice:function(value){
         this.type = value;
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

        this.start = start.Format("yyyy-M-d");
        this.end = date.Format("yyyy-M-d");
        this.token = this.$cookie.get('adoptToken');
      },
      init:function () {
        //参数

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

        this.getData()
      },
      getData:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('type', this.type);
        Params.append('PlatformId', this.activeName);

        this.$http.post('http://192.168.1.201:9999/getDateNumber',Params).then((res)=>{
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
        //格式化时间
        this.start = this.dateSelect[0].Format("yyyy-M-d");
        this.end = this.dateSelect[1].Format("yyyy-M-d");

        //异步请求数据
        this.getData();
      },
      activeName: function () {
        //异步请求数据
        this.getData();
      },
      type: function () {
        //异步请求数据
        this.getData();
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
      .box {
        box-sizing: border-box;
        padding: 10px 10px 0 30px;
        .headText {
          float: left;
          width: 10%;
          p {
            line-height:30px;
            &.slot {
              width:100%;
              height:30px;
            }
          }
        }
        .box-list {
          box-sizing: border-box;
          cursor: pointer;
          padding-bottom:10px;
          text-align: center;
          transition: color 0.3s;
          &.active {
            color: #4676f8;
            border-bottom: 2px solid #4676f8;
          }
        }
      }
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

  /*动画*/
  .fade-in-enter-active {
    transition: all .8s ease;
  }
  .fade-in-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-in-enter, .slide-fade-leave-active {
    transform: translateY(50px);
    opacity: 0;
  }

</style>
