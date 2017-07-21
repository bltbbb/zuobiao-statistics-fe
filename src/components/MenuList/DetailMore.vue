<!--错误报告-->
<template>
  <div class="Error content-box">
    <div class="header-wrapper">
      <h1>
        错误详情
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

      <versiongetdata
        @Platform="childgetPlatform"
        @getEdition1="childgetEdition1"
        @changeVal="childplatVal1"
        @changeEvalVal="childchangeEvalVal"
        @canalVal1="childcanalVal1"
      >
      </versiongetdata>

    </div>
    <div class="trend-box">
      <div class="part1">
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in list" :key="item.id">
            <div class="grid-content bg-purple">
              <div class="top-title">{{item.title}}
                <el-popover
                  placement="bottom"
                  v-bind:title="item.message"
                  width="200"
                  trigger="hover">
                  <i class="el-icon-information" slot="reference"></i>
                </el-popover>
              </div>
              <h1>{{item.number}}</h1>
            </div>
          </el-col>

        </el-row>
      </div>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="错误日志" name="first">
          {{ login }}
        </el-tab-pane>
        <el-tab-pane label="按机型分布" name="second">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="错误次数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="占比">
            </el-table-column>
            <el-table-column
              prop="address"
              label="影响用户数">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="按系统分布" name="third">
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="错误次数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="占比">
            </el-table-column>
            <el-table-column
              prop="address"
              label="影响用户数">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="按版本分布" name="fourth">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="错误次数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="占比">
            </el-table-column>
            <el-table-column
              prop="address"
              label="影响用户数">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="按本地时间" name="five">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="错误次数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="占比">
            </el-table-column>
            <el-table-column
              prop="address"
              label="影响用户数">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!--表格-->
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
  import versiongetdata from '../versionInformation/VersionGetData'
  export default {
    data() {
      return {
//        port: 'http://192.168.1.201:9999',
        port: 'http://192.168.1.32:80',
        token: '',
        errId: '',
        explain: '这是菜单的说明文字',

        platVal: '',
        evalVal: '',
        canalVal: '',

        getEditionId: '',
        value: '1',
        // 第一部分
        list: [
          {id: "1", title: "出错最多机型", message: 'Foo', number: "8096798"},
          {id: "2", title: "出错最多系统", message: 'Bar', number: "8096798"},
          {id: "3", title: "累计错误次数", message: 'Foo', number: "8096798"},
          {id: "4", title: "累计影响用户数", message: 'Bar', number: "8096798"},
          {id: "5", title: "修复状态", message: 'Foo', number: "8096798"}
        ],
        //  table部分
        login: "111111111111111111111",
        radio2: 1,
        text: "展开",
        isActive: false,
        currentPage4: 1,
        activeName2: 'first',
        size: 20,
        tableData: [
          {
          id: '1',
          name: '2',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: '4',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: '5',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData1: [
          {
            id: '1d',
            name: '2asdf',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '3',
            name: '王小虎asdf',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id: '4',
            name: '王小虎asdf',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: '5',
            name: '王小虎fsda',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    components: {
      versiongetdata
    },
    mounted () {
      this.initParams();
      this.init();
    },
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      },
      initParams () {
        this.errId =  this.$route.query.errId;
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.getDetailed();
      },

      //  平台信息
      childgetPlatform (plats) {
        this.platVal = plats;
      },

      childplatVal1 (childplatVal1) {
        this.platVal = childplatVal1;
//        this.getReporting();
//        this.getType();
      },

      //  版本信息
      childgetEdition1 (childgetEdition1) {
        this.evalVal = childgetEdition1;
      },

      childchangeEvalVal (childchangeEvalVal) {
        this.evalVal = childchangeEvalVal;
//        this.getReporting();
//        this.getType();
      },

      //  渠道信息
      childcanalVal1 (canalVal) {
        this.canalVal = canalVal * 1;
      },

      //  获取平台信息
      getPlatform () {
        this.$http.get(this.port + '/getPlatform', {
          params:{
            adoptToken: this.token
          }
        }).then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              let data = res.data.result.result;
              this.plats = data;
            }
            else if (res.data.status == 1) {
              console.log('平台信息请求数据为空');
            }
          }
          else{
            console.log('请求失败');
          }
        }, (err) => {
          console.log('获取失败');
          console.log('err',err);
        });
      },

      //  获取版本信息
      getEdition () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('appPlatId', this.platVal)
        this.$http.post(this.port + '/getLogOrEventEdition',Params)
          .then( (res) => {
            if (res.status == 200) {
              if (res.data.status == 0) {
                let data = res.data.result.result;
                this.editions = data;
                this.getEditionId = data[0].appVersionId;
              }
              else if (res.data.status == 1) {
                console.log('版本信息请求数据为空');
              }
            }
            else{
              console.log('请求失败');
            }
          }, (err) => {
            console.log('获取失败');
            console.log('err',err);
          });
      },


      getDetailed () {
        let Params = new URLSearchParams();
        Params.append('adoptToken',this.token);
        Params.append('id',this.errId);
        this.$http.post(this.port + '/errorDetailed',Params)
          .then( (res) => {
          console.log(res)
        }, (err) => {
          console.log('err',err)
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(tab, event) {
        alert(1)
        console.log(tab, event);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  @import '../../assets/css/page/error.scss';
</style>
