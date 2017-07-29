<!--用户属性-->
<template>
  <div class="Users content-box">
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
      <div class="title-select-box" :row="4">
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
    <div class="chart-wrapper">
      <div class="top-wrapper">
        <div id="sexRatio"></div>
        <div id="ageChart"></div>
      </div>
      <div id="industry"></div>
    </div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入饼图组件
  require('echarts/lib/chart/pie');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  import Calendar from '@/components/calendar/Calendar'

  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
        select: "",
        platVal: '-1',
        canalVal: '-1',
        evalVal: '-1',
        plats: [],
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
        sexOptions: {
          title:{
              text: '性别比例',
              x: 'center',
              y: 'top'
          },
          tooltip: {
            trigger: 'item',
            formatter: "比例 <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data:['男','女'],
            formatter: "{name}"
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outer',
                  textStyle: {
                      fontSize: '24'
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 40
                }
              },
              data:[
                {value:68, name:'男'},
                {value:45, name:'女'}
              ]
            }
          ],
          color:['#009999', '#FF9999']
        },
        ageOptions: {
          title:{
            text: '年龄分布',
            x: 'center',
            y: 'top'
          },
          tooltip: {
            trigger: 'item',
            formatter: "<div style='padding: 3px 6px'><span style='display: inline-block;width: 10px;height: 10px;border-radius:50%;background: #009999;margin-right: 5px';></span>{b}:<br/> <span style='padding-left:15px;padding-top: 10px'>{c}%</span></div>"
          },
          xAxis: {
            axisTick: {show: false},
            axisLabel: {
              formatter: 'barGap: \'-100%\''
            },
            show: false
          },
          yAxis: {
            data: [],
            splitLine: {show: false},
            axisLabel: {
              formatter:'{value}',
              margin: 10
            },
            axisLine: {show: false},
            axisTick: {show: false},
          },
          animationDurationUpdate: 1200,
          series: [{
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ddd'
              }
            },
            silent: true,
            barWidth: 19,
            barGap: '-100%', // Make series be overlap
            data: [100, 100, 100, 100, 100, 100, 100]
          }, {
            type: 'bar',
            barWidth: 20,
            z: 10,
            itemStyle: {
              normal: {
                color: '#009999'
              }
            },
            label:{
              normal:{
                show: true,
                position: ['100%', 0],
                offset: [20,0],
                formatter: '{c}%',
                textStyle: {
                  color: '#131f0b'
                }
              }

            },
            data: []
          }]
        },
        indOptions:{
          title:{
            text: '行业分布',
            x: 'center',
            y: 'top'
          },
          tooltip: {
            trigger: 'item',
            formatter: "<div style='padding: 3px 6px'><span style='display: inline-block;width: 10px;height: 10px;border-radius:50%;background: #009999;margin-right: 5px';></span>{b}:<br/> <span style='padding-left:15px;padding-top: 10px'>{c}%</span></div>"
          },
          xAxis: {
            data: [],
            axisTick: {show: false},
            axisLabel: {
              formatter:'{value}',
              interval: 0
            },
            axisLine: {show: false},
          },
          yAxis: {
            show: false,
            splitLine: {show: false},
            axisLabel: {
              formatter:'{value}'
            },
            axisTick: {show: false}
          },
          animationDurationUpdate: 1200,
          series: [{
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ddd'
              }
            },
            silent: true,
            barWidth: 40,
            barGap: '-100%', // Make series be overlap
            data: [100,100,100,100,100,100,100,100,100,100,100,100,100]
          }, {
            type: 'bar',
            barWidth: 40,
            z: 10,
            itemStyle: {
              normal: {
                color: '#009999'
              }
            },
            label:{
              normal:{
                show: true,
                position: 'insideTopRight',
                offset: [5,-25],
                formatter: '{c}%',
                textStyle: {
                  color: '#131f0b'
                }
              }
            },
            data: [],
            barCategoryGap: '5%'
          }]
        },
        sexChart: null,
        ageChart: null,
        indChart: null,
        start: '',
        dateType: '',
        token: ''
      }
    },
    components:{
      Calendar
    },
    methods:{
      //获取日历时间
      //获取日历时间
      getTime(msg,dateType,date){
        if(date){
            this.start = msg.Format("yyyy-MM-dd");
            this.dateType = '';
        }else{
            this.start = new Date().Format("yyyy-MM-dd");
            this.dateType = dateType;
        }
        this.getUserAttr();
      },
      initParams: function () {
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.start = start.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },
      init:function () {
        this.getUserAttr();
        //获取平台
        this.$http.get('http://192.168.1.32/getPlatform',{
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
        this.$http.post('http://192.168.1.32/getEdition',Params).then((res)=>{
          if(res.data.status == 0){
            this.editions = res.data.result.result;
          }
          else{
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      getUserAttr: function () {
          let Params = new URLSearchParams();
          Params.append('adoptToken', this.token);
          Params.append('dateType', this.dateType);
          Params.append('date', this.start);
          Params.append('platformId', this.platVal);
          Params.append('channelId', this.canalVal);
          Params.append('versionId', this.evalVal);

        this.$http.post('http://192.168.1.32/userAttr',Params).then((res)=>{
          if(res.data.status == 0){
            let sexData = res.data.result.result.gender;
            let ageData = res.data.result.result.age;
            let indData = res.data.result.result.industry;
            indData.y = indData.y.map(function (item) {
                return item.toFixed(2);
            })
            this.sexChart.setOption({
              series: [{
                // 根据名字对应到相应的系列
                data:[
                  {value:sexData.y[0], name:sexData.x[0]},
                  {value:sexData.y[1], name:sexData.x[1]}
                ]
              }]
            })
            this.ageChart.setOption({
              yAxis: {
                data: ageData.x
              },
              series: [{
                data: [100, 100, 100, 100, 100, 100, 100]
              },{
                // 根据名字对应到相应的系列
                data: ageData.y
              }]
            })
            this.indChart.setOption({
              xAxis: {
                data: indData.x
              },
              series: [{},{
                // 根据名字对应到相应的系列
                data: indData.y
              }]
            })
          }
          else{
            //view(res.data.msg)
            alert(res.data.msg)
          }
        },(err)=>{
          //view('网络错误')
          this.$message({
            showClose: true,
            message: '网络错误',
            type: 'error',
            duration: 2500
          })
        })
      },
      drawLine(){
        this.sexChart = echarts.init(document.getElementById('sexRatio'));
        this.sexChart.setOption(this.sexOptions);

        this.ageChart = echarts.init(document.getElementById('ageChart'));
        this.ageChart.setOption(this.ageOptions);

        this.indChart = echarts.init(document.getElementById('industry'));
        this.indChart.setOption(this.indOptions);

        window.onresize = this.sexChart.resize;
        window.onresize = this.ageChart.resize;
        window.onresize = this.indChart.resize;
      }
    },
    mounted(){
      this.drawLine();
      this.initParams();
      this.init();
    },
    watch: {
      platVal: function (val) {
        this.getUserAttr();
        this.getEditions();
      },
      evalVal: function (val) {
        this.getUserAttr();
      },
      canalVal: function (val) {
        this.getUserAttr();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Users
    margin-top: 40px
    background: #fff
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
    .chart-wrapper
      margin-top: 20px
      width: 100%
      .top-wrapper
        height: 400px
        margin-bottom: 50px
        #sexRatio
          box-sizing: border-box
          float: left
          border-right: 1px solid #eeeeee
          padding: 20px 0 0 30px
          width: 50%
          height: 100%
        #ageChart
          box-sizing: border-box
          float: right
          padding: 20px 0 0 30px
          width: 50%
          height: 100%
      #industry
        border-top: 1px solid #eeeeee
        width: 100%
        height: 600px
        padding-top: 30px
</style>
