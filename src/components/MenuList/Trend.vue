<!--趋势分析-->
<template>
  <div class="trend content-box">
    <div class="header-wrapper">
      <h1>
        趋势分析
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
      <Calendar @timeValue="getTime"></Calendar>
      <div class="title-select-box">
        <el-select v-model="platVal" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.value"
            :label="plat.label"
            :value="plat.value">
          </el-option>
        </el-select>
        <el-select v-model="canalVal" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
          </el-option>
        </el-select>
        <el-select v-model="evalVal" placeholder="版本">
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
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in list" :key="item.type">
            <div class="grid-content bg-purple">
              <div class="top-title">{{item.title}}
                <el-popover
                  placement="right"
                  width="200"
                  trigger="hover"
                  popper-class="popover-class"
                  v-if="item.type == 2">
                  <slot>{{item.message}}</slot>
                  <i class="el-icon-information" slot="reference"></i>
                </el-popover>
              </div>
              <h1>{{item.num}}</h1>
            </div>
          </el-col>

        </el-row>
      </div>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <el-radio-group v-model="radioVal" class="radio-box">
        <el-radio :label="1">注册用户</el-radio>
        <el-radio :label="2">注册用户占比</el-radio>
        <el-radio :label="3">老用户</el-radio>
        <el-radio :label="4">老用户占比</el-radio>
      </el-radio-group>
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="registerUser"
          label="注册用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="registerUserRatio"
          label="注册用户占比">
        </el-table-column>
        <el-table-column
          prop="loginUser"
          label="登录用户">
        </el-table-column>
        <el-table-column
          prop="loginSecond"
          label="登录次数">
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
        canals: [{
          val: '1',
          label: '全部渠道'
        }],
        editions: [{
          Eval: '1',
          label: '全部版本'
        },
          {
            Eval: '2',
            label: '1.4'
          }],
        // 第一部分
        list: [],
        myChart: null,
        // 表格数据
        tableData: [],
        radioVal: 1,
        platVal: '1',
        canalVal: '1',
        evalVal: "1",
        start: '',
        end: '',
        token: '',
        chartData: {},
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
          console.log(val)
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
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
        this.size = 20;
      },
      init:function () {
        this.getAnlysis();
        this.getAnlysisDetails();
      },
      getAnlysis:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('pid', this.platVal);
        Params.append('editionId', this.evalVal);

        this.$http.post('http://192.168.1.201:9999/trendAnalysis',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.list = data.dataLists;
            this.chartData = data.NumList;
            this.myChart.setOption({
              xAxis: {
                data: this.chartData[0].num.x
              },
              series: [{
                // 根据名字对应到相应的系列
                name: this.chartData[0].title,
                data: this.chartData[0].num.y
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
      },
      getAnlysisDetails:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('pid', this.platVal);
        Params.append('editionId', this.evalVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post('http://192.168.1.201:9999/trendAnalysisDetails',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.totalCount = res.data.result.totalCount;
            this.tableData = data
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
    },
    watch:{
      // 异步请求待用
      platVal: function (val) {
        this.pid = val;
        this.getAnlysis();
        this.getAnlysisDetails();
      },
      canalVal: function (val) {
//        this.editionId = val;  //渠道备用
        this.getAnlysis();
        this.getAnlysisDetails();
      },
      evalVal: function (val) {
        this.editionId = val;
        this.getAnlysis();
        this.getAnlysisDetails();
      },
      radioVal: function (val) {
        --val;
        this.myChart.setOption({
          xAxis: {
            data: this.chartData[val].num.x
          },
          series: [{
            // 根据名字对应到相应的系列
            name: this.chartData[val].title,
            data: this.chartData[val].num.y
          }]
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/trend.scss';

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
</style>

