<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        错误详情
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
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="错误日志" name="first">
          {{ login }}
        </el-tab-pane>
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
        <el-tab-pane label="按本地时间" name="five">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="errorCount"
              label="错误次数">
            </el-table-column>
            <el-table-column
              prop="errorProp"
              label="占比">
            </el-table-column>
            <el-table-column
              prop="userCount"
              label="影响用户数">
            </el-table-column>
          </el-table>
        </el-tab-pane>
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
        evalVal: '',
        canalVal: '',

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
        stopDate: ''
      }
    },
    components: {
      versiongetdata
    },
    mounted () {
      this.initParams();
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
        this.evalVal =  this.$route.query.evalVal;
        this.platVal =  this.$route.query.platVal;
        this.canalVal =  this.$route.query.canalVal;
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.getDetailed();
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
                this.login = data.crashMessage;
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

      //  页签切换
      handleClick(tab, event) {
//        console.log(tab, event);
      },
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
