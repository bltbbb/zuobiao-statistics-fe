<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        错误明细
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
        <el-select v-model="val" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
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
    <div class="trend-box">
      <div class="part1">
      </div>
      <!--表格-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="日期" width="180">np
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.errNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" >
          <template scope="scope">
            <div class="detail">
              <div class="detail-title">{{ scope.row.name }}</div>
              <div class="detail-box" v-bind:class="{ active: isActive }">{{ scope.row.log }}</div>
              <div class="detail-text">
                <div @click="more">{{text}}</div>
                <div @click="moreLook" class="look">查看详情</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                     class="radio-box"
                     :page-sizes="[20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
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
        value: '1',
        canals: [{
          val: '1',
          label: '全部渠道'
        }],
        val: '1',
        editions: [
          {
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
          {id: "1", title: "登录用户", message: 'Foo', number: "8096798"},
          {id: "2", title: "日活/月活", message: 'Bar', number: "8096798"}
        ],
        radio2: 1,
        // 表格数据
        tableData: [
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          title: "text",
          content: "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市" +
          "普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        }],
        text: "展开",
        isActive: false,
        currentPage4: 1,
        start: '',
        end: '',
        size: 20,
        errId: ''
      }
    }
    ,
    // 平台图表格-->
    mounted() {
//      this.drawLine();
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
        this.errId =  this.$route.query.curerrid;
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.getDetailedPages();
      },

      getDetailedPages () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('errId', this.errId);
        Params.append('pageSize', this.size);
        Params.append('currentPage', this.currentPage4);
        Params.append('EditionId', this.Eval);
        Params.append('channelId', this.val);
        this.$http.post(this.port + '/errorDetailedPages',Params)
          .then( (res) => {
            if (res.status == 200){
              let data = res.data.result.result;
              this.tableData = data;
            }
            else {
              console.log('数据获取失败');
            }

        }, (err) => {
          console.log('err',err)
        });
      },

      // 图表格绘制
      drawLine()
      {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('activeChart'));
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
            data: [5, 20, 36, 10, 10, 20]
          }]

        });
        window.onresize = myChart.resize;
      },
      handleSizeChange(val) {
        this.size = val;
        this.init();
      },
      handleCurrentChange(val) {
        this.currentPage4 = val;
        this.init();
      },
      //获取日历时间
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.init();
      },
      //查看明细
      handleEdit(index, row) {
        this.$router.push({name: 'DetailMore',query:{errId: this.errId}});
      },
      more(){
        if (this.isActive) {
          this.isActive = false;
          this.text = "展开"
        }
        else {
          this.isActive = true;
          this.text = "收起";
        }
      },
      moreLook(){
        this.$router.push({name: 'DetailMore',query:{errId: this.errId}});
      }
    },
    watch: {
      val (channel) {
        this.val = channel;
        this.init();
      },

      Eval (versions) {
        this.Eval = versions
        this.init();
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/error.scss';
</style>

<style scoped lang="scss">
  @media screen and (max-width: 1440px) {
    .title-select-box{
      float: right!important;
      margin-top: 0;
    }
  }
  @media screen and (max-width: 1244px) {
    .title-select-box{
      float: left!important;
      margin-top: 20px;
    }
  }
</style>
