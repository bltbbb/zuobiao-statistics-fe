<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        [{{ errorType }}] 错误明细
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
      <!--双日期-->
      <el-radio-group v-model="radio2" @change="datarangeChange">
        <el-radio-button name="1" label="昨天"></el-radio-button>
        <el-radio-button name="2" label="最近7天"></el-radio-button>
        <el-radio-button name="3" label="最近30天"></el-radio-button>
        <el-radio-button name="4" label="最近60天"></el-radio-button>
        <el-radio-button name="5" label="自定义" class="time-box" ref="custom">
          <el-date-picker v-model="value2" type="daterange" placeholder=""
                          class="data-piker" @change="rangeChange" @focus="focusPiker"
                          :picker-options="pickerOptions0">
          </el-date-picker>
        </el-radio-button>
      </el-radio-group>


      <div class="title-select-box" >
        <el-select v-model="platVal" placeholder="平台" @change="changeVal">
          <el-option
            v-for="plat in plats"
            :key="plat.name"
            :label="plat.name"
            :value="plat.id">
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
        <el-select v-model="evalVal" placeholder="版本" @change="changeEvalVal">
          <el-option
            v-for="edition in editions"
            :key="edition.appVersion"
            :label="edition.appVersion"
            :value="edition.appVersionId">
          </el-option>
        </el-select>
      </div>




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
                <div class="detail-title detail-box" :class="{active: type == scope.row.id}"  v-html="scope.row.crashMessage"></div>
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
//  import Calendar from '@/components/calendar/Calendar'
//  import versiongetdata from '../versionInformation/VersionGetData'
  export default {
    data() {
      return {
//        port: 'http://192.168.1.201:9999',
        port: 'http://192.168.1.32:80',
        explain: '这是菜单的说明文字',

        platVal: '',
        plats: [],
        evalVal: '',
        editions: [],
        canalVal: '',
        canals: [{
          val: -1,
          label: '全部渠道'
        }],

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
        errorType: '',
        crashMessageId: '',

        name: 'calendar',
        radio2: '',
        value2: [new Date() - 3600 * 1000 * 24 , new Date() - 3600 * 1000 * 24],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }

      }
    },
    // 平台图表格-->
    mounted() {
//      this.drawLine();
      this.initParams();
      this.datarangeChange();
      this.init();
    },

//    components: {
//      Calendar,
//      versiongetdata
//    },
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      },

      initParams () {
        this.errorType =  this.$route.query.errorType;
        this.start =  this.$route.query.start;
        this.end =  this.$route.query.end;
        this.platVal =  this.$route.query.platVal * 1;
        this.getEditionId =  this.$route.query.evalVal * 1;
        this.canalVal =  this.$route.query.canalVal * 1;
        this.value2 = [this.start, this.end];
        let oldDate1 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 1)).Format('yyyy-M-d');
        let oldDate2 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 7)).Format('yyyy-M-d');
        let oldDate3 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 30)).Format('yyyy-M-d');
        let oldDate4 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 60)).Format('yyyy-M-d');
        if (this.start == oldDate1){
          this.radio2 = '昨天'
        }
        else if (this.start == oldDate2) {
          this.radio2 = '最近7天'
        }
        else if (this.start == oldDate3) {
          this.radio2 = '最近30天'
        }
        else if (this.start == oldDate4) {
          this.radio2 = '最近60天'
        }
        this.token = this.$cookie.get('adoptToken');
      },

      init () {
        this.getPlatform();
        this.getEdition();
        this.getDetailedPages();
      },


      //当前时间点击赋值
      datarangeChange(val){
        let date = new Date();
        let start = new Date();
        if (val == "昨天") {
          start.setTime(date.getTime() - 3600 * 1000 * 24);
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          this.value2 = [start, start];
        }
        else if (val == "最近7天") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          this.value2 = [start, date];
        }
        else if (val == "最近30天") {
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          this.value2 = [start, date];
        }
        else if (val == "最近60天") {
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
          this.value2 = [start, date];
        }

      },

      rangeChange:function(val){
        if(!val){
          return
        }
        if(val[0] == null || val[1] == null){
          return
        }

        this.start = new Date(this.value2[0]).Format('yyyy-M-d');
        this.end = new Date(this.value2[1]).Format('yyyy-M-d');
        this.getDetailedPages();
      },

      focusPiker() {
        // 模拟点击自定义 使其获得is-active类名
        this.$refs.custom.$el.click()
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
        Params.append('appPlatId', this.platVal)
        this.$http.post(this.port + '/getLogOrEventEdition',Params).then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              let data = res.data.result.result;
              this.editions = data;
              this.getEditionId = data[0].appVersionId;
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
                for (let i in data){
                  this.tableData[i].crashMessage = data[i].crashMessage.replace(/\r\n/g,"<br>").replace(/ /g,"&nbsp;&nbsp;");
                }
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
        console.log(row)
        this.$router.push({name: 'DetailMore',query:{
          errorType: this.errorType,
          crashMessageId: row.crashMessageId,
          startDate: this.start,
          stopDate: this.end,
//          value2: this.value2,
          evalVal: this.evalVal,
          platVal: this.platVal,
          canalVal: this.canalVal
        }});
      },

      //  监听平台数据变化
      changeVal (val) {
        this.platVal = val;
        this.evalVal = this.getEditionId;
        this.getEdition();
        this.getDetailedPages();
      },

      //  监听版本数据变化
      changeEvalVal (val) {
        this.evalVal = val;
        this.getDetailedPages();
      }

    },

    watch: {
      $route (to) {
        if (to.name == 'ErrorDetail') {
          this.errorType = to.query.errorType;
          this.canalVal = to.query.canalVal * 1;
          this.evalVal = to.query.evalVal * 1;
          this.platVal = to.query.platVal * 1;
          this.start = to.query.start;
          this.end = to.query.end;
          let oldDate1 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 1)).Format('yyyy-M-d');
          let oldDate2 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 7)).Format('yyyy-M-d');
          let oldDate3 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 30)).Format('yyyy-M-d');
          let oldDate4 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 60)).Format('yyyy-M-d');
          this.value2 = [to.query.start, to.query.end];
          if (this.start == oldDate1){
            this.radio2 = '昨天'
          }
          else if (this.start == oldDate2) {
            this.radio2 = '最近7天'
          }
          else if (this.start == oldDate3) {
            this.radio2 = '最近30天'
          }
          else if (this.start == oldDate4) {
            this.radio2 = '最近60天'
          }
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
