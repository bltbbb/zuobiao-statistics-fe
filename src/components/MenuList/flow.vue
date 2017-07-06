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
      <el-input v-model="searchName" class="searchInput" label-width="50px" placeholder="搜索账号或昵称" icon="search"></el-input>
      <div class="title-select-box">
        <el-select v-model="value" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.value"
            :label="plat.label"
            :value="plat.value">
          </el-option>
        </el-select>
        <el-select v-model="Eval" placeholder="版本">
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
      <div class="flow-chart">
        <div id="myChart"></div>
        <div class="radio-wrapper">
          <el-radio-group v-model="radioValue" class="radio-box">
            <el-radio label="1">总流量</el-radio>
            <el-radio label="2">WiFi流量</el-radio>
            <el-radio label="3">3G/4G流量</el-radio>
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
        <el-table-column label="账号" prop="email" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="昵称" prop="user" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="首次登录时间" prop="time" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="总流量" prop="all" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="WiFi流量占比" prop="wifi" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="3G/4G流量占比" prop="g" label-class-name="table2-head">
        </el-table-column>
        <el-table-column label="操作系统" prop="sys" label-class-name="table2-head">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                   class="radio-box"
                   :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper"
                   :total="100">
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
        value: '1',
        editions: [{
          Eval: '1',
          label: '全部版本'
        },
          {
            Eval: '2',
            label: '1.4'
          }],
        Eval: "1",
        // 第一部分
        list: [
          {id: "1", title: "群聊上行消息数",name:"昨日", number: "8096798"},
          {id: "2", title: "群聊下行消息数",name:"昨日", number: "8096798"}
        ],
        radio2: 1,
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
        ],
        radioValue: '2',
        currentPage4: 4
      }
    }
    ,
    // 平台图表格-->
    mounted()
    {
      this.drawLine();
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
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
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
                  color: 'rgba(199, 237, 250,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(199, 237, 250,0.2)'
                }], false)
              }
            },
            itemStyle: {
              normal: {
                color: '#58c8da'
              }
            }
          }]

        });
        window.onresize = myChart.resize;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //获取日历时间
      getTime(msg){
        console.log(msg)
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
        width: 20%
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
</style>
