<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        错误报告
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
      </div>
      <div id="activeChart" class="chart" :style="{width: '100%', height: '400px'}"></div>
      <el-radio-group v-model="radio2" class="radio-box">
        <el-radio :label="1">错误次数</el-radio>
      </el-radio-group>
      <!--     <Calendar @timeValue="getTableTime" class="calendar-box"></Calendar>-->
      <!--表格-->
      <el-table
        :data="tableData5"
        style="width: 100%">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column type="expand" class="expand-box">
          <template scope="props">

            <el-form label-position="left" inline class="table-expand">

              <el-table :data="tableData5" style="width: 100%">
                <el-table-column label="错误设备" prop="shop">
                </el-table-column>
                <el-table-column label="错误次数" prop="shop">
                </el-table-column>
                <el-table-column label="占比" prop="shop">
                </el-table-column>
              </el-table>

            </el-form>

          </template>
        </el-table-column>

        <el-table-column
          label="错误类型" prop="id">

          <template scope="scope" >
            <span @click="handleLook(scope.$index, scope.row)" class="text-color">{{ scope.row.id }} </span>
          </template>

        </el-table-column>

        <el-table-column
          label="优先级"
          prop="priority"
          >
        </el-table-column>

        <el-table-column
          label="错误次数"
          prop="errorNum">
        </el-table-column>

        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleLook(scope.$index, scope.row)">查看明细
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                     class="radio-box"
                     :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper"
                     :total="100">
      </el-pagination>
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
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        port: 'http://192.168.1.201:9999',
        explain: '这是菜单的说明文字',
        platVal: '1',
        canalVal: '1',
        evalVal: '1',
        canals: [{
          val: '1',
          label: '全部渠道'
        }],
        plats: [
          {
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
        editions: [
          {
          Eval: '1',
          label: '全部版本'
        },
          {
            Eval: '2',
            label: '1.4'
          }],
        radio2: 1,
        //  图表
        myChart:null,
        xAxisData: [],
        seriesData: [],
        // 表格数据
        tableData5: [
          {
            id: '12987122',  //  等级
            name: '1',    //  优先级
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',  //  次数
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            Equipment: [
             { Propor:10.5,
              equipment:"iPhone 5s",
              errorNum:100
             }
            ]
          }
        ],
        currentPage4: 1,
        token: '',
        start: '',
        end: ''
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


      initParams () {
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.getReporting();
        this.getType();
      },

      //  图表函数
      getReporting () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('EditionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        this.$http.post(this.port + '/errorReporting',Params).then((res)=>{
          if(res.status == 200){
            this.xAxisData = res.data.result.result.x;
            this.seriesData = res.data.result.result.y;
            this.myChart.setOption({
              xAxis: {
                data: this.xAxisData
              },
              series: [{
                name: '注册用户',
                type: 'line',
                data: this.seriesData
              }]
            })
          }
          else{
            //view(res.data.msg)
            console.log('获取数据失败');
            console.log('err',err);
          }
        },(err)=>{
          //view('网络错误')
          console.log('err',err);
//          alert('网络错误')
        })
      },

      // 错误类型
      getType () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('EditionId', this.evalVal);
        Params.append('channelId', this.canalVal);
        this.$http.post(this.port + '/errorType',Params)
        .then( (res) => {
          if (res.status == 200) {
            let errorDataList = res.data.result.result;
            for (let index in errorDataList) {
              if (errorDataList[index].priority == 1) {
                errorDataList[index].priority = '高'
              }
              else if (errorDataList[index].priority == 2) {
                errorDataList[index].priority = '中'
              }
              else if (errorDataList[index].priority == 3) {
                errorDataList[index].priority = '低'
              }
            }
//            this.tableData5 = errorDataList;
          }
          else {
            console.log('数据获取失败');
          }
        }, (err) => {
          console.log('数据获取失败');
          console.log('err',err);
        })
      },


      // 图表格绘制
      drawLine()
      {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('activeChart'));
        // 绘制图表
        this.myChart.setOption({
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
            data: [5, 20, 36, 10, 10, 20]
          }]

        });
        window.onresize = this.myChart.resize;
      },

      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
      },
      //获取日历时间
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
//        console.log(msg)
      },
      getTableTime(msg){
//        console.log(msg)
      },
      //查看明细
      handleLook(index, row) {
//        console.log(index, row);
        this.$router.push({name: 'ErrorDetail',params:{curerrid:row.id}});
      }
    },


    watch:{
      // 异步请求待用
      platVal: function (val) {
//        console.log(val)
      },
      canalVal: function (val) {
//        console.log(val)
      },
      evalVal: function (val) {
//        console.log(val)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/error.scss';
</style>
