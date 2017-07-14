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
        <h1>累计登录用户数</h1>
        <span>8765182</span>
      </div>
    </div>
    <div class="chart-wrapper">
      <div id="chart-content"></div>
    </div>
    <div class="raido2-wrapper">
      <el-radio-group v-model="radioValue2">
        <el-radio label="0">累计登陆用户数</el-radio>
      </el-radio-group>
    </div>
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
              设备型号
              <el-popover
                placement="right"
                width="200"
                trigger="hover"
                popper-class="popover-class">
                <slot>{{equipTooltip}}</slot>
                <i class="el-icon-information" slot="reference"></i>
              </el-popover>
            </th>
            <th>
              累计登录次数
              <el-popover
                placement="right"
                width="200"
                trigger="hover"
                popper-class="popover-class">
                <slot>{{loginTooltip}}</slot>
                <i class="el-icon-information" slot="reference"></i>
              </el-popover>
            </th>
            <th>累计登录次数占比</th>
            <th>累计注册用户占比</th>
            <th>累计登录用户占比</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData">
            <td>{{index+1}}</td>
            <td style="text-align: left;">{{item.name}}</td>
            <td>{{item.loginSize}}</td>
            <td>{{item.loginPropor}}</td>
            <td>{{item.registerPropor}}</td>
            <td>{{item.loginUserPropor}}</td>
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
        equipTooltip: '这是菜单的说明文字',
        loginTooltip: '这是菜单的说明文字',
        myChart: null,
        radioVal: '1',
        platVal: '1',
        canalVal: '1',
        evalVal: "1",
        start: '',
        end: '',
        token: '',
        chartData: {},
        size: 20,
        currentPage: 1,
        totalCount: 100,
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
        radioValue2: '0',
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
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s', 'iPhone4s'],
              axisTick: {
                alignWithLabel: true
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
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[1000, 4100, 200, 300, 900, 300, 200, 900, 300, 2020]
            }
        },
        tableData: []
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
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getTerminal();
        this.getTerminalPages();
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
        this.getTerminal();
        this.getTerminalPages();
      },
      getTerminal: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('PlatformId', this.platVal);
        Params.append('editionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('terminalAttribute', this.radioVal);

        this.$http.post('http://192.168.1.201:9999/terminal',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
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
            alert(res.data.msg)
          }
        },(err)=>{
          //view('网络错误')
          alert('网络错误')
        })
      },
      getTerminalPages:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('PlatformId', this.platVal);
        Params.append('editionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('terminalAttribute', this.radioVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post('http://192.168.1.201:9999/terminalPages',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.totalCount = res.data.result.totalCount;
            this.tableData = data;
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
    mounted(){
      this.drawLine();
      this.initParams();
      this.init();
    },
    watch:{
      // 异步请求待用
      platVal: function (val) {
        this.siza = val;
        this.getTerminal();
        this.getTerminalPages();
      },
      canalVal: function (val) {
        this.siza = val;
        this.getTerminal();
        this.getTerminalPages();
      },
      evalVal: function (val) {
        this.siza = val;
        this.getTerminal();
        this.getTerminalPages();
      },
      radioVal: function (val) {
        this.siza = val;
        this.getTerminal();
        this.getTerminalPages();
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
      padding: 0 20px 20px 20px
      #chart-content
        width: 100%
        height: 500px
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
