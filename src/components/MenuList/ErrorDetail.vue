<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        错误明细
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
      <div class="part1">
      </div>
      <!--表格-->
      <el-table :data="tableData" border style="width: 100%">

        <el-table-column label="错误摘要">
          <template scope="scope">
            <div class="detail">
              <div >
                <div class="detail-title detail-box" :class="{active: type == scope.row.id}" >{{ scope.row.crashMessage }}</div>
              </div>
              <div class="detail-text">
                <div @click="more(scope.$index,scope.row)" >{{ type == scope.row.id ? '收起':'展开' }}</div>
                <div @click="moreLook(scope.$index,scope.row)" class="look">查看详情</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="错误次数" width="180">
          <template scope="scope">
            <!--<el-icon name="time"></el-icon>-->
            <span style="margin-left: 10px">{{ scope.row.errorCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影响用户数" width="180">
          <template scope="scope">
            <!--<el-icon name="time"></el-icon>-->
            <span style="margin-left: 10px">{{ scope.row.userCount  }}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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

        getEditionId: '',
        value: '1',
        // 表格数据
        tableData: [],
        isActive: false,
        type: 0,
        currentPage4: 1,
        totalCount: null,
        start: '',
        end: '',
        size: 20,
        errorType: ''

      }
    }
    ,
    // 平台图表格-->
    mounted() {
//      this.drawLine();
      this.initParams();
      this.init();
    }
    ,
    components: {
      Calendar,
      versiongetdata
    },
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      },

      initParams () {
        this.errorType =  this.$route.query.errorType;
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
        this.start = start.Format("yyyy-MM-dd");
        this.end = start.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },

      init () {
        this.getDetailedPages();
      },

      //  平台信息
      childgetPlatform (plats) {
        this.platVal = plats;
      },

      childplatVal1 (childplatVal1) {
        this.platVal = childplatVal1;
        this.getDetailedPages();
      },

      //  版本信息
      childgetEdition1 (childgetEdition1) {
        this.evalVal = childgetEdition1;
      },

      childchangeEvalVal (childchangeEvalVal) {
        this.evalVal = childchangeEvalVal;
        this.getDetailedPages();
      },

      //  渠道信息
      childcanalVal1 (canalVal) {
        this.canalVal = canalVal * 1;
      },

      //  表格信息
      getDetailedPages () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('errorType', this.errorType);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage4);
        Params.append('versionId', this.evalVal);
        Params.append('platformId', this.platVal)
        Params.append('channelId', this.canalVal);
        this.$http.post(this.port + '/errorDetailedPages',Params)
          .then( (res) => {
            if (res.status == 200){
              if (res.data.status == 0) {
                let data = res.data.result.result;
                this.tableData = data;
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
            console.log('err',err)
        });
      },

      // 图表格绘制
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('activeChart'));
        // 绘制图表
        myChart.setOption({
          title: {text: '全平台注册用户'},
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
        window.onresize = myChart.resize;
      },
      handleSizeChange(val) {
        this.size = val;
        this.init();
      },
      handleCurrentChange(val) {
        this.currentPage4 = val;
        this.init();
      },
      //获取日历时间
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getDetailedPages();
      },
      //查看明细
      handleEdit(index, row) {
        this.$router.push({name: 'DetailMore',query:{
          errorType: this.errorType,
          crashMessageId: row.crashMessageId,
          startDate: this.start,
          stopDate: this.end,
          evalVal: this.evalVal,
          platVal: this.platVal,
          canalVal: this.canalVal
        }});
      },

      more(index,row){
        if (this.type != index + 1) {
          this.type = index * 1 + 1;
        }
        else {
          this.type = 0
        }
      },

      moreLook(index,row){
        this.$router.push({name: 'DetailMore',query:{
          errorType: this.errorType,
          crashMessageId: row.crashMessageId,
          startDate: this.start,
          stopDate: this.end,
          evalVal: this.evalVal,
          platVal: this.platVal,
          canalVal: this.canalVal
        }});
      }
    },

    watch: {
      $route (to) {
        if (to.name == 'ErrorDetail') {
          this.errorType = to.query.errorType;
          this.getDetailedPages();
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/error.scss';
</style>

<style scoped lang="scss">
  @media screen and (max-width: 1440px) {
    .title-select-box{
      float: right!important;
      margin-top: 0;
    }
  }
  @media screen and (max-width: 1244px) {
    .title-select-box{
      float: left!important;
      margin-top: 20px;
    }
  }
</style>
