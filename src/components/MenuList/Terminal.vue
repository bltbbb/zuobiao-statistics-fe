<!--终端分析-->
<template>
  <div class="Terminal content-box">
    <div class="header-wrapper">
      <h1>
        终端分析
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
      <Calendar @timeValue="getTime" :showToday="false"></Calendar>
      <div class="title-select-box">
        <el-select v-model="platVal" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.id+''"
            :label="plat.name"
            :value="plat.id+''">
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
            :key="edition.appVersionId+''"
            :label="edition.appVersion"
            :value="edition.appVersionId+''">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="radio-wrapper">
        <label class="raido-label">选择终端属性</label>
        <el-radio-group v-model="radioVal">
          <el-radio label="1">设备型号</el-radio>
          <el-radio label="2">操作系统</el-radio>
          <el-radio label="3">运营商</el-radio>
          <el-radio label="4">联网方式</el-radio>
        </el-radio-group>
    </div>
    <div class="user-wrapper">
      <div class="user-box">
        <h1>{{titleSingle}}</h1>
        <span>{{userCount}}</span>
      </div>
    </div>
    <div class="chart-wrapper">
      <div id="chart-content"></div>
    </div>
    <!--8-15需求去掉-->
    <!--<div class="raido2-wrapper">-->
      <!--<el-radio-group v-model="radioValue2">-->
        <!--<el-radio label="1">登陆次数</el-radio>-->
        <!--<el-radio label="2">新注册用户数</el-radio>-->
        <!--<el-radio label="3">登陆用户数</el-radio>-->
      <!--</el-radio-group>-->
    <!--</div>-->
    <div class="table-wrapper">
      <!--<table class="table-title">-->
        <!--<thead>-->
        <!--<tr>-->
          <!--<th class="table-thead-th-1" :style="{width: '180px'}">事件名称</th>-->
          <!--<th :style="{width: '180px'}">事件Id</th>-->
          <!--<th :style="{width: '40%'}">事件数量（日均）-->
            <!--<el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">-->
              <!--<i class="el-icon-information"></i>-->
            <!--</el-tooltip>-->
          <!--</th>-->

          <!--<th :style="{width: 'auto'}">触发用户数（日均）-->
            <!--<el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">-->
              <!--<i class="el-icon-information"></i>-->
            <!--</el-tooltip>-->
          <!--</th>-->
        <!--</tr>-->

        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr v-for="vaule in tableData">-->
          <!--<td class="table-thead-th-1" v-on:click="handleRowHandle($event)">{{ vaule.incidentName }}</td>-->
          <!--<td>{{ vaule.incidentId }}</td>-->
          <!--<td>{{ vaule.incidentNumber }}</td>-->
          <!--<td>{{ vaule.userNumer }}</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
      <table class="table-terminal">
        <thead>
          <tr>
            <th></th>
            <th style="text-align: left;">
              {{tableName}}
              <el-popover
                placement="right"
                trigger="hover"
                popper-class="popover-class">
                <slot>{{equipTooltip}}</slot>
                <i class="el-icon-information" slot="reference"></i>
              </el-popover>
            </th>
            <th>
              启动次数
              <el-popover
                placement="right"
                trigger="hover"
                popper-class="popover-class">
                <slot>{{loginTooltip}}</slot>
                <i class="el-icon-information" slot="reference"></i>
              </el-popover>
            </th>
            <th>启动次数占比</th>
            <th>新增用户</th>
            <th>新增用户占比</th>
            <!--8-15需求去掉-->
            <!--<th>登录用户</th>-->
            <!--<th>登录用户占比</th>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData">
            <td>{{index+1}}</td>
            <td style="text-align: left;">{{item.name}}</td>
            <td>{{item.signinTimesCount}}</td>
            <td>{{item.signinTimesProp }}%</td>
            <td>{{item.newUserCount }}</td>
            <td>{{item.newUserProp }}%</td>
            <!--<td>{{item.signinUserCount}}</td>-->
            <!--<td>{{item.signinUserProp}}%</td>-->
          </tr>
        </tbody>
      </table>
      <!--<el-table :data="tableData" style="width: 100%" >-->
        <!--<el-table-column type="index" label=" " width="50">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="设备型号" width="180" label-class-name="headerName1" class-name="bodyName1">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="loginSize" label="累计登录次数" width="180" label-class-name="headerName" class-name="bodyName">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="loginPropor" label="累计登录次数占比" label-class-name="headerName" class-name="bodyName">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="registerPropor" label="累计注册用户占比" label-class-name="headerName" class-name="bodyName">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="loginUserPropor" label="累计登录用户占比" label-class-name="headerName" class-name="bodyName">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                   class="radio-box"
                   :page-sizes="[20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>
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
        equipTooltip: '安装应用程序的手机型号和浏览器',
        equipTooltipOption:['安装应用程序设备的型号和浏览器','安装应用程序设备的操作系统','安装应用程序设备的运营商','安装应用程序设备的联网方式'],
        loginTooltip: '累计启动过的次数',
        myChart: null,
        radioVal: '1',
        platVal: '-1',
        canalVal: '-1',
        evalVal: "-1",
        start: '',
        end: '',
        token: '',
        chartData: {},
        size: 20,
        currentPage: 1,
        totalCount: 100,
        dateType: '',
        userCount: 0,
        plats: [{
          value: '1',
          label: '全部平台'
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
          val: '-1',
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
        radioValue2: '1',
        options:{
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '60',
            containLabel: true,
          },
          xAxis : [
            {
              type : 'category',
              data : [],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,
                rotate: -20,
                margin: 10
              }
            }
          ],
          yAxis : {
            type: 'value',
            axisLabel: {
              formatter: '{value} /次'
            }
          },
          series : {
              top: 'top',
              name:'累计登录用户数',
              type:'bar',
              barWidth: '60%',
              data:[]
            }
        },
        tableData: [],
        titleArr: ['登录次数','新用户注册数','登录用户数'],
        titleSingle: '累计登录用户数',
        tableName: '设备型号',
        tableNameOption:['设备型号','操作系统','运营商','联网方式']
      }
    },
    components:{
      Calendar
    },
    methods: {
      drawLine(){
        this.myChart = echarts.init(document.getElementById('chart-content'))
        this.myChart.setOption(this.options)

        window.onresize = this.myChart.resize;
      },
      handleSizeChange(val) {
        this.size = val;
        this.getTerminalPages();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTerminalPages();
      },
      getTime(msg,dateType,date){
        if(date){
          this.start = msg.Format("yyyy-MM-dd");
          this.dateType = '';
        }else{
          this.start = new Date().Format("yyyy-MM-dd");
          this.dateType = dateType;
        }
        this.getTerminal();
        this.getTerminalPages();
      },
      initParams: function () {
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.start = start.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
        this.size = 20;
      },
      init:function () {
        this.getTerminal();
        this.getTerminalPages();

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
      getTerminal: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('dateType', this.dateType);
        Params.append('date', this.start);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('versionId', this.evalVal);
        Params.append('terminalAttribute', this.radioVal);
        Params.append('type', parseInt(this.radioValue2));

        this.$http.post(this.$store.state.domain+'/terminal',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.userCount = data.userCount;
            this.myChart.setOption({
              xAxis: {
                data: data.x
              },
              series: [{
                // 根据名字对应到相应的系列
                data: data.y
              }]
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
      getTerminalPages:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('dateType', this.dateType);
        Params.append('date', this.start);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('versionId', this.evalVal);
        Params.append('terminalAttribute', this.radioVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post(this.$store.state.domain+'/terminalPages',Params).then((res)=>{
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
    mounted(){
      this.drawLine();
      this.initParams();
      this.init();
    },
    watch:{
      // 异步请求待用
      platVal: function (val) {
        this.getTerminal();
        this.getTerminalPages();
        this.getEditions();
      },
      canalVal: function (val) {
        this.getTerminal();
        this.getTerminalPages();
      },
      evalVal: function (val) {
        this.getTerminal();
        this.getTerminalPages();
      },
      radioVal: function (val) {
        let value = --val
        this.tableName = this.tableNameOption[value];
        this.equipTooltip = this.equipTooltipOption[value];
        this.getTerminal();
        this.getTerminalPages();
      },
      radioValue2:function (val) {
        this.getTerminal();
        this.titleSingle = this.titleArr[--val];
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Terminal
    margin-top: 40px
    background: #fff
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
    .radio-wrapper
      padding-top: 30px
      text-align: center
      .raido-label
        padding-right: 15px
        font-size: 14px
        color: #1f2d3d
    .user-wrapper
      padding: 30px 20px
      .user-box
        text-align: center
        padding: 20px 16px
        background: #009999
        color: #fff
        border-radius: 4px
        font-size: 16px
    .chart-wrapper
      padding: 0 20px 0 20px
      margin-bottom: 20px
      #chart-content
        width: 100%
        height: 550px
    .raido2-wrapper
      text-align: center
    .table-wrapper
      padding: 20px
      background: #fff
      .table-terminal
        box-sizing: border-box
        background-color: #ffffff
        padding: 0 15px
        width: 100%
        thead
          tr
            padding: 0
            text-align: left
            height: 40px
            line-height: 40px
            border: solid 1px #DFE6EC
            th
              padding: 0 18px
              text-align: right
              color: #1f2d3d
              background-color: #eef1f6
              font-size: 14px
        tbody
          background: #ffffff
          tr
            border: solid 1px #dfe6ec
            height: 40px
            &:hover
              background-color: #EEF1F6
            td
              padding: 0 18px
              text-align: right
              font-size: 14px
        .el-icon-information
          color: #131f0b
</style>
<style lang="sass">
  .headerName
    padding: 0 10px
    text-align: right
  .bodyName
    padding: 0 10px
    text-align: right
  .iconStyle
    display: inline-block
    padding-left: 6px
</style>
