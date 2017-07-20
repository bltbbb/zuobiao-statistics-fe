<!--埋点-->
<template>
  <div class="content-box">
    <div class="header-wrapper">
      <h1>
        埋点页面
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
          :key="page.name"
          :label="page.name"
          :value="page.metricId ">
        </el-option>
      </el-select>
    </div>
    <div class="title-box">
      <Calendar @timeValue="getTime" :showToday="false"></Calendar>
      <div class="title-select-box">
        <el-select v-model="value" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.name"
            :label="plat.name"
            :value="plat.id">
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
        <el-select v-model="Eval" placeholder="版本">
          <el-option
            v-for="edition in editions"
            :key="edition.name"
            :label="edition.name"
            :value="edition.id">
          </el-option>
        </el-select>
      </div>
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
  export default {
    data() {
      return {
//        port: 'http://192.168.1.201:9999',
        port: 'http://192.168.1.32:80',
        explain: '这是菜单的说明文字',
        getEditionId: '',
        //  页面
        pages: [],
        pageVal: 4,
        //  平台
        plats: [],
        value: -1,
        //  渠道
        canals: [{
          val: '-1',
          label: '全部渠道'
        }],
        val: '-1',
        //  版本
        editions: [],
        Eval: -1,
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
        metricId: '',
        totalCount: null,
        eventData: '',
        triggerUserData: ''
      }
    }
    ,
    // 平台图表格-->
    mounted () {
      this.initParams();
      this.init();
      this.drawLine();

    },
    components: {
      Calendar
    },
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      },

      initParams () {
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.getPlatform();
        this.getEdition();
        this.getInteractionView();
        this.getAnalyzeChart();
        this.getAnalyzePages();

      },

      //  获取平台信息
      getPlatform () {
        this.$http.get(this.port + '/getPlatform', {
          params:{
            adoptToken: this.token
          }
        }).then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              let data = res.data.result.result;
              this.plats = data;
            }
            else if (res.data.status == 1) {
              console.log('平台信息请求数据为空');
            }
          }
          else{
            console.log('请求失败');
          }
        }, (err) => {
          console.log('获取失败');
          console.log('err',err);
        });
      },

      //  获取版本信息
      getEdition () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('appPlatId', this.value)
        this.$http.post(this.port + '/getEdition',Params).then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              let data = res.data.result.result;
              this.editions = data;
              this.getEditionId = data[0].id;
            }
            else if (res.data.status == 1) {
              console.log('版本信息请求数据为空');
            }
          }
          else{
            console.log('请求失败');
          }
        }, (err) => {
          console.log('获取失败');
          console.log('err',err);
        });
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
                this.pageVal = data[0].metricId;
              }
              else if (res.data.result == 1) {
                console.log('页面信息请求数据为空')
              }
            }
            else {
              consol.log('请求失败')
            }
          }, (err) => {
            consol.log('获取失败')
            console.log('err',err)
          })
      },

      //  图表数据
      getAnalyzeChart () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        ((this.curtext == '自定义') ? Params.append('date', this.currentDate) : Params.append('dateType', this.dateType));
        Params.append('platformId', this.value);
        Params.append('versionId', 0);
        Params.append('channelId', this.val);
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
        Params.append('platformId', this.value);
        Params.append('versionId', 0);
        Params.append('channelId', this.val);
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
        this.value = -1;
        this.Eval = -1;
        this.getAnalyzeChart();
        this.getAnalyzePages();
        console.log('页面',vaule)
      },

      //  平台数据
      value (system) {
        this.value = system;
        this.getEdition();
        this.Eval = this.getEditionId
        this.getAnalyzeChart();
        this.getAnalyzePages();
      },

      //  渠道数据
      val (channel) {
        this.val = channel;
        this.init();
      },

      //  版本数据
      Eval (versions) {
        this.Eval = versions;
        this.getAnalyzeChart();
        this.getAnalyzePages();
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
