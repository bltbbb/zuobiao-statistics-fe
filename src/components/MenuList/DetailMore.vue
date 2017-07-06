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
          test test test test
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
  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
        value: '1',
        canals: [{
          val: '1',
          label: '全部渠道'
        }],
        val: '1',
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
          {id: "1", title: "出错最多机型", message: 'Foo', number: "8096798"},
          {id: "2", title: "出错最多系统", message: 'Bar', number: "8096798"},
          {id: "3", title: "累计错误次数", message: 'Foo', number: "8096798"},
          {id: "4", title: "累计影响用户数", message: 'Bar', number: "8096798"},
          {id: "5", title: "修复状态", message: 'Foo', number: "8096798"}
        ],
        radio2: 1,
        text: "展开",
        isActive: false,
        currentPage4: 4,
        activeName2: 'first',
        tableData: [{
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
        }]
      }
    }
    ,
    methods: {
      selected: function (gameName) {
        this.activeName = gameName
      }
      ,
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(tab, event) {
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
