<!--地域分布-->
<template>
  <div class="Map content-box">
    <div class="header-wrapper">
      <h1>
        用户属性
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
    <div class="user-wrapper">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item,index) in list" :key="index">
          <div class="grid-content bg-purple">
            <div class="top-title">{{item.title}}</div>
            <h1>{{item.number}}</h1>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="chart-wrapper">
      <div id="map-chart">
      </div>
      <div class="region-wrapper">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="index" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="region" label="地区" width="180">
          </el-table-column>
          <el-table-column prop="value" label="数量">
          </el-table-column>
          <el-table-column prop="percentage" label="百分比">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="radio-wrapper">
      <el-radio-group v-model="radioVal" class="radio-box">
        <el-radio label="0">注册用户</el-radio>
        <el-radio label="1">登录用户</el-radio>
      </el-radio-group>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData5" style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="地市名称" class="city-name">
                <p v-for="item in props.row.city">{{ item.name }}</p><br>
              </el-form-item>
              <el-form-item label="累计登录用户占比" class="login-percentage">
                <p v-for="item in props.row.city">{{ item.Propor }}%</p>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="地域分布" prop="region">
        </el-table-column>
        <el-table-column label="注册用户" prop="registeredUser">
        </el-table-column>
        <el-table-column label="登录用户" prop="loginUser">
        </el-table-column>
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
  import echarts from 'echarts'
  import axios from 'axios'
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
        list: [
          {id: "1", title: "注册用户", number: "8096798"},
          {id: "2", title: "登录用户", number: "8096798"}
        ],
        select: "",
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
        options: {
          tooltip: {
            trigger: 'item',
            transitionDuration: 0.8,
            showDelay: 0,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: 15,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            textStyle: {
              color: 'rgba(0,0,0,0.9)'
            },
            //formatter: '<div style="padding-bottom:10px;">{b}</div><div><span style="color: #5cc3ff;">累计启动次数: &nbsp;&nbsp;&nbsp;</span>{c}</div>',
            formatter: function (params, ticket, callback) {
                if(!params.value){
                    return `<div style="padding-bottom:10px;">${params.name}</div><div><span style="color: #5cc3ff;">累计启动次数: &nbsp;&nbsp;&nbsp;</span>0</div>`
                }else {
                    return `<div style="padding-bottom:10px;">${params.name}</div><div><span style="color: #5cc3ff;">累计启动次数: &nbsp;&nbsp;&nbsp;</span>${params.value}</div>`
                }
            }
          },
          visualMap: {
            min: 0,
            max: 2000,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true,
            orient: 'horizontal',
            inverse: 'true',
            inRange: {
              color: ['#fff','rgb(0, 119, 254)']
            }
          },
          series: [
            {
//            name: 'iphone3',
              type: 'map',
              mapType: 'china',
              roam: false,
              top: 'top',
              itemStyle: {
                emphasis: {
                  areaColor: '#b86dff'
                }
              },
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true,
                  textStyle: {
                      color: '#fff'
                  }
                }
              },
              data:[]
            }
          ]
        },
        tableDataArr: [],
        tableData:[],
        tableData5: [],
        topTen: [],
        myChart: null,
        radioVal: '0',
        platVal: '1',
        canalVal: '1',
        evalVal: "1",
        start: '',
        end: '',
        token: '',
        chartData: [],
        size: 20,
        currentPage: 1,
        totalCount: 100,
        loginChartData: [],
        regChartData: [],
        loginTableData: [],
        regTableData: []
      }
    },
    components:{
      Calendar
    },
    methods: {
      drawLine(){
          axios.post('/api/getMapData').then((res)=>{
            echarts.registerMap('china', res.data.data);
            this.myChart = echarts.init(document.getElementById('map-chart'))
            this.myChart.setOption(this.options)
          })
      },
      randomData() {
        return Math.round(Math.random()*1000);
      },
      handleSizeChange(val) {
        this.siza = val;
        this.getRegionPages();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRegionPages();
      },
      getTime(msg){
        this.start = msg.Format("yyyy-M-d");
        this.getRegion();
        this.getRegionPages();
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.start = start.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
        this.size = 20;
      },
      init:function () {
        this.getRegion();
        this.getRegionPages();
      },
      getRegion: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('pid', this.platVal);
        Params.append('editionId', this.evalVal);
        Params.append('channelId', this.canalVal);

        //重置
        this.loginChartData = [];
        this.regChartData = [];
        this.chartData = [];
        this.tableDataArr = [];
        this.loginTableData = [];
        this.regTableData = [];


        this.$http.post('http://192.168.1.201:9999/region',Params).then((res)=>{
          if(res.data.status == 0){
            let reginData = res.data.result.result.region;
            let userData = res.data.result.result.UserCount;
            let tableData = res.data.result.result.topTen;
            for (let i=0;i<reginData.length;i++){
                this.loginChartData.push({'name':reginData[i].region,'value':reginData[i].loginUser});
                this.regChartData.push({'name':reginData[i].region,'value':reginData[i].registeredUser})
            }
            for (let i=0;i<tableData.length;i++){
              this.loginTableData.push({'index':i+1,'region':tableData[i].region,'value':tableData[i].loginUser,'percentage':tableData[i].loginUserPropor});
              this.regTableData.push({'index':i+1,'region':tableData[i].region,'value':tableData[i].registeredUser,'percentage':tableData[i].registeredUserPropor})
            }
            this.regChartData.push({name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} });
            this.loginChartData.push({name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} });
            this.chartData.push(this.regChartData);
            this.chartData.push(this.loginChartData);
            this.tableDataArr.push(this.regTableData);
            this.tableDataArr.push(this.loginTableData);
            this.tableData = this.tableDataArr[0];
            this.list[0].number = userData.registeredUser;  //注册用户number
            this.list[1].number = userData.loginUser;   //登录用户number
            this.myChart.setOption({
              series: [{
                // 根据名字对应到相应的系列
                data: this.chartData[0]
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
      getRegionPages:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('pid', this.platVal);
        Params.append('editionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post('http://192.168.1.201:9999/regionPages',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.totalCount = res.data.result.totalCount;
            this.tableData5 = data
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
        this.getRegion();
        this.getRegionPages();
      },
      canalVal: function (val) {
        this.getRegion();
        this.getRegionPages();
      },
      evalVal: function (val) {
        this.getRegion();
        this.getRegionPages();
      },
      radio2: function (val) {
        this.getRegion();
        this.getRegionPages();
      },
      radioVal: function (val) {
        this.tableData = this.tableDataArr[val];
        this.myChart.setOption({
          series: [{
            // 根据名字对应到相应的系列
            data: this.chartData[val]
          }]
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Map
    margin-top: 40px
    background: #fff
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
    .user-wrapper
      padding: 20px
      .el-col
        .grid-content
          border-radius: 4px
          padding: 20px 16px
          color: #fff
          min-height: 60px
        &:nth-child(1)
          .grid-content
            background: #009999
        &:nth-child(2)
          .grid-content
            background: #FF9999
    .chart-wrapper
      box-sizing: border-box
      padding: 20px
      overflow: hidden
      width: 100%
      #map-chart
        box-sizing: border-box
        float: left
        width: 60%
        height: 400px
        padding: 0 20px
      .region-wrapper
        box-sizing: border-box
        float: left
        padding-right: 20px
        width: 40%
    .radio-wrapper
      text-align: center
      padding-top: 20px
    .table-wrapper
      padding: 40px 40px 20px 20px
      .city-name
        float: left
        padding-left: 15px
        margin-bottom: 0
        p
          line-height: 36px
      .login-percentage
        float: right
        text-align: right
        margin-bottom: 0
        p
          line-height: 36px
</style>
<style lang="sass">
  .city-name
    .el-form-item__label
      display: block
      padding: 5px 0 10px 0
    .el-form-item__content
      line-height: 0
  .login-percentage
    .el-form-item__label
      display: block
      padding: 5px 0 10px 0
    .el-form-item__content
      line-height: 0
</style>
