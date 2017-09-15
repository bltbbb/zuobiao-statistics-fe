<!--功能统计-->
<template>
  <div class="statistics content-box">
    <div class="header-wrapper">
      <h1>
        功能统计
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
      <el-radio-group v-model="chatType" class="chat">
        <el-radio-button :label="1">单聊</el-radio-button>
        <el-radio-button :label="2">群聊</el-radio-button>
      </el-radio-group>
      <Calendar @timeValue="getTime"></Calendar>
      <div class="title-select-box">
        <el-select v-model="platVal" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.id+''"
            :label="plat.name"
            :value="plat.id+''">
          </el-option>
        </el-select>
        <el-select v-model="evalVal" placeholder="版本">
          <el-option
            v-for="edition in editions"
            :key="edition.id+''"
            :label="edition.name"
            :value="edition.id+''">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="trend-box">
      <div class="part1">
        <div class="part1">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in list" :key="index">
              <div class="grid-content bg-purple" @click="tabSwitch(index)">
                <div class="top-title">{{item.name}}
                  <h2><span>{{item.newsName}}</span> <span>{{item.newsCount}}</span></h2>
                  <h2 v-if="item.timeName"><span>{{item.timeName}}</span> <span>{{item.timeCount}}</span></h2>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <div class="radio-box">
        <el-radio-group v-model="radioVal" v-if="showRadio">
          <el-radio v-for="(item,key) in radioName" :label="key" :key="key">{{item}}</el-radio>
        </el-radio-group>
      </div>
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
          value: '-1',
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
        editions: [{
          Eval: '-1',
          label: '全部版本'
        },
          {
            Eval: '2',
            label: '1.4'
          }],
        // 第一部分
        list: [
          {id: "1", title: "单聊",name:"消息数",names:"", number: "8096798", numbers: ""},
          {id: "2", title: "单聊-短语音",name:"消息数",names:"时长", number: "8096798", numbers: "8096798"},
          {id: "3", title: "单聊-图片",name:"图片数",names:"", number: "8096798", numbers: ""},
          {id: "4", title: "单聊-短视频",name:"消息数",names:"时长", number: "8096798", numbers: "8096798"},
          {id: "5", title: "单聊-文件",name:"文件个数",names:"文件大小", number: "8096798", numbers: "8096798"},
          {id: "6", title: "单聊-语音通话",name:"消息数",names:"时长", number: "8096798", numbers: "8096798"},
          {id: "7", title: "单聊-视频通话",name:"消息数",names:"时长", number: "8096798", numbers: "8096798"}
        ],
        myChart: null,
        platVal: '-1',
        evalVal: '-1',
        canalVal: '-1',
        start: '',
        end: '',
        token: '',
        chatType: '1',
        chartData: [],
        seriesName: '',
        radioVal: 'news',
        showRadio: false,
        radioData: [],
        radioName: {
            news: '消息数',
            size: '时长'
        }
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
        this.myChart = echarts.init(document.getElementById('TendChart'));
        // 绘制图表
        this.myChart.setOption({
          title: {text: '全平台注册用户'},
          tooltip: {
            trigger: 'axis'
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
            data: [5, 20, 36, 10, 10, 20],
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //获取日历时间
      getTime(date){
        this.start = date[0].Format("yyyy-M-d");
        this.end = date[1].Format("yyyy-M-d");
        this.getFunctionCensus();
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 );
        date.setTime(date.getTime() - 3600 * 1000 * 24 );
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },
      init:function () {
        this.getFunctionCensus();

        //获取平台
        this.$http.get(this.$store.state.domain+'/getPlatform',{
          params:{
            adoptToken:this.token
          }
        }).then((res)=>{
          this.plats = res.data.result.result;
        });

        this.getEditions();
      },
      getEditions: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('appPlatId', this.platVal);

        //获取版本
        this.$http.post(this.$store.state.domain+'/getEdition',Params).then((res)=>{
          if(res.data.status == 0){
            this.editions = res.data.result.result;
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
      tabSwitch(id){
          //异步请求待用
          let has = this.list[id].timeCount;
          if(has == undefined){
              this.showRadio = false;
          }else {
              this.showRadio = true;
              this.radioData = this.chartData[id].Chart;
              this.radioName.news = this.chartData[id].newsName;
              this.radioName.size = this.chartData[id].timeName;
          }
          this.myChart.setOption({
            title: {text: this.list[id].name},
            xAxis: {
              data: this.chartData[id].Chart.news.x
            },
            series: [{
              // 根据名字对应到相应的系列
              name: this.chartData[id].newsName,
              data: this.chartData[id].Chart.news.y
            }]
          })
      },
      getFunctionCensus: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('versionId', this.evalVal);
        Params.append('chatType', this.chatType);

        this.$http.post(this.$store.state.domain+'/functionCensus',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.list = data;
            this.chartData = data;
            this.myChart.setOption({
              title: {text: this.list[0].name},
              xAxis: {
                data: this.chartData[0].Chart.news.x
              },
              series: [{
                // 根据名字对应到相应的系列
                name: this.chartData[0].newsName,
                data: this.chartData[0].Chart.news.y
              }]
            })
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
      }
    },
    watch:{
      //异步请求待用
      evalVal : function (val) {
        this.getFunctionCensus();
      },
      platVal: function (val) {
        this.getFunctionCensus();
        this.getEditions();
      },
      chatType: function (val) {
        this.getFunctionCensus();
      },
      radioVal: function (val) {
        this.myChart.setOption({
          title: {text: this.list[0].name},
          xAxis: {
            data: this.radioData[val].x
          },
          series: [{
            // 根据名字对应到相应的系列
            name: this.radioName[val],
            data: this.radioData[val].y
          }]
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/statistics.scss';
</style>
