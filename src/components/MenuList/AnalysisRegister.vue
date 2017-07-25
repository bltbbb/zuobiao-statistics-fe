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
      <el-select v-model="pageVal" placeholder="页面" class="page-select">
        <el-option
          v-for="page in pages"
          :key="page.id"
          :label="page.name"
          :value="page.id">
        </el-option>
      </el-select>
    </div>
    <div class="title-box">
      <Calendar @timeValue="getTime" :showToday="false"></Calendar>
      <versiongetdata
        @Platform="childgetPlatform"
        @getEdition1="childgetEdition1"
        @changeVal="childplatVal1"
        @changeEvalVal="childchangeEvalVal"
        @canalVal1="childcanalVal1"
      >
      </versiongetdata>
    </div>
    <div class="trend-box">
      <div class="part1">
      </div>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <el-radio-group v-model="radio2" class="radio-box">
        <el-radio :label="1">事件数量</el-radio>
        <el-radio :label="2">触发用户数</el-radio>
      </el-radio-group>
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="statisDate"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="visitCount"
          label="事件数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deviceCount"
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
//        port: 'http://192.168.1.201:9999',
        port: 'http://192.168.1.32:80',
        explain: '这是菜单的说明文字',
        getEditionId: '',
        eventName: '',
        //  页面
        pages: [],
        pageVal: '',

        platVal: '',
        evalVal: '',
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
        curtext: '',
        totalCount: null,
        eventData: '',
        triggerUserData: ''
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
        this.eventName = this.$route.query.eventName;
        this.pageVal = this.$route.query.eventId * 1;
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },

      init () {
        this.getInteractionView();
        this.getAnalyzeChart();
        this.getAnalyzePages();

      },

      //  平台信息
      childgetPlatform (plats) {
        this.platVal = plats;
      },

      childplatVal1 (childplatVal1) {
        this.platVal = childplatVal1;
        this.getAnalyzeChart();
        this.getAnalyzePages();
      },

      //  版本信息
      childgetEdition1 (childgetEdition1) {
        this.evalVal = childgetEdition1;
      },

      childchangeEvalVal (childchangeEvalVal) {
        this.evalVal = childchangeEvalVal;
        this.getAnalyzeChart();
        this.getAnalyzePages();
      },

      //  渠道信息
      childcanalVal1 (canalVal) {
        this.canalVal = canalVal * 1;
      },

      //  查询页面
      getInteractionView () {
        this.$http.get(this.port + '/getInteractionView',{
          params:{
            adoptToken: this.$cookie.get('adoptToken')
          }
        }).then( (res) => {
            if (res.status == 200) {
              if (res.data.status == 0) {
                let data = res.data.result.result;
                this.pages = data;
              }
              else if (res.data.result == 1) {
                console.log('页面信息请求数据为空')
              }
            }
            else {
              console.log('请求失败')
            }
          }, (err) => {
            console.log('获取失败')
            console.log('err',err)
          })
      },

      //  图表数据
      getAnalyzeChart () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        ((this.curtext == '自定义') ? Params.append('date', this.currentDate) : Params.append('dateType', this.dateType));
        Params.append('platformId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('eventId', this.pageVal);
        this.$http.post(this.port + '/EventAnalyzeChart',Params)
          .then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              this.eventData = res.data.result.result.event;
              this.triggerUserData = res.data.result.result.triggerUser;
              this.myChart.setOption({
                xAxis: {
                  data: this.eventData.x
                },
                series: [{
                  data: this.eventData.y
                }]
              });
            }
            else if (res.data.status == 1) {
              console.log('图表信息请求数据为空')
            }
        }
      else {
          console.log('请求失败')
        }

      }, (err) => {
          console.log('获取失败')
          console.log('err',err)
        });
      },

      //  表格数据
      getAnalyzePages () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        ((this.curtext == '自定义') ? Params.append('date', this.currentDate) : Params.append('dateType', this.dateType));
        Params.append('platformId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('eventId', this.pageVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage4);
        this.$http.post(this.port + '/EventAnalyzePages',Params)
          .then( (res) => {
            if (res.status == 200) {
              if (res.data.status == 0) {
                let data = res.data.result.result;
                this.tableData = data;
                this.totalCount = res.data.result.totalCount;
              }
              else if (res.data.status == 1) {
                console.log('表格信息请求数据为空')
              }
            }
            else {
              console.log('请求失败')
            }
          }, (err) => {
            console.log('获取失败')
            console.log('err',err)
          });
      },

      // 图表格绘制
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('TendChart'));
        // 绘制图表
        this.myChart.setOption({
          title: {text: '趋势图'},
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
            name: '注册用户',
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
        this.currentDate = msg.Format("yyyy-MM-dd");
        this.dateType = dateType;
        this.curtext = curtext;
        this.getAnalyzeChart();
        this.getAnalyzePages();
      }

    },
    watch: {

      //  观察者，监听数据是否发生变化

      //  监听页面栏
      pageVal (vaule) {
        this.pageVal = vaule;
        if (vaule == '56') {
          this.eventName = 'RegisterPage'
        }
        else if (vaule == '57'){
          this.eventName = 'LoginPage'
        }
        else if (vaule == '58'){
          this.eventName = 'ResetPwdPage'
        }
        else if (vaule == '59'){
          this.eventName = 'LoginSuccess'
        }
        else if (vaule == '60'){
          this.eventName = 'ResetPwdSuccess'
        }
        else if (vaule == '61'){
          this.eventName = 'RegisterSuccess'
        }
        this.getAnalyzeChart();
        this.getAnalyzePages();
      },

      '$route' (to,from) {
        if (from.query.length) {
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
              data: this.triggerUserData.x
            },
            series: [{
              data: this.triggerUserData.y
            }]
          });
        }
        else if (trigger == 1) {
          this.myChart.setOption({
            xAxis: {
              data: this.eventData.x
            },
            series: [{
              data: this.eventData.y
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
