<!--趋势分析-->
<template>
  <div class="trend content-box">
    <div class="header-wrapper">
      <h1>
        趋势分析
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
    <div class="trend-box">
      <div class="part1">
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in list" :key="item.id">
            <div class="grid-content bg-purple">
              <div class="top-title">{{item.title}}
                <el-popover
                  placement="right"
                  width="200"
                  trigger="hover"
                  popper-class="popover-class">
                  <slot>{{item.message}}</slot>
                  <i class="el-icon-information" slot="reference"></i>
                </el-popover>
              </div>
              <h1>{{item.number}}</h1>
            </div>
          </el-col>

        </el-row>
      </div>
      <div id="TendChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <el-radio-group v-model="radio2" class="radio-box">
        <el-radio :label="1">新用户</el-radio>
        <el-radio :label="2">新用户占比</el-radio>
        <el-radio :label="3">老用户</el-radio>
        <el-radio :label="4">老用户占比</el-radio>
        <el-radio :label="5">启动用户</el-radio>
        <el-radio :label="6">启动次数</el-radio>
        <el-radio :label="7">每次使用时长</el-radio>
        <el-radio :label="8">每人使用时长</el-radio>
      </el-radio-group>
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="注册用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="注册用户占比">
        </el-table-column>
        <el-table-column
          prop="address"
          label="登录用户">
        </el-table-column>
        <el-table-column
          prop="address"
          label="登录次数">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                     class="radio-box"
                     :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper"
                     :total="131">
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
        // 第一部分
        list: [
          {id: "1", title: "注册用户", message: '截止到现在登录过的独立用户', number: "8096798"},
          {id: "2", title: "注册用户占比", message: '截止到现在的注册用户占比', number: "8096798"},
          {id: "3", title: "登录用户", message: '截止到现在的注册用户占比', number: "8096798"},
          {id: "4", title: "登录次数", message: '截止到现在的登录次数', number: "8096798"}
        ],
        // 表格数据
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        radio2: 1,
        platVal: '1',
        canalVal: '1',
        evalVal: "1",
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
        let myChart = echarts.init(document.getElementById('TendChart'));
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
            data: [5, 20, 36, 10, 10, 20],
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
        console.log(msg[0].toLocaleDateString(),msg[1].toLocaleDateString())
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
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/trend.scss';

  .popover-class {
    border-radius: 3px;
  }

  .top-title {
    padding-bottom: 8px;
    .el-icon-information {
      display: inline-block;
      margin-left: 5px;
    }
  }
</style>

