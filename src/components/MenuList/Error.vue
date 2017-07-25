<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        错误报告
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
      <div class="part1"></div>
      <div id="activeChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <el-radio-group v-model="radio2" class="radio-box">
        <el-radio :label="1">错误次数</el-radio>
      </el-radio-group>
      <!--表格-->
      <el-table
        :data="tableData5"
        style="width: 100%">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column type="expand" class="expand-box">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-table :data="tableData5[props.$index].Equipment" style="width: 100%">
                <el-table-column label="错误设备" prop="equipment">
                </el-table-column>
                <el-table-column label="错误次数" prop="errorNum">
                </el-table-column>
                <el-table-column label="占比" prop="Propor">
                </el-table-column>
              </el-table>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          label="错误类型" prop="id">

          <template scope="scope" >
            <span @click="handleLook(scope.$index, scope.row)" class="text-color">{{ scope.row.errorType }} </span>
          </template>

        </el-table-column>

        <el-table-column
          label="优先级"
          prop="priority"
          >
        </el-table-column>

        <el-table-column
          label="错误次数"
          prop="errorNum">
        </el-table-column>

        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleLook(scope.$index, scope.row)">查看明细
            </el-button>
          </template>
        </el-table-column>

      </el-table>

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

        platVal: '',
        evalVal: '',
        canalVal: '',

        radio2: 1,
        //  图表
        myChart:null,
        xAxisData: [],
        seriesData: [],
        // 表格数据
        tableData5: [],
        size: 20,
        currentPage4: 1,
        token: '',
        start: '',
        end: '',
        getEditionId: '',
        totalCount: null
      }
    },

    // 平台图表格-->
    mounted()
    {
      this.drawLine();
      this.initParams();
      this.init();
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
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },

      init () {
        this.getReporting();
        this.getType();
      },


      //  平台信息
      childgetPlatform (plats) {
        this.platVal = plats;
      },

      childplatVal1 (childplatVal1) {
        this.platVal = childplatVal1;
        this.getReporting();
        this.getType();
      },

      //  版本信息
      childgetEdition1 (childgetEdition1) {
        this.evalVal = childgetEdition1;
      },

      childchangeEvalVal (childchangeEvalVal) {
        this.evalVal = childchangeEvalVal;
        this.getReporting();
        this.getType();
      },

      //  渠道信息
      childcanalVal1 (canalVal) {
        this.canalVal = canalVal * 1;
      },



      //  图表信息
      getReporting () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('versionId', this.evalVal);
        Params.append('appPlatId', this.platVal)
        Params.append('channelId', this.canalVal);
        this.$http.post(this.port + '/errorReporting',Params)
          .then((res)=>{
            if(res.status == 200){
              if (res.data.status == 0) {
                this.xAxisData = res.data.result.result.x;
                this.seriesData = res.data.result.result.y;
                this.myChart.setOption({
                  xAxis: {
                    data: this.xAxisData
                  },
                  series: [{
                    data: this.seriesData
                  }]
                });
              }
              else if (res.data.status == 0) {
                console.log('图表信息请求数据为空')
              }
            }
            else{
              console.log('请求失败');
            }
        },(err)=>{
          console.log('获取失败');
          console.log('err',err);
        })
      },

      // 错误类型
      getType () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('versionId', this.evalVal);
        Params.append('eventId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage4);
        this.$http.post(this.port + '/errorType',Params)
        .then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              let errorDataList = res.data.result.result;
              for (let index in errorDataList) {
                if (errorDataList[index].priority == 1) {
                  errorDataList[index].priority = '高'
                }
                else if (errorDataList[index].priority == 2) {
                  errorDataList[index].priority = '中'
                }
                else if (errorDataList[index].priority == 3) {
                  errorDataList[index].priority = '低'
                }
              }
              this.tableData5 = errorDataList;
              this.totalCount = res.data.result.totalCount;
            }
            else if (res.data.status == 1) {
              console.log('表格信息请求数据为空');
            }
          }
          else {
            console.log('请求失败');
          }
        }, (err) => {
          console.log('获取失败');
          console.log('err',err);
        })
      },

      // 图表格绘制
      drawLine()
      {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('activeChart'));
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
            itemStyle: {
              normal: {
                color: '#7a8fe0',
                areaStyle:{
                  type: 'default',
                  color: 'rgba(122, 143, 224,0.5)'
                }
              }
            },
            data: [5, 20, 36, 10, 10, 20]
          }]

        });
        window.onresize = this.myChart.resize;
      },

      handleSizeChange(val) {
        this.size = val;
        this.getType();
      },
      handleCurrentChange(val) {
        this.currentPage4 = val;
        this.getType();
      },
      //获取日历时间
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getReporting();
        this.getType();
      },
      //查看明细
      handleLook(index, row) {
        this.$router.push({name: 'ErrorDetail',query:{curerrid: row.id}});
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/error.scss';
</style>
