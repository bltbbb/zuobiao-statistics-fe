<!--地域分布-->
<template>
  <div class="Map content-box">
    <div class="header-wrapper">
      <h1>
        地域分布
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
            :key="edition.id+''"
            :label="edition.name"
            :value="edition.id+''">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="user-wrapper">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item,index) in list" :key="index">
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
        <el-radio label="1">登录次数</el-radio>
        <el-radio label="2">注册用户</el-radio>
        <el-radio label="3">登录用户</el-radio>
      </el-radio-group>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData5" style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="地市名称" class="city-name">
                <p v-for="item in props.row.details">{{ item.name }}</p><br>
              </el-form-item>
              <el-form-item label="累计登录用户占比" class="login-percentage">
                <p v-for="item in props.row.details">{{ item.signinUserProp  }}%</p>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="地域分布" prop="name">
        </el-table-column>
        <el-table-column label="注册用户" prop="newUserCount">
        </el-table-column>
        <el-table-column label="注册用户占比" prop="newUserProp">
        </el-table-column>
        <el-table-column label="登录用户" prop="signinUserCount">
        </el-table-column>
        <el-table-column label="登录用户占比" prop="signinUserProp">
        </el-table-column>
        <el-table-column label="登录次数" prop="signinTimesCount">
        </el-table-column>
        <el-table-column label="登录次数占比" prop="signinTimesProp">
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
          {id: "2", title: "登录用户", number: "8096798"},
          {id: "3", title: "登录次数", number: "8096798"}
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
            }
