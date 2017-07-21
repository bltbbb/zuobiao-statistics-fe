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
        <el-table-column label="日期" width="180">np
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.errNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" >
          <template scope="scope">
            <div class="detail">
              <div class="detail-title">{{ scope.row.name }}</div>
              <div class="detail-box" v-bind:class="{ active: isActive }">{{ scope.row.log }}</div>
              <div class="detail-text">
                <div @click="more">{{text}}</div>
                <div @click="moreLook" class="look">查看详情</div>
              </div>
            </div>
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
        // 第一部分
        list: [
          {id: "1", title: "登录用户", message: 'Foo', number: "8096798"},
          {id: "2", title: "日活/月活", message: 'Bar', number: "8096798"}
        ],
        radio2: 1,
        // 表格数据
        tableData: [
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          title: "text",
          content: "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市" +
          "普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        }],
        text: "展开",
        isActive: false,
        currentPage4: 1,
        totalCount: null,
        start: '',
        end: '',
        size: 20,
        errId: ''
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
      }
      ,

      initParams () {
        this.errId =  this.$route.query.curerrid;
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
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
        Params.append('errId', this.errId);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage4);
        Params.append('versionId', this.evalVal);
        Params.append('appPlatId', this.platVal)
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
      drawLine()
      {
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
        this.$router.push({name: 'DetailMore',query:{errId: this.errId}});
      },
      more(){
        if (this.isActive) {
          this.isActive = false;
          this.text = "展开"
        }
        else {
          this.isActive = true;
          this.text = "收起";
        }
      },
      moreLook(){
        this.$router.push({name: 'DetailMore',query:{errId: this.errId}});
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
