<!--流量分析-->
<template>
  <div class="flow">
    <div class="header-wrapper">
      <h1>
        流量分析
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
      <el-input v-model="searchName" class="searchInput" placeholder="搜索账号或昵称" icon="search"></el-input>
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
    <div class="flow-box">
      <div class="tab1">
        <div class="tab1-wrapper">
          <el-table :data="tableData" style="width: 100%" @row-click="rowClick">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="totalFlow" label="总流量">
            </el-table-column>
            <el-table-column prop="WifiPropor" label="WiFi流量占比" :formatter="perFormat">
            </el-table-column>
            <el-table-column prop="phonePropor" label="3G/4G流量占比" :formatter="perFormat">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="flow-chart">
        <div id="myChart"></div>
        <div class="radio-wrapper">
          <el-radio-group v-model="radioVal" class="radio-box">
            <el-radio label="total">总流量</el-radio>
            <el-radio label="wifi">WiFi流量</el-radio>
            <el-radio label="flow">3G/4G流量</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="flow-table2-wrapper">
      <el-table :data="tableData5" style="width: 100%" class="table2" row-class-name="head-name">
        <el-table-column type="expand">
          <template scope="props">
            <table class="inner-table">
              <thead>
              <tr>
                <th>文本流量</th>
                <th>短语音流量</th>
                <th>图片流量</th>
                <th>文件流量</th>
                <th>短视频流量</th>
                <th>语音通话流量</th>
                <th>视频通话流量</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ props.row.text }}</td>
                <td>{{ props.row.sVioce }}</td>
                <td>{{ props.row.img }}</td>
                <td>{{ props.row.file }}</td>
                <td>{{ props.row.sVideo }}</td>
                <td>{{ props.row.vioce }}</td>
                <td>{{ props.row.video }}</td>
              </tr>
              </tbody>
            </table>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="account" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="昵称" prop="name" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="首次登录时间" prop="firstLogin" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="总流量" prop="totalFlow" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="WiFi流量占比" prop="WifiPropor" label-class-name="table2-head" :formatter="perFormat">
        </el-table-column>
        <el-table-column label="3G/4G流量占比" prop="phonePropor" label-class-name="table2-head" :formatter="perFormat">
        </el-table-column>
        <el-table-column label="操作系统" prop="system" label-class-name="table2-head">
        </el-table-column>
      </el-table>
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
  // 引入折现图组件
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
        chatType:"单聊",
        myChart: null,
        charData: [],
        radioVal: 'total',
        platVal: '-1',
        canalVal: '-1',
        evalVal: "-1",
        userId: 1,
        start: '',
        end: '',
        token: '',
        textMaps: {
          'total': '总流量',
          'wifi': 'WIFI',
          'flow': '3G/4G流量'
        },
        chartData: {},
        size: 20,
        currentPage: 1,
        totalCount: 100,
        plats: [{
          value: '-1',
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
          val: '-1',
          label: '全部渠道'
        }],
        editions: [{
          Eval: '-1',
          label: '全部版本'
        },
          {
            Eval: '2',
            label: '1.4'
          }],
        // 第一部分
        list: [
          {id: "1", title: "群聊上行消息数",name:"昨日", number: "8096798"},
          {id: "2", title: "群聊下行消息数",name:"昨日", number: "8096798"}
        ],
        checked: true,
        searchName: '',
        tableData:[
          {index:1,region:'北京',value:'13551',percentage:'13.05%'},
          {index:2,region:'北京',value:'13551',percentage:'13.05%'},
          {index:3,region:'北京',value:'13551',percentage:'13.05%'},
          {index:4,region:'北京',value:'13551',percentage:'13.05%'},
          {index:5,region:'北京',value:'13551',percentage:'13.05%'},
          {index:6,region:'北京',value:'13551',percentage:'13.05%'},
          {index:7,region:'北京',value:'13551',percentage:'13.05%'},
          {index:8,region:'北京',value:'13551',percentage:'13.05%'},
          {index:9,region:'北京',value:'13551',percentage:'13.05%'},
          {index:10,region:'北京',value:'13551',percentage:'13.05%'}
        ],
        tableData5: [
          {id: '12987122', email: 'mht@qq.com', user: '微信-张小龙', time: '2017-6-22  19:23:38', all:'130M', wifi: '60%', g: '40%',sys: 'Android'
            , text: '5M',sVioce: '3M', img: '20M', file: '9M', sVideo: '15M', vioce: '25M', video: '30M' },
          {id: '12987122', email: 'mht@qq.com', user: '微信-张小龙', time: '2017-6-22  19:23:38', all:'130M', wifi: '60%', g: '40%',sys: 'Android'
            , text: '5M',sVioce: '3M', img: '20M', file: '9M', sVideo: '15M', vioce: '25M', video: '30M' },
          {id: '12987122', email: 'mht@qq.com', user: '微信-张小龙', time: '2017-6-22  19:23:38', all:'130M', wifi: '60%', g: '40%',sys: 'Android'
            , text: '5M',sVioce: '3M', img: '20M', file: '9M', sVideo: '15M', vioce: '25M', video: '30M' },
          {id: '12987122', email: 'mht@qq.com', user: '微信-张小龙', time: '2017-6-22  19:23:38', all:'130M', wifi: '60%', g: '40%',sys: 'Android'
            , text: '5M',sVioce: '3M', img: '20M', file: '9M', sVideo: '15M', vioce: '25M', video: '30M' },
          {id: '12987122', email: 'mht@qq.com', user: '微信-张小龙', time: '2017-6-22  19:23:38', all:'130M', wifi: '60%', g: '40%',sys: 'Android'
            , text: '5M',sVioce: '3M', img: '20M', file: '9M', sVideo: '15M', vioce: '25M', video: '30M' }
        ]
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
      // 图表格绘制
      drawLine()
      {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        this.myChart.setOption({
          title: {
              text: '用户1',
              textStyle: {
                  color: '#666666',
                  fontSize: '16',
                  fontWeight: '600'
              },
              x: '50'
          },
          grid: {
            x: '10%',
            top: '10%',
            bottom: '8%',
            right: '5%'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: ["00:00", "5月18日","5月21日","5月24日","5月27日","5月30日","6月2日","6月5日","6月8日","6月11日"]
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '所有平台',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 10, 10, 20, 13],
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
      perFormat(row, column){
        return row.WifiPropor + '%'
      },
      //获取日历时间
      getTime(msg){
        console.log(msg)
      },
      handleSizeChange(val) {
        this.size = val;
        this.getFlowAnalyzePages();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getFlowAnalyzePages();
      },
      rowClick(obj){
        this.userId = obj.id;
        this.getUserFlow();
      },
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getFlowAnalyzeTopten();
        this.getUserFlow();
        this.getFlowAnalyzePages();
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
        this.getFlowAnalyzeTopten();
        this.getUserFlow();
        this.getFlowAnalyzePages();
      },
      getFlowAnalyzeTopten: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('channelId', this.canalVal);

        this.$http.post(this.$store.state.domain+'/flowAnalyzeTopten',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.tableData = data;
            this.userId = data[0].id;
          }
          else if(res.data.status == 1){
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          console.log(err+' 123')
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      getUserFlow: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('userId', this.userId);

        this.$http.post(this.$store.state.domain+'/userFlow',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.chartData.total = data.total;
            this.chartData.wifi = data.wifi;
            this.chartData.flow = data.flow;
            this.myChart.setOption({
              xAxis: {
                data: this.chartData.flow.x
              },
              series: [{
                // 根据名字对应到相应的系列
                name: this.textMaps['total'],
                data: this.chartData.flow.y
              }]
            })
          }
          else if(res.data.status == 1){
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      getFlowAnalyzePages: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.platVal);
        Params.append('versionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('userId', this.userId);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post(this.$store.state.domain+'/flowAnalyzePages',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.tableData5 = data;
          }
          else if(res.data.status == 1){
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      }
    },
    watch:{
      // 异步请求待用
      platVal: function (val) {
        console.log(val)
      },
      canalVal: function (val) {
        console.log(val)
      },
      evalVal: function (val) {
        console.log(val)
      },
      radio2: function (val) {
        console.log(val)
      },
      radioVal: function (val) {
        this.myChart.setOption({
          xAxis: {
            data: this.chartData[val].x
          },
          series: [{
            // 根据名字对应到相应的系列
            name: this.textMaps[val],
            data: this.chartData[val].y
          }]
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .flow
    margin-top: 40px
    background: #fff
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
      .chat
        float: left
        margin-right: 10px
      .searchInput
        float: left
        width: 10%
        min-width: 160px
        margin-left: 10px
    .flow-box
      box-sizing: border-box
      overflow: hidden
      margin: 20px
      padding-bottom: 40px
      border-bottom: 1px solid #eee
      .tab1
        float: left
        width: 40%
        .tab1-wrapper
          width: 100%
          .cell
            word-break: normal
      .flow-chart
        float: left
        width: 60%
        height: 400px
        #myChart
          width: 100%
          height: 400px
        .radio-box
          margin-bottom: 0
    .checkbox-wrapper
      padding-top: 30px
      text-align: center
    .flow-table2-wrapper
      padding: 20px
      .inner-table
        width: 100%
        border: 1px solid #dfe6ec
        text-align: center
        th
          text-align: center
</style>
<style lang="sass">
  .flow-table2-wrapper
    .head-name
      text-align: center
    .table2-head
      text-align: center
    .el-table__expanded-cell
      padding-left: 120px
    .el-form-item__label
      padding: 0 0 10px 0
      display: block
    .el-form-item
      text-align: center
      margin-right: 50px
      margin-bottom: 0
  .tab1-wrapper
    .cell
      word-break: normal
</style>
