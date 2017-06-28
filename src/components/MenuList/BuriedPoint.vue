<!--埋点分析-->
<template>
  <!--tabe-->
  <div class="ActiveUsers content-box">
    <div class="header-wrapper"><h1>埋点分析<i class="el-icon-information"></i></h1></div>
    <div class="title-box">
    <!--导航-->
    <el-radio-group v-model="radio3">
      <el-radio-button label="今天"></el-radio-button>
      <el-radio-button label="昨天"></el-radio-button>
      <el-radio-button label="最近60天"></el-radio-button>
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </div>
    </el-radio-group>
    <div class="title-select-box">
      <el-select v-model="value" placeholder="平台">
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

    <!--页面名称列表-->
    <el-table v-on:row-click="handleRowHandle($event)" :data="tableData" borderstyle="width: 100%">
      <el-table-column class="mf-1" prop="incidentName" label="事件名称" width="180"></el-table-column>
      <el-table-column prop="incidentId" label="事件Id" width="180" ></el-table-column>
      <el-table-column prop="incidentNumber" label="事件数量（日均）"></el-table-column>
      <el-table-column prop="userNumer" label="触发用户数（日均）"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {

        //  页面列表
        tableData: [
          {
          incidentName: '注册界面',
          incidentId: '1',
          incidentNumber: 6000,
          userNumer: 6000
        },
        {
          incidentName: '注册成功',
          incidentId: '1',
          incidentNumber: 6000,
          userNumer: 6000
        },
        {
          incidentName: '登录界面',
          incidentId: '1',
          incidentNumber: 6000,
          userNumer: 6000
        },
        {
          incidentName: '登录成功',
          incidentId: '1',
          incidentNumber: 6000,
          userNumer: 6000
        },
        {
          incidentName: '找回密码界面',
          incidentId: '1',
          incidentNumber: 6000,
          userNumer: 6000
        },
        {
          incidentName: '重置密码成功',
          incidentId: '1',
          incidentNumber: 6000,
          userNumer: 6000
        }],
        activeIndex: '1',
        activeIndex2: '1',

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
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      handleRowHandle (event) {

        let testName = event.incidentName;
        if (testName == '注册界面') {
          this.$router.push({name: 'AnalysisRegister'});
        }
        console.log(event.incidentName)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';
  .incident-title{
    display: block;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .block{
    display: inline-block;

  }
  .el-radio-button{
    top: -5px;
  }
  .content-box {
    margin-top: 40px;
    background: #f0f0f0;
    padding: 0;
  }
/*  .title-box {
    background: #f0f0f0;
    padding: 20px;
    margin-bottom: 20px;

  }*/
  .title-select-box {
    float: right;
  }
</style>
