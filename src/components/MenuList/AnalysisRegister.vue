<!--埋点-->
<template>
  <div class="content-box">
    <div class="header-wrapper">
      <h1>
        <span>{{ eventName }}</span>
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
    <div class="select-wrapper">
      <el-select v-model="pageVal" style="width: 160px;"  class="page-select">
        <el-option
          v-for="page in pages"
          :key="page.eventId"
          :label="page.eventName"
          :value="page.eventId">
        </el-option>
      </el-select>
    </div>
    <div class="title-box">
      <Calendar @timeValue="getTime"></Calendar>
      <versiongetdata
        @Platform="childgetPlatform"
        @changeVal="changeplatVal1"
        @canalVal1="childcanalVal1"
        @getEdition1="getEdition1"
        @changeEvalVal="changeEdition"
        :allPlat="false"
      >
      </versiongetdata>
    </div>
    <div class="trend-box">
      <div class="part1">
      </div>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <el-radio-group v-model="radio2" class="radio-box">
        <el-radio :label="1">消息数量</el-radio>
        <el-radio :label="2">触发用户数</el-radio>
      </el-radio-group>
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="statisDate"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="yesMessageCount"
          label="事件数量">
        </el-table-column>
        <el-table-column
          prop="yesUserCount"
          label="触发用户数">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                     class="radio-box"
                     :page-sizes="[20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
      </el-pagination>
    </div>
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
  import Calendar from '@/components/calendar/Calendar'
  import versiongetdata from '../versionInformation/VersionGetData'
  export default {
    data() {
      return {
//        port: this.$store.state.domain+'',
        port: this.$store.state.domain,
        explain: '这是菜单的说明文字',
        getEditionId: '',
        eventName: '事件统计',
        //  页面
        pages: [],
        pageVal: '',

        platVal: 3,
        evalVal: -1,
        canalVal: '',

        // 第一部分
        radio2: 1,  //  事件触发数量
        //  图表
        myChart: null,
        // 表格数据
        tableData: [],
        currentPage4: 1,
        size: 20,
        currentDate:'',
        dateType: 1,
        curtext: null,
        totalCount: null,
        eventData: '',
        triggerUserData: '',
        startDate: '',
        stopDate: '',
        messageChartData: [],
        userChartData: [],
      }
    },

    computed: {

    },

    // 平台图表格-->
    mounted () {
      this.initParams();
      this.init();
      this.drawLine();
    },
    components: {
      Calendar,
      versiongetdata
    },
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      },
      initParams () {
        this.token = this.$cookie.get('adoptToken');
        this.pageVal = this.$route.params.id
        let date = new Date();
        let start = new Date();
        let stop = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        stop.setTime(stop.getTime() - 3600 * 1000 * 24);
        this.startDate = start.Format("yyyy-MM-dd");
        this.stopDate = stop.Format("yyyy-MM-dd");
      },

      init () {
        this.getInteractionView();
        //this.getAnalyzeChart();
        this.getAnalyzePages();
      },

      //  默认平台
      childgetPlatform (plats) {
        this.platVal = plats;
      },

      // 改变平台
      changeplatVal1 (val) {
        this.platVal = val;
        this.getAnalyzeChart();
        this.getAnalyzePages();
      },

      //  改变版本
      changeEdition(val){
        this.evalVal = val;
        this.getAnalyzeChart();
        this.getAnalyzePages();
      },
      //  渠道信息
      childcanalVal1 (canalVal) {
        this.canalVal = canalVal * 1;
      },
      // 默认版本
      getEdition1(val){
        this.evalVal = val;
      },

      //  查询事件
      getInteractionView () {
        this.$http.get(this.port + '/getDimEvent',{
          params:{
            adoptToken: this.$cookie.get('adoptToken'),
            appPlatId: this.platVal,
            versionId: this.evalVal
          }
        }).then( (res) => {
            if (res.status == 200) {
              if (res.data.status == 0) {
                let data = res.data.result.result;
                this.pages = data;
              }
              else if (res.data.result == 1) {
              }
            }
            else {
            }
          }, (err) => {

          })
      },

      //  图表数据
      getAnalyzeChart () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.startDate)
        Params.append('stopDate', this.stopDate)
        Params.append('platformId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('eventId', this.pageVal);
        this.$http.post(this.port + '/EventAnalyzeReport',Params)
          .then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              this.messageChartData = res.data.result.result.yesMessage;
              this.userChartData = res.data.result.result.yesUser;
              this.myChart.setOption({
                xAxis: {
                  data: this.messageChartData.x
                },
                series: [{
                  data: this.messageChartData.y
                }]
              });
            }
            else if (res.data.status == 1) {
              this.$message.warning('数据为空');
            }
        }
      else {
        }

      }, (err) => {
        });
      },

      //  表格数据
      getAnalyzePages () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.startDate)
        Params.append('stopDate', this.stopDate)
        Params.append('platformId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('eventId', this.pageVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage4);
        this.$http.post(this.port + '/EventAnalyzeDetailed',Params)
          .then( (res) => {
            if (res.status == 200) {
              if (res.data.status == 0) {
                let data = res.data.result.result;
                this.tableData = data;
                this.totalCount = res.data.result.totalCount;
              }
              else if (res.data.status == 1) {
                this.tableData = [];
              }
            }
            else {
            }
          }, (err) => {
          });
      },

      // 图表格绘制
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('TendChart'));
        // 绘制图表
        this.myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['今天', '昨天']
          },
          xAxis: {
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '事件数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#7a8fe0',
                areaStyle:{
                  type: 'default',
                  color: 'rgba(122, 143, 224,0.5)'
                }
              }
            },
            data: []
          }]

        });
        window.onresize = this.myChart.resize;
      },

      handleSizeChange(val) {
        this.size = val;
        this.getAnalyzePages();
      },

      handleCurrentChange(val) {
        this.currentPage4 = val;
        this.getAnalyzePages();
      },

      //获取日历时间
      getTime(msg,dateType,curtext){
        this.startDate = msg[0].Format("yyyy-M-d");
        this.stopDate = msg[1].Format("yyyy-M-d");
        this.getAnalyzeChart();
        this.getAnalyzePages();
      }

    },
    watch: {

      //  观察者，监听数据是否发生变化

      //  监听页面栏
      pageVal (vaule) {
        this.pageVal = vaule;
        this.getAnalyzeChart();
        this.getAnalyzePages();
      },

      '$route' (to,from) {
        if (to.name == 'AnalysisRegister') {
          this.eventName = to.query.eventName;
          this.pageVal = to.query.eventId * 1;
        }
      },


      //  事件切换
      radio2 (trigger) {
        this.radio2 = trigger;
        if (trigger == 2) {
          this.myChart.setOption({
            xAxis: {
              data: this.userChartData.x
            },
            series: [{
              data: this.userChartData.y,
              name: '用户数触发数'
            }]
          });
        }
        else if (trigger == 1) {
          this.myChart.setOption({
            xAxis: {
              data: this.messageChartData.x
            },
            series: [{
              data: this.messageChartData.y,
              name: '事件数'
            }]
          });
        }
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/analysregister.scss';

</style>
