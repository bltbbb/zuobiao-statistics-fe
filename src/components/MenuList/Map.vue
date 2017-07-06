<!--地域分布-->
<template>
  <div class="Map content-box">
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
      <Calendar></Calendar>
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
      </div>
    </div>
    <div class="user-wrapper">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item,index) in list" :key="index">
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
    <div class="chart-wrapper">
      <div id="map-chart">
      </div>
      <div class="region-wrapper">
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
    <div class="radio-wrapper">
      <el-radio-group v-model="radioValue" class="radio-box">
        <el-radio label="regUser">注册用户</el-radio>
        <el-radio label="loginUser">登录用户</el-radio>
      </el-radio-group>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData5" style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="地市名称" class="city-name">
                <p v-for="item in props.row.city">{{ item }}</p><br>
              </el-form-item>
              <el-form-item label="累计登录用户占比" class="login-percentage">
                <p v-for="item in props.row.percentage">{{ item }}</p>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="地域分布" prop="region">
        </el-table-column>
        <el-table-column label="注册用户" prop="regUser">
        </el-table-column>
        <el-table-column label="登录用户" prop="loginUser">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
        radioValue: 'regUser',
        list: [
          {id: "1", title: "注册用户", message: 'Foo', number: "8096798"},
          {id: "2", title: "登录用户", message: 'Bar', number: "8096798"}
        ],
        select: "",
        Eval: "",
        plats: [{
          value: '1',
          label: '全部平台'
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
        options: {
          tooltip: {
            trigger: 'item',
            transitionDuration: 0.8,
            showDelay: 0,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: 15,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            textStyle: {
              color: 'rgba(0,0,0,0.9)'
            },
            formatter: '<div style="padding-bottom:10px;">{b}</div><div><span style="color: #5cc3ff;">累计启动次数: &nbsp;&nbsp;&nbsp;</span>{c}</div>'
          },
          visualMap: {
            min: 0,
            max: 2000,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true,
            orient: 'horizontal',
            inverse: 'true',
            inRange: {
              color: ['#fff','rgb(0, 119, 254)']
            }
          },
          series: [
            {
//            name: 'iphone3',
              type: 'map',
              mapType: 'china',
              roam: false,
              top: 'top',
              itemStyle: {
                emphasis: {
                  areaColor: '#b86dff'
                }
              },
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true,
                  textStyle: {
                      color: '#fff'
                  }
                }
              },
              data:[
                {name: '北京',value: this.randomData() },
                {name: '天津',value: this.randomData() },
                {name: '上海',value: this.randomData() },
                {name: '重庆',value: this.randomData() },
                {name: '河北',value: this.randomData() },
                {name: '河南',value: this.randomData() },
                {name: '云南',value: this.randomData() },
                {name: '辽宁',value: this.randomData() },
                {name: '黑龙江',value: this.randomData() },
                {name: '湖南',value: this.randomData() },
                {name: '安徽',value: this.randomData() },
                {name: '山东',value: this.randomData() },
                {name: '新疆',value: this.randomData() },
                {name: '江苏',value: this.randomData() },
                {name: '浙江',value: this.randomData() },
                {name: '江西',value: this.randomData() },
                {name: '湖北',value: this.randomData() },
                {name: '广西',value: this.randomData() },
                {name: '甘肃',value: this.randomData() },
                {name: '山西',value: this.randomData() },
                {name: '内蒙古',value: this.randomData() },
                {name: '陕西',value: this.randomData() },
                {name: '吉林',value: this.randomData() },
                {name: '福建',value: this.randomData() },
                {name: '贵州',value: this.randomData() },
                {name: '广东',value: this.randomData() },
                {name: '青海',value: this.randomData() },
                {name: '西藏',value: this.randomData() },
                {name: '四川',value: this.randomData() },
                {name: '宁夏',value: this.randomData() },
                {name: '海南',value: this.randomData() },
                {name: '台湾',value: this.randomData() },
                {name: '香港',value: this.randomData() },
                {name: '澳门',value: this.randomData() },
                {name: '南海诸岛',value: 0, itemStyle:{ normal:{opacity:0}} }
              ]
            }
          ]
        },
        tableData:[
          {index:1,region:'北京',value:'13551',percentage:'13.05%'},
          {index:2,region:'北京',value:'13551',percentage:'13.05%'},
          {index:3,region:'北京',value:'13551',percentage:'13.05%'},
          {index:4,region:'北京',value:'13551',percentage:'13.05%'},
          {index:5,region:'北京',value:'13551',percentage:'13.05%'},
          {index:6,region:'北京',value:'13551',percentage:'13.05%'},
          {index:7,region:'北京',value:'13551',percentage:'13.05%'},
          {index:8,region:'北京',value:'13551',percentage:'13.05%'},
          {index:9,region:'北京',value:'13551',percentage:'13.05%'}
        ],
        tableData5: [
            {id: '12987122', region: '广东', regUser: '1268', loginUser: '1351', city: ['深圳','深圳','深圳','深圳'], percentage: ['13.26%','13.26%','13.26%','13.26%']},
            {id: '12987122', region: '广东', regUser: '1268', loginUser: '1351', city: ['深圳','深圳','深圳','深圳'], percentage: ['13.26%','13.26%','13.26%','13.26%']},
            {id: '12987122', region: '广东', regUser: '1268', loginUser: '1351', city: ['深圳','深圳','深圳','深圳'], percentage: ['13.26%','13.26%','13.26%','13.26%']},
            {id: '12987122', region: '广东', regUser: '1268', loginUser: '1351', city: ['深圳','深圳','深圳','深圳'], percentage: ['13.26%','13.26%','13.26%','13.26%']}
          ]
      }
    },
    components:{
      Calendar
    },
    methods: {
        drawLine(){
            axios.post('/api/getMapData').then((res)=>{
              echarts.registerMap('china', res.data.data);
              let myChart = echarts.init(document.getElementById('map-chart'))
              myChart.setOption(this.options)
            })
        },
        randomData() {
          return Math.round(Math.random()*1000);
        }
    },
    mounted(){
        this.drawLine()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Map
    margin-top: 40px
    background: #fff
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
    .user-wrapper
      padding: 20px
      .el-col
        .grid-content
          border-radius: 4px
          padding: 20px 16px
          color: #fff
          min-height: 60px
        &:nth-child(1)
          .grid-content
            background: #009999
        &:nth-child(2)
          .grid-content
            background: #FF9999
    .chart-wrapper
      box-sizing: border-box
      padding: 20px
      overflow: hidden
      width: 100%
      #map-chart
        box-sizing: border-box
        float: left
        width: 60%
        height: 400px
        padding: 0 20px
      .region-wrapper
        box-sizing: border-box
        float: left
        padding-right: 20px
        width: 40%
    .radio-wrapper
      text-align: center
      padding-top: 20px
    .table-wrapper
      padding: 40px 40px 20px 20px
      .city-name
        float: left
        padding-left: 15px
        margin-bottom: 0
        p
          line-height: 36px
      .login-percentage
        float: right
        text-align: right
        margin-bottom: 0
        p
          line-height: 36px
</style>
<style lang="sass">
  .city-name
    .el-form-item__label
      display: block
      padding: 5px 0 10px 0
    .el-form-item__content
      line-height: 0
  .login-percentage
    .el-form-item__label
      display: block
      padding: 5px 0 10px 0
    .el-form-item__content
      line-height: 0
</style>
