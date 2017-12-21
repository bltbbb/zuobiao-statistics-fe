<!--活跃用户-->
<template>
  <div class="ActiveUsers content-box">
    <div class="header-wrapper">
      <h1>
        活跃用户
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
    <div class="trend-box">
      <div class="part1">
      </div>
      <div id="activeChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <el-radio-group v-model="radioVal" class="radio-box">
        <el-radio label="signinUserCount">日活跃用户</el-radio>
        <!--8-15需求去掉-->
        <!--<el-radio label="dayMonthRatio">日活/月活</el-radio>-->
      </el-radio-group>
 <!--     <Calendar @timeValue="getTableTime" class="calendar-box"></Calendar>-->
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="signinUserCount"
          label="日活跃用户">
        </el-table-column>
        <!--8-15需求去掉-->
        <!--<el-table-column-->
          <!--prop="dayMonthRatio"-->
          <!--label="日活/月活">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="weekUserCount"
          label="周活跃用户">
        </el-table-column>
        <el-table-column
          prop="monthUserCount"
          label="月活跃用户">
        </el-table-column>
        <!--8-15需求去掉-->
        <!--<el-table-column-->
          <!--prop="monthSilentUserount"-->
          <!--label="月沉默用户">-->
        <!--</el-table-column>-->
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
        // 第一部分
        list: [
          {id: "1", title: "日活跃用户", message: 'Foo', number: "8096798"},
          {id: "2", title: "日活/月活", message: 'Bar', number: "8096798"}
        ],
        title: {signinUserCount:'日活跃用户',dayMonthRatio:'日活/月活'},
        // 表格数据
        tableData: [],
        myChart: null,
        radioVal: 'signinUserCount',
        platVal: '-1',
        canalVal: '-1',
        evalVal: "-1",
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
        this.myChart = echarts.init(document.getElementById('activeChart'));
        // 绘制图表
        this.myChart.setOption({
          title: {text: '日活跃用户'},
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '注册用户',
            type: 'line',
            data: [],
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
        this.size = val;
        this.getActiveUserPages();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getActiveUserPages();
      },
      //获取日历时间
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getActiveUser();
        this.getActiveUserPages();
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
        this.size = 20;
      },
      init:function () {
        this.getActiveUser();
        this.getActiveUserPages();

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
          else if(res.data.status == 1){
            this.$message.error('请求错误！');
          }
          else if(res.data.status == 2){
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录！');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
          else if(res.data.status == 3){
            this.$message.error('没有权限！');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('接口异常！请联系管理员！');
        })
      },
      getActiveUser: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('versionId', this.evalVal);

        this.$http.post(this.$store.state.domain+'/activeUser',Params).then((res)=>{
          if(res.data.status == 0){
            this.chartData = res.data.result.result;
            this.myChart.setOption({
              xAxis: {
                data: this.chartData[this.radioVal].x
              },
              series: [{
                // 根据名字对应到相应的系列
                name: this.title[this.radioVal],
                data: this.chartData[this.radioVal].y
              }]
            })
          }
          else if(res.data.status == 1){
            this.$message.error('请求错误！');
          }
          else if(res.data.status == 2){
            this.$message.error('登录过期，请重新登录！');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
          else if(res.data.status == 3){
            this.$message.error('没有权限！');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('接口异常！请联系管理员！');
        })
      },
      getActiveUserPages:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('versionId', this.evalVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post(this.$store.state.domain+'/activeUserPages',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.totalCount = res.data.result.totalCount;
            this.tableData = data;
          }
          else if(res.data.status == 1){
            this.$message.error('请求错误！');
          }
          else if(res.data.status == 2){
            this.$message.error('登录过期，请重新登录！');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
          else if(res.data.status == 3){
            this.$message.error('没有权限！');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('接口异常！请联系管理员！');
        })
      }
    },
    watch:{
      // 异步请求待用
      platVal: function (val) {
        this.getActiveUser();
        this.getActiveUserPages();
        this.getEditions();
      },
      canalVal: function (val) {
        this.getActiveUser();
        this.getActiveUserPages();
      },
      evalVal: function (val) {
        this.getActiveUser();
        this.getActiveUserPages();
      },
      radioVal: function (val) {
        this.myChart.setOption({
          title: {
            text: this.title[this.radioVal]
          },
          xAxis: {
            data: this.chartData[val].x
          },
          series: [{
            // 根据名字对应到相应的系列
            name: this.title[this.radioVal],
            data: this.chartData[val].y
          }]
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/trend.scss';
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
