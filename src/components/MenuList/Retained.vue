<!--留存用户-->
<template>
  <div class="Retained content-box">
    <div class="header-wrapper">
      <h1>
        留存用户
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
            :key="plat.id+''"
            :label="plat.name"
            :value="plat.id+''">
          </el-option>
        </el-select>
        <el-select v-model="evalVal" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="radio-box">
      <el-radio-group v-model="radioVal">
        <el-radio label="1">日留存</el-radio>
        <el-radio label="2">周留存</el-radio>
        <el-radio label="3">月留存</el-radio>
      </el-radio-group>
    </div>
    <div class="tabs">
      <el-tabs type="border-card" v-model="tabVal">
        <el-tab-pane v-for="(tab,index) in tabs" :key="index" :name="tab.id">
          <span slot="label"><i class="el-icon-date"></i> {{tab.plat}}</span>
          <div class="table-wrapper">
            <table>
              <tr class="line">
                <td class="retain grey-bg">首次使用时间</td>
                <td class="retain grey-bg">{{userText}}</td>
                <td class="retain grey-bg" v-for="item in Identification">{{item}}</td>
              </tr>
              <tr class="line" v-for="item in tableDataList">
                <td class="grey-bg">{{item.statisDate}}</td>
                <td class="grey-bg">{{item.registeredUser}}</td>
                <td v-for="list in item.data" :class="'td-retain-'+classMap(list)" class="boderNone">{{list}}<span>{{precent}}</span></td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        explain: '这是菜单的说明文字',
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
        tabVal: 'firstRetained',
        tabs: [
            {id: "firstRetained", plat: '新增用户首次使用留存'},
            {id: "activeRetained", plat: '活跃用户留存'}
          ],
        tabsText:{
          'firstRetained': '注册用户',
          'activeRetained': '活跃用户'
        },
        tableDataList: [
//          {date:"2017/05/19",regUser:"999",Retention:["30","20","17","14","9","6","0"]},
//          {date:"2017/05/19",regUser:"1009",Retention:["40","23","27","19","13","0","0"]},
//          {date:"2017/05/19",regUser:"658",Retention:["32.1","20.6","19.8","14.5","0","0","0"]}
        ],
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
        retains: [{
          value: '1',
          label: '日留存'
        }, {
          value: '2',
          label: '周留存'
        },
          {
            value: '3',
            label: '月留存'
          }
        ],
        canals: [{
          val: '-1',
          label: '全部渠道'
        }],
        Identification: [],
        IdentificationArr:[
          ['第二天' ,'第三天','第四天','第五天','第六天','第七天','第十五天','第三十天'],
          ['第二周' ,'第三周','第四周','第五周','第六周','第七周','第八周','第九周'],
          ['第二月' ,'第三月','第四月','第五月','第六月','第七月','第八月','第九月']
        ],
        userText: '',
        platVal: '-1',
        evalVal: '-1',
        radioVal: '1',
        start: '',
        end: '',
        token: '',
        tableData: [],
        precent: '',
        precentRadio: {
          'firstRetained': '',
          'activeRetained': '%'
        }
      }
    },
    methods:{
      classMap(data){
          data = parseInt(data)
          if(data == 0){
              return '0'
          }else if(data<=10 && data>0){
              return '1-10'
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
      },
      //获取日历时间
      getTime(msg){
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getRetained();
      },
      initParams: function () {
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 *1);
        date.setTime(date.getTime() - 3600 * 1000 * 24 *1);  //数据原因 默认为昨天
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
        this.Identification = this.IdentificationArr[0];
        this.userText = '注册用户';
        this.precent = '%'
      },
      init:function () {
        this.getRetained();

        //获取平台
        this.$http.get(this.$store.state.domain+'/getPlatform',{
          params:{
            adoptToken:this.token
          }
        }).then((res)=>{
          this.plats = res.data.result.result;
        });

        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('appPlatId', this.platVal);
      },
      getRetained: function () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('platformId', this.platVal);
        Params.append('channelId', this.evalVal);
        Params.append('retainedType', this.radioVal);

        this.$http.post(this.$store.state.domain+'/'+this.tabVal,Params).then((res)=>{
          if(res.data.status == 0){
            let data = res.data.result.result;
            this.tableDataList = data;
          }
          else{
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      }
    },
    components:{
      Calendar
    },
    watch: {
      platVal: function (val) {
        this.getRetained();
      },
      evalVal: function (val) {
        this.getRetained();
      },
      tabVal: function (val) {
        this.getRetained();
        this.userText = this.tabsText[val];
        this.precent = this.precentRadio[val]
      },
      radioVal: function (val) {
        val--;
        this.getRetained();
        this.Identification = this.IdentificationArr[val];
      }
    },
    mounted(){
      this.initParams();
      this.init();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .Retained
    margin-top: 40px
    background: #fff
    .tabs
      padding: 20px
    .title-box
      overflow: hidden
      background: #fff
      padding: 20px
      .title-select-box
        float: right
    .radio-box
      margin-top: 0
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
            &.td-retain-0
              background: rgba(54,146,249,0)
            &.td-retain-1-10
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
