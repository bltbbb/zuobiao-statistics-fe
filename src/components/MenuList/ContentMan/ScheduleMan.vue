<!--趋势分析-->
<template>
  <div class="trend content-box">
    <div class="header-wrapper">
      <h1>
        日程管理
      </h1>
    </div>
    <div class="title-box">
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
            :key="edition.appVersionId+''"
            :label="edition.appVersion"
            :value="edition.appVersionId+''">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="trend-box">
      <el-table
        :data="tableData2"
        style="width: 100%">
        <el-table-column
          prop="addNum"
          label="创建日程总数">
        </el-table-column>
        <el-table-column
          prop="completeNum"
          label="标记完成次数">
        </el-table-column>
        <el-table-column
          prop="shareNum"
          label="分享次数">
        </el-table-column>
      </el-table>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>

      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="statisDate"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="addNum"
          label="创建日程数">
        </el-table-column>
        <el-table-column
          prop="completeNum"
          label="标记完次数">
        </el-table-column>
        <el-table-column
          prop="shareNum"
          label="分享次数">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
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
  import lockr from 'lockr'
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
        plats: [],
        canals: [{
          val: '-1',
          label: '全部渠道'
        }],
        editions: [],
        // 第一部分
        list: [],
        title:['新增用户','新增用户占比','启动用户','启动次数'],
        myChart: null,
        // 表格数据
        tableData: [],
        tableData2: [],
        platVal: '-1',
        evalVal: "-1",
        start: '',
        end: '',
        token: '',
        chartData: [],
        size: 20,
        currentPage: 1,
        totalCount: 100
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
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: []
          },
          yAxis: {
            type: 'value'
          },
          legend: {
            data:['历史日程总数','当日日程数'],
            y:'bottom'
          },
          series: [{
            type: 'line',
            data: [],
//            areaStyle: {
//              normal: {
//                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                  offset: 0,
//                  color: 'rgba(122, 143, 224,0.5)'
//                }, {
//                  offset: 1,
//                  color: 'rgba(122, 143, 224,0.2)'
//                }], false)
//              }
//            },
            itemStyle: {
              normal: {
                color: '#7a8fe0'
              }
            }
          },
          {
            type: 'line',
            data: [],
//            areaStyle: {
//              normal: {
//                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                  offset: 0,
//                  color: 'rgba(51, 65, 86,0.5)'
//                }, {
//                  offset: 1,
//                  color: 'rgba(51, 65, 86,0.2)'
//                }], false)
//              }
//            },
            itemStyle: {
              normal: {
                color: '#e0331f'
              }
            }
          }]

        });
        window.onresize = this.myChart.resize;
      },
      handleSizeChange(val) {
        this.size = val;
        this.getAnlysisDetails();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getAnlysisDetails();
      },



      //获取日历时间
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getAnlysis();
        this.getAnlysisDetails();
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
        this.size = 20;
      },
      init:function () {
        this.getAnlysis();
        this.getAnlysisDetails();

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
        })
      },
      getAnlysis:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('appPlatId', this.platVal);
        Params.append('versionId', this.evalVal);

        //初始化
        this.chartData = [];
        this.$http.post(this.$store.state.domain+'/scheduleInfo/report',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.chartData = data.report
            this.tableData2 = [data.reportNum]
            this.myChart.setOption({
              xAxis: {
                data: this.chartData['addNumCount'].x
              },
              series: [{
                // 根据名字对应到相应的系列
                name: this.chartData['addNumCount'].name,
                data: this.chartData['addNumCount'].y
              },
              {
                // 根据名字对应到相应的系列
                name: this.chartData['userNumCount'].name,
                data: this.chartData['userNumCount'].y
              }
              ]
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
//          this.$message.error('网络错误');
        })
      },
      getAnlysisDetails:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('appPlatId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post(this.$store.state.domain+'/scheduleInfo/page',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.totalCount = res.data.result.totalCount;
            this.tableData = data;
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
//          this.$message.error('网络错误');
        })
      }
    },
    watch:{
      // 异步请求待用
      platVal: function (val) {
        this.getAnlysis();
        this.getAnlysisDetails();
        this.getEditions();
        this.evalVal = "-1";
      },

      evalVal: function (val) {
        this.editionId = val;
        this.getAnlysis();
        this.getAnlysisDetails();
      },

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../../assets/css/page/public.scss';
  @import '../../../assets/css/page/trend.scss';

  .popover-class {
    border-radius: 3px;
  }

  .top-title {
    padding-bottom: 8px;
    .el-icon-information {
      display: inline-block;
      margin-left: 5px;
    }
  }
  #TendChart {
    padding-top: 0;
    padding-bottom: 20px;
  }
</style>