//            ,
//            //formatter: '<div style="padding-bottom:10px;">{b}</div><div><span style="color: #5cc3ff;">累计启动次数: &nbsp;&nbsp;&nbsp;</span>{c}</div>',
//            formatter: function (params, ticket, callback) {
//                if(!params.value){
//                    return `<div style="padding-bottom:10px;">${params.name}</div><div><span style="color: #5cc3ff;">{{charName[0]}} &nbsp;&nbsp;&nbsp;</span>0</div>`
//                }else {
//                    return `<div style="padding-bottom:10px;">${params.name}</div><div><span style="color: #5cc3ff;">{{charName[0]}} &nbsp;&nbsp;&nbsp;</span>${params.value}</div>`
//                }
//            }
          },
          visualMap: {
            min: 1,
            max: 2000,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true,
            orient: 'horizontal',
            inverse: 'true',
            inRange: {
              color: ['#E8F3FF','rgb(0, 119, 254)']
            }
          },
          series: [
            {
              name: 'iphone3',
              type: 'map',
              map: 'china',
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
        radioVal: '1',
        platVal: '-1',
        canalVal: '-1',
        evalVal: "-1",
        start: '',
        dateType: '',
        token: '',
        chartData: [],
        size: 20,
        currentPage: 1,
        totalCount: 100,
        loginChartData: [],
        regChartData: [],
        loginTimesChartData:[],
        loginTableData: [],
        regTableData: [],
        loginTimesTableData:[],
        regionId: 0,
        charName: ['登录次数','注册用户','登录用户']
      }
    },
    components:{
      Calendar
    },
    methods: {
      randomData() {
        return Math.round(Math.random()*1000);
      },
      handleSizeChange(val) {
        this.size = val;
        this.getRegionPages();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRegionPages();
      },
      getTime(msg,dateType,date){
        if(date){
            this.start = msg.Format("yyyy-MM-dd");
            this.dateType = '';
        }else{
            this.start = new Date().Format("yyyy-MM-dd");
            this.dateType = dateType;
        }
        this.getRegion();
        this.getRegionPages();
        this.getStatistics();
      },
      initParams: function () {

        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 *24);
        this.start = start.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
        this.size = 20;
      },
      init:function () {
        this.getRegion();
        this.getRegionPages();
        //获取平台
        this.$http.get(this.$store.state.domain+'/getPlatform',{
          params:{
            adoptToken:this.token
          }
        }).then((res)=>{
          this.plats = res.data.result.result;
        });

        this.getEditions();
        this.getStatistics();
      },
      drawLine(){
        axios.get('../map.json',).then((res)=>{
          echarts.registerMap('china', res.data);
          this.myChart = echarts.init(document.getElementById('map-chart'));
          this.myChart.setOption(this.options)
        })
      },
      getStatistics: function () {
        let Params2 = new URLSearchParams();
        Params2.append('adoptToken', this.token);
        Params2.append('dateType', this.dateType);
        Params2.append('date', this.start);
        Params2.append('platformId', this.platVal);
        Params2.append('channelId', this.canalVal);
        Params2.append('versionId', this.evalVal);
        //获取平台数据
        this.$http.post(this.$store.state.domain+'/regionStatistics',Params2).then((res)=>{
          if(res.data.status == 0){
            this.list[0].number = res.data.result.result.newUserUount;  //注册用户number
            this.list[1].number = res.data.result.result.signinUserCount;  //登录用户number
            this.list[2].number = res.data.result.result.signinTimesCount;  //登录次数number
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
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      getRegion: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('dateType', this.dateType);
        Params.append('date', this.start);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('versionId', this.evalVal);
        Params.append('type', this.radioVal);

        //重置
        this.loginChartData = [{name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} }];
        this.regChartData = [{name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} }];
        this.loginTimesChartData = [{name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} }];
        this.chartData = [];
        this.tableDataArr = [];
        this.loginTableData = [];
        this.regTableData = [];
        this.loginTimesTableData = [];


        this.$http.post(this.$store.state.domain+'/region',Params).then((res)=>{
          if(res.data.status == 0){
            let reginData = res.data.result.result.region;
            let tableData = res.data.result.result.topTen;
            for (let i=0;i<reginData.length;i++){
                var str = reginData[i].name;
                str = str.slice(0,str.length-1);
                this.loginTimesChartData.push({name:str,value:reginData[i].signinTimesCount,title:'登录次数'})
                this.loginChartData.push({name:str,value:reginData[i].signinUserCount,title:'登录用户'});
                this.regChartData.push({name:str,value:reginData[i].newUserCount,title:'注册用户'});
            }
            for (let i=0;i<tableData.length;i++){
              this.loginTimesTableData.push({'index':i+1,'region':tableData[i].name,'value':tableData[i].signinTimesCount,'percentage':tableData[i].signinTimesProp});
              this.regTableData.push({'index':i+1,'region':tableData[i].name,'value':tableData[i].newUserCount,'percentage':tableData[i].newUserProp});
              this.loginTableData.push({'index':i+1,'region':tableData[i].name,'value':tableData[i].signinUserCount,'percentage':tableData[i].signinUserProp});
            }
            this.regChartData.push({name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} });
            this.loginChartData.push({name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} });
            this.loginTimesChartData.push({name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} });
            this.chartData.push(this.loginTimesChartData);
            this.chartData.push(this.regChartData);
            this.chartData.push(this.loginChartData);
            this.tableDataArr.push(this.loginTimesTableData);
            this.tableDataArr.push(this.regTableData);
            this.tableDataArr.push(this.loginTableData);
            this.tableData = this.tableDataArr[this.radioVal-1];
            // this.list[0].number = userData.registeredUser;  //注册用户number
            // this.list[1].number = userData.loginUser;   //登录用户number
            this.myChart.setOption({
              series: [{
                // 根据名字对应到相应的系列
                name: this.charName[this.radioVal-1],
                data: this.chartData[this.radioVal-1]
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
          this.$message.error('网络错误');
        })
      },
      getRegionPages:function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('dateType', this.dateType);
        Params.append('date', this.start);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.canalVal);
        Params.append('versionId', this.evalVal);
        Params.append('type', this.radioVal);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage);

        this.$http.post(this.$store.state.domain+'/regionPages',Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.totalCount = res.data.result.totalCount;
            this.tableData5 = data
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
          this.$message.error('网络错误');
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
        this.getEditions();
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
        this.getRegion();
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
        &:nth-child(3)
          .grid-content
            background: #7A8FE0
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
