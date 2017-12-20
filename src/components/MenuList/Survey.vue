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
          <el-tab-pane v-for="gameName in gameNames" :key="gameName.id+''" :name="gameName.id+''">
            <span slot="label"><i class="el-icon-date"></i> {{gameName.name}}</span>
              <div class="box" :key="gameName.id+''">
                <div class="headText">
                  <p class="slot"></p>
                  <p>昨日</p>
                  <p>前日</p>
                </div>
                <div class="box-list" v-for="data in platData" @click="choice(data.id)" :class="{active:type == data.id}">
                  <div class="" name="first">{{data.title}}</div>
                  <div class=""  name="second">{{data.yday}}</div>
                  <div class=""  name="third">{{data.eveday}}</div>
                </div>
              </div>
          </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 平台对应数据-->
      <div class="select-box">
        <el-select v-model="dateVal" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.select"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
    <div id="myChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/line');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  import lockr from 'lockr'
  export default {
    data () {
      return {
        explain: '这是菜单的说明文字',
        // 第一部分
        list: [
            {number:"0",id:"1",title:"累计用户",message:"Bar"},
            {number:"0",id:"2",title:"过去7天活跃用户",message:"BAR"},
            {number:"0",id:"3",title:"过去30天活跃用户",message:"BAR"}
            ],
        // 平台切换
        gameNames: [],
        options: [
          {key:'1',select:'昨天'},
          {key:'2',select:'最近7天'},
          {key:'3',select:'最近30天'},
          {key:'4',select:'最近60天'}
        ],
        platData: [
          {id:1,title:"新增用户",yday:"0",eveday:"0"},
          {id:2,title:"启动用户",yday:"0",eveday:"0"},
          {id:3,title:"启动次数",yday:"0",eveday:"0"},
          {id:4,title:"次日留存率",yday:"0",eveday:"0"},
        ],
        dateVal: '1',
        activeName:"-1",
        myChart: null,
        start: '',
        end: '',
        token: '',
        chartData: [],
        chartName: ['新增用户','启动用户','启动次数','次日留存率'],
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
        this.myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        this.myChart.setOption({
          title: {
              text: '新增用户',
              x: 'center',
              top: '0'
          },
          grid: {
            top: 80
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '新增用户',
            type: 'line',
            data: [],
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
        window.onresize = this.myChart.resize;
      },
      //平台内数据
      choice:function(value){
          this.type = value;
          this.myChart.setOption({
            title: {
              text: this.chartName[value-1]
            },
            xAxis: {
              data: this.chartData[value-1].x
            },
            series: [{
              // 根据名字对应到相应的系列
              name: this.chartName[value-1],
              data: this.chartData[value-1].y
            }]
          })
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        //初始化事件段
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        this.start = start.Format("yyyy-M-d");
        this.end = date.Format("yyyy-M-d");
        this.token = this.$cookie.get('adoptToken');
      },
      init:function () {
        //参数
        this.$http.get(this.$store.state.domain+'/getTotalSurvey',{
          params:{
            adoptToken:this.token
          }
        }).then((res)=>{
            if(res.data.status == 0){
              this.list[0].number = res.data.result.result[0].userCount;
              this.list[1].number = res.data.result.result[0].weekUserCount;
              this.list[2].number = res.data.result.result[0].monthUserCount;
            }
            else if(res.data.status == 0){
              this.$message.error(res.data.result.result.message);
            }else {
              //view(res.data.msg)
              this.$message.error('登录过期，请重新登录');
              lockr.rm("menuInfo");
              this.$cookie.delete('adoptToken');
              this.$router.push('/login');
            }
        },(err)=>{
            //view('网络错误')
          this.$message.error('网络错误');
        });

        this.$http.get(this.$store.state.domain+'/getPlatform',{
            params:{
              adoptToken:this.token
            }
        }).then((res)=>{
            this.gameNames = res.data.result.result;
        })

        this.getFullPlat();

        this.getData()
      },
      getData:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.activeName);

        //初始化this.chartData
        this.chartData = [];

        this.$http.post(this.$store.state.domain+'/getDateNumber',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.chartData.push(data.registerUserCount);
            this.chartData.push(data.signinUserCount);
            this.chartData.push(data.signinTimesCount);
            this.chartData.push(data.nextRemainsRate);
            this.myChart.setOption({
              xAxis: {
                data: this.chartData[0].x
              },
              series: [{
                // 根据名字对应到相应的系列
                name: this.chartName[0],
                data: this.chartData[0].y
              }]
            })
            this.type = 1;
          }
          else{
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      getFullPlat(){
        this.$http.get(this.$store.state.domain+'/getFullPlatform',{
          params:{
            adoptToken:this.token,
            platformId:this.activeName
          }
        }).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.platData[0].yday = data[0].registerUserCount;
            this.platData[0].eveday = data[1].registerUserCount;
            this.platData[1].yday = data[0].signinUserCount;
            this.platData[1].eveday = data[1].signinUserCount;
            this.platData[2].yday = data[0].signinTimesCount;
            this.platData[2].eveday = data[1].signinTimesCount;
            this.platData[3].yday = data[0].nextRemainsRate;
            this.platData[3].eveday = data[1].nextRemainsRate;
          }
          else{
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        });
      }
    }
    ,
    computed: {
      dateSelect(){
        let date = new Date();
        let start = new Date();
        if (this.dateVal == "1") {
          start.setTime(date.getTime() - 3600 * 1000 * 24);
          return [start, start];
        }
        else if (this.dateVal == "2") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 1);
          return [start, date];
        }
        else if (this.dateVal == "3") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 1);
          return [start, date];
        }
        else if (this.dateVal == "4") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 1);
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
      activeName: function (val) {
        //异步请求数据
        this.getData();
        this.getFullPlat();
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
      .el-select {
        float: left;
      }
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
