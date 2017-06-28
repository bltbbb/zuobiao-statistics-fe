<!--注册界面-->
<template>
  <div class="content-box">
    <div id="header-box" class="content">
      <div class="page-select">
        <el-select v-model="value" placeholder="注册界面">
          <el-option
            v-for="plat in pages"
            :key="plat.value"
            :label="plat.label"
            :value="plat.value">
          </el-option>
        </el-select>
        <el-button  type="text"><<&nbsp;返回</el-button>
      </div>
      <div class="date-select">
        <!--导航-->
        <el-radio-group v-model="radio3">
          <el-radio-button label="今天"></el-radio-button>
          <el-radio-button label="昨天"></el-radio-button>
          <el-radio-button label="最近7天"></el-radio-button>
          <el-radio-button label="最近30天"></el-radio-button>
          <el-radio-button label="最近60天"></el-radio-button>
          <!--<div class="block">-->
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
          <!--</div>-->
        </el-radio-group>

        <div class="title-select-box">
          <el-select v-model="terrace" placeholder="平台">
            <el-option
              v-for="plat in plats"
              :key="plat.value"
              :label="plat.label"
              :value="plat.value">
            </el-option>
          </el-select>
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


    </div>
    <div id="chart-box" class="content" style="width: 500px;height: 500px;"></div>
    <div id="data-box" class="content">222</div>
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
        msg: 'I am Users',
        pages: [
        {
          value: '1',
          label: '注册界面'
        },
        {
          value: '2',
          label: '注册成功'
        },
        {
          value: '3',
          label: '登录界面'
        },
        {
          value: '4',
          label: '登录成功'
        },
        {
          value: '5',
          label: '找回密码界面'
        },
        {
          value: '6',
          label: '重置密码成功'
        }
        ],
        value: '',

        //  时间选择
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: '',

        radio3: '今天',
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
        terrace: '1',


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
        Eval: "1"
      }
    }

  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content-box {
    margin-top: 40px;
    background-color: #ffffff;
  }
  .content{
    padding-left: 40px;
  }

  /* 顶部导航 */
  #header-box{
    background: #f0f0f0;
    /*padding: 20px 0 40px;*/
    padding-top: 20px;
    padding-bottom: 20px;

  }
  .page-select{
    padding-bottom: 20px;
  }
  .el-button--text{
    float: right;
    margin-right: 20px;
    font-size: 16px;
  }
  .title-select-box{
    float: right;
  }
  .el-radio-button{
    top: -5px;
  }

  /* 图表 */
  #chart-box{
    border: solid 1px red;
    margin-top: 40px;
    background-color: #ffffff;
    color: #ff0;
  }
  /* 数据 */
  #data-box{
    color: #f00;
  }

</style>
