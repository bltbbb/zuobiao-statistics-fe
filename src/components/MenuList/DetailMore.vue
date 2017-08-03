<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        错误详情 [{{ startDate }} ~ {{ stopDate }}]
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
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in list" :key="item.id">
            <div class="grid-content bg-purple">
              <div class="top-title">{{item.title}}
                <el-popover
                  placement="bottom"
                  v-bind:title="item.message"
                  width="200"
                  trigger="hover">
                  <i class="el-icon-information" slot="reference"></i>
                </el-popover>
              </div>
              <h1>{{item.number}}</h1>
            </div>
          </el-col>

        </el-row>

      </div>

      <div id="activeChart" class="chart" :style="{width: '100%', height: '400px'}">
        eacharts
      </div>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <div>
        <el-tab-pane label="错误日志" name="first" v-html="login">
          <!--{{ login }}-->
        </el-tab-pane>
        </div>

        <el-tab-pane label="按机型分布" name="second">
          <table style="width: 100%; text-align: left" cellspacing="0" cellpadding="0">
            <thead >
              <tr style="background-color: #EEF1F6; height: 40px; color: #1F2D3D; border: solid 1px #D1DBE5;">
                <th  style="width: 300px;padding-left: 20px;">机型</th>
                <th style="">错误次数
                  <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                    <i class="el-icon-information tubiao" ></i>
                  </el-tooltip>
                </th>
                <th>占比
                  <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                    <i class="el-icon-information tubiao" ></i>
                  </el-tooltip>
                </th>
                <th>影响用户数
                  <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                    <i class="el-icon-information tubiao" ></i>
                  </el-tooltip>
                </th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="(vaule,index) in tableData" style="height: 40px; border: solid 1px #D1DBE5;" >
                <td style="padding-left: 20px;">{{ vaule.name }}</td>
                <td>{{ vaule.errorCount }}</td>
                <td>{{ vaule.errorProp }}</td>
                <td>{{ vaule.userCount }}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="按系统分布" name="third">
          <table style="width: 100%; text-align: left" cellspacing="0" cellpadding="0">
            <thead >
            <tr style="background-color: #EEF1F6; height: 40px; color: #1F2D3D; border: solid 1px #D1DBE5;">
              <th  style="width: 300px;padding-left: 20px;">系统</th>
              <th style="">错误次数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <i class="el-icon-information tubiao"></i>
                </el-tooltip>
              </th>
              <th>占比
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <i class="el-icon-information tubiao"></i>
                </el-tooltip>
              </th>
              <th>影响用户数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <i class="el-icon-information tubiao"></i>
                </el-tooltip>
              </th>
            </tr>
            </thead>
            <tbody >
            <tr v-for="(vaule,index) in tableData1" style="height: 40px; border: solid 1px #D1DBE5;" >
              <td style="padding-left: 20px;">{{ vaule.name }}</td>
              <td>{{ vaule.errorCount }}</td>
              <td>{{ vaule.errorProp }}</td>
              <td>{{ vaule.userCount }}</td>
            </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="按版本分布" name="fourth">

          <table style="width: 100%; text-align: left" cellspacing="0" cellpadding="0">
            <thead >
            <tr style="background-color: #EEF1F6; height: 40px; color: #1F2D3D; border: solid 1px #D1DBE5;">
              <th  style="width: 200px;padding-left: 20px;">平台</th>
              <th  style="width: 200px;">版本</th>
              <th style="">错误次数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <i class="el-icon-information tubiao"></i>
                </el-tooltip>
              </th>
              <th>占比
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <i class="el-icon-information tubiao"></i>
                </el-tooltip>
              </th>
              <th>影响用户数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <i class="el-icon-information tubiao"></i>
                </el-tooltip>
              </th>
            </tr>
            </thead>
            <tbody >
            <tr v-for="(vaule,index) in tableData2" style="height: 40px; border: solid 1px #D1DBE5;" >
              <td style="padding-left: 20px;">{{ vaule.appPlatName }}</td>
              <td >{{ vaule.appVersion }}</td>
              <td>{{ vaule.errorCount }}</td>
              <td>{{ vaule.errorProp }}</td>
              <td>{{ vaule.userCount }}</td>
            </tr>
            </tbody>
          </table>

        </el-tab-pane>
        <!--<el-tab-pane label="按本地时间" name="five">-->
          <!--<el-table-->
            <!--:data="tableData"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
              <!--prop="name"-->
              <!--label="机型"-->
              <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="errorCount"-->
              <!--label="错误次数">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="errorProp"-->
              <!--label="占比">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="userCount"-->
              <!--label="影响用户数">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</el-tab-pane>-->

      </el-tabs>
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
  import versiongetdata from '../versionInformation/VersionGetData'
  export default {
    data() {
      return {
//        port: 'http://192.168.1.201:9999',
        port: 'http://192.168.1.32:80',
        token: '',
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
        // 第一部分
        list: [
          {id: "1", title: "出错最多机型", message: 'Foo', number: "8096798"},
          {id: "2", title: "出错最多系统", message: 'Bar', number: "8096798"},
          {id: "3", title: "累计错误次数", message: 'Foo', number: "8096798"},
          {id: "4", title: "累计影响用户数", message: 'Bar', number: "8096798"},
          {id: "5", title: "修复状态", message: 'Foo', number: "未修复"}
        ],
        //  table部分
        login: "",
        radio2: 1,
        text: "展开",
        isActive: false,
        currentPage4: 1,
        activeName2: 'first',
        //  按机型分布
        tableData: [],  //  里面为对象
        //  按系统分布
        tableData1: [],
        //  按版本分布
        tableData2: [],

        crashMessageId: '',
        errorType: '',
        startDate: '',
        stopDate: '',

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
    components: {
      versiongetdata
    },
    mounted () {
      this.initParams();
      this.datarangeChange();
      this.init();
    },
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      },
      initParams () {
        this.crashMessageId = this.$route.query.crashMessageId;
        this.errorType = this.$route.query.errorType;
        this.startDate = this.$route.query.startDate;
        this.stopDate = this.$route.query.stopDate;
        this.getEditionId =  this.$route.query.evalVal * 1;
        this.platVal =  this.$route.query.platVal * 1;
        this.canalVal =  this.$route.query.canalVal * 1;
        this.token = this.$cookie.get('adoptToken');
        this.value2 = [this.startDate, this.stopDate];
        let oldDate1 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 1)).Format('yyyy-M-d');
        let oldDate2 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 7)).Format('yyyy-M-d');
        let oldDate3 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 30)).Format('yyyy-M-d');
        let oldDate4 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 60)).Format('yyyy-M-d');
        if (this.startDate == oldDate1){
          this.radio2 = '昨天'
        }
        else if (this.startDate == oldDate2) {
          this.radio2 = '最近7天'
        }
        else if (this.startDate == oldDate3) {
          this.radio2 = '最近30天'
        }
        else if (this.startDate == oldDate4) {
          this.radio2 = '最近60天'
        }
      },

      init () {
        this.getPlatform();
        this.getEdition();
        this.getDetailed();
        this.drawLine();
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

    //  监听时间变化
      rangeChange:function(val){
        if(!val){
          return
        }
        if(val[0] == null || val[1] == null){
          return
        }
        this.startDate = this.value2[0].Format('yyyy-M-d');
        this.stopDate = this.value2[1].Format('yyyy-M-d')
        this.getDetailed();
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


      //  获取错误日志，错误机型
      getDetailed () {
        let Params = new URLSearchParams();
        Params.append('adoptToken',this.token);
        Params.append('startDate',this.startDate);
        Params.append('stopDate',this.stopDate);
        Params.append('platformId',this.platVal);
        Params.append('versionId',this.evalVal);
        Params.append('channelId',this.canalVal);
        Params.append('errorType',this.errorType);
        Params.append('crashMessageId',this.crashMessageId);
        this.$http.post(this.port + '/errorDetailed',Params)
          .then( (res) => {
            if (res.status == 200) {
              if (res.data.status == 0) {
                let data = res.data.result.result;
                this.list[0].number = data.errDetail.manufacturerModelName;
                this.list[1].number = data.errDetail.errorSystem;
                this.list[2].number = data.errDetail.errorCount;
                this.list[3].number = data.errDetail.userCount;
                this.list[4].number = '未修复';
                this.login = data.crashMessage.replace(/\r\n/g,"<br>").replace(/ /g,"&nbsp;&nbsp;");
                this.tableData = data.model;
                this.tableData1 = data.os;
                this.tableData2 = data.version;
              }
              else if (res.data.status == 1) {
                console.log('请求数据为空');
              }
            }
            else {
              console.log('请求数据失败');
            }
        }, (err) => {
            console.log('获取数据失败');
            console.log('err',err);
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

      //  页签切换
      handleClick(tab, event) {
//        console.log(tab, event);
      },

      //  监听平台数据变化
      changeVal (val) {
        this.platVal = val;
        this.evalVal = this.getEditionId;
        this.getEdition();
        this.getDetailed();
      },

      //  监听版本数据变化
      changeEvalVal (val) {
        this.evalVal = val;
        this.getDetailed();
      }

    },

    watch: {
      $route (to) {
        if (to.name == 'DetailMore') {
          this.crashMessageId = to.query.crashMessageId;
          this.errorType = to.query.errorType;
          this.startDate = to.query.startDate;
          this.stopDate = to.query.stopDate;
          this.evalVal = to.query.evalVal;
          this.platVal = to.query.platVal;
          this.canalVal = to.query.canalVal;
          let oldDate1 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 1)).Format('yyyy-M-d');
          let oldDate2 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 7)).Format('yyyy-M-d');
          let oldDate3 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 30)).Format('yyyy-M-d');
          let oldDate4 = new Date((new Date()).setTime((new Date()).getTime() - 86400000 * 60)).Format('yyyy-M-d');
          if (this.startDate == oldDate1){
            this.radio2 = '昨天'
          }
          else if (this.startDate == oldDate2) {
            this.radio2 = '最近7天'
          }
          else if (this.startDate == oldDate3) {
            this.radio2 = '最近30天'
          }
          else if (this.startDate == oldDate4) {
            this.radio2 = '最近60天'
          }
          this.getDetailed();
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
  .tubiao{
    color: #9D9D9D;
  }
</style>
