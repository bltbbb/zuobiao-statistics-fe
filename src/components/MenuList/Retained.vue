<!--留存用户-->
<template>
  <div class="Retained content-box">
    <div class="header-wrapper"><h1>留存用户<i class="el-icon-information"></i></h1></div>
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane v-for="(tab,index) in tabs" :key="index">
          <span slot="label"><i class="el-icon-date"></i> {{tab.plat}}</span>
          <div class="Picker-wrapper">
            <div class="datePicker">
              <el-date-picker popper-class="pickerBlock" v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="platPicker">
              <div class="platform">
                <el-select v-model="select" slot="prepend" placeholder="全部平台">
                  <el-option label="IOS" value="1"></el-option>
                  <el-option label="Android" value="2"></el-option>
                  <el-option label="PC" value="3"></el-option>
                  <el-option label="WEB" value="4"></el-option>
                </el-select>
              </div>
              <div class="channel">
                <el-select v-model="select" slot="prepend" placeholder="全部渠道">
                  <el-option label="渠道1" value="1"></el-option>
                  <el-option label="渠道2" value="2"></el-option>
                  <el-option label="渠道3" value="3"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="table-wrapper">
            <table>
              <tr class="line">
                <td class="retain grey-bg">首次使用时间</td>
                <td class="retain grey-bg">注册用户</td>
                <td class="retain grey-bg">第二天</td>
                <td class="retain grey-bg">第三天</td>
                <td class="retain grey-bg">第四天</td>
                <td class="retain grey-bg">第五天</td>
                <td class="retain grey-bg">第六天</td>
                <td class="retain grey-bg">第七天</td>
                <td class="retain grey-bg">第八天</td>
              </tr>
              <tr class="line" v-for="item in tableDataList">
                <td class="grey-bg">{{item.date}}</td>
                <td class="grey-bg">{{item.regUser}}</td>
                <td v-for="list in item.Retention" :class="'td-retain-'+classMap(list)" class="boderNone">{{list}}%</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        select: "",
        //日期快捷
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',

        // 平台切换
        tabs: [
            {id: "1", plat: '新增用户首次使用留存'},
            {id: "1", plat: '活跃用户留存'}
          ],
        tableDataList: [
          {date:"2017/05/19",regUser:"999",Retention:["30","20","17","14","9","6","1"]},
          {date:"2017/05/19",regUser:"1009",Retention:["40","23","27","19","13","2","8.6"]},
          {date:"2017/05/19",regUser:"658",Retention:["32.1","20.6","19.8","14.5","10.9","6.7","3.2"]}
        ]
      }
    },
    methods:{
      classMap(data){
          data = parseInt(data)
          if(data<=10 && data>=0){
              return '0-10'
          }else if(data<=20 && data> 10){
              return '10-20'
          }else if(data<=30 && data> 20){
            return '20-30'
          }else if(data<=40 && data> 30){
            return '30-40'
          }else if(data<=50 && data> 40){
            return '40-50'
          }else if(data<=60 && data> 50){
            return '50-60'
          }else if(data<=70 && data> 60){
            return '60-70'
          }else if(data<=80 && data> 70){
            return '70-80'
          }else if(data<=90 && data> 80){
            return '80-90'
          }else {
              return '90-100'
          }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Retained
    margin-top: 40px
    background: #fff
    .header-wrapper
      padding: 20px
      h1
        color: #000
        font-size: 18px
        i
          display: inline-block
          padding-left: 7px
          color: #9d9d9d
          font-size: 16px
    .tabs
      padding: 20px
    .Picker-wrapper
      overflow: hidden
      padding: 20px 0
      .datePicker
        float: left
        width: 20%
      .platPicker
        float: right
        .platform
          display: inline-block
        .channel
          display: inline-block
    .table-wrapper
      margin-top: 20px
      table
        width: 100%
        font-size: 14px
        border-radius: 3px
        .line
          td
            text-align: center
            boder: 0
            border: 1px solid #e9e9e9
            padding: 10px 15px
            &.grey-bg
              background: #f5f5f5
            &.retain
              border-right: 0
            &:last-child
              border-right: 1px solid #e9e9e9
            &.boderNone
              border: 0
            &.td-retain-0-10
              background: rgba(54,146,249,0.1)
            &.td-retain-10-20
              background: rgba(54,146,249,0.2)
            &.td-retain-20-30
              background: rgba(54,146,249,0.3)
            &.td-retain-30-40
              background: rgba(54,146,249,0.4)
            &.td-retain-40-50
              background: rgba(54,146,249,0.5)
            &.td-retain-50-60
              background: rgba(54,146,249,0.6)
            &.td-retain-60-70
              background: rgba(54,146,249,0.7)
            &.td-retain-70-80
              background: rgba(54,146,249,0.8)
            &.td-retain-80-90
              background: rgba(54,146,249,0.85)
            &.td-retain-90-100
              background: rgba(54,146,249,0.9)
</style>
<style lang="sass">
  .pickerBlock
    left: 200px!important
</style>
