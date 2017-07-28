<!--埋点分析-->
<template xmlns:>
  <!--tabe-->
  <div class="ActiveUsers content-box">
    <div class="header-wrapper">
      <h1>
        埋点分析
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
      <!--导航-->
      <Calendar @timeValue="getTime" :showToday="false"></Calendar>
      <versiongetdata
        @Platform="childgetPlatform"
        @getEdition1="childgetEdition1"
        @changeVal="childplatVal1"
        @changeEvalVal="childchangeEvalVal"
        @canalVal1="childcanalVal1"
      >
      </versiongetdata>
    </div>

    <!--页面名称列表-->

    <div class="title-box" >
      <div style="border: solid 1px #DFE6EC; border-bottom: 0">


      <table class="table-title" width="100%" >
        <thead >
          <tr >
            <th class="table-thead-th-1" :style="{width: '200px'}">事件名称</th>
            <th :style="{width: '180px'}">事件Id</th>
            <th >事件数量（日均）
              <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                <i class="el-icon-information"></i>
              </el-tooltip>
            </th>

            <th >触发用户数（日均）
              <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                <i class="el-icon-information"></i>
              </el-tooltip>
            </th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(vaule,index) in tableData" >
            <td class="table-thead-th-1" @click="handleRowHandle(index,$event)">{{ vaule.name }}</td>
            <td>{{ vaule.interactionViewId }}</td>
            <td>{{ vaule.visitCount }}</td>
            <td>{{ vaule.deviceCount }}</td>
          </tr>
        </tbody>
      </table>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Calendar from '@/components/calendar/Calendar'
  import versiongetdata from '../versionInformation/VersionGetData'

  export default {
    data() {
      return {
        port: 'http://192.168.1.32:80',
        explain: '这是菜单的说明文字',

        platVal: '',
        evalVal: '',
        canalVal: '',

        //  页面列表
        tableData: [],
        activeIndex: '1',
        activeIndex2: '1',
        radio3: '今天',
        Eval: "1",
        currentDate:'',
        dateType: 1,
        curtext: null

      }
    },
    mounted () {
      this.init();
    },
    methods: {

      initParams () {
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.initParams();
        this.getAnalysis();
      },

      //  平台信息
      childgetPlatform (plats) {
        this.platVal = plats;
      },

      childplatVal1 (childplatVal1) {
        this.platVal = childplatVal1;
        this.getAnalysis()
      },

      //  版本信息
      childgetEdition1 (childgetEdition1) {
        this.evalVal = childgetEdition1;
      },

      childchangeEvalVal (childchangeEvalVal) {
        this.evalVal = childchangeEvalVal;
        this.getAnalysis();
      },

      //  渠道信息
      childcanalVal1 (canalVal) {
        this.canalVal = canalVal * 1;
      },


      //  获取事件
      getAnalysis () {
          let Params = new URLSearchParams();
          Params.append('adoptToken', this.token);
         ((this.curtext) ? Params.append('date', this.currentDate) : Params.append('dateType', this.dateType));
          Params.append('platformId', this.platVal);
          Params.append('versionId', this.evalVal);
          Params.append('channelId', this.canalVal);
          this.$http.post(this.port + '/eventAnalysis',Params)
              .then( (res) => {
                if (res.status == 200) {
                  if (res.data.status == 0) {
                    let data = res.data.result.result;
                    this.tableData = data
                  }
                  else if (res.data.status == 1) {
                    this.tableData = [];
                    this.$message.warning('暂无数据');
                    console.log('事件信息请求数据为空');
                  }
                }
                else {
                  console.log('请求失败')
                }

          }, (err) => {
              console.log('获取失败')
              console.log('err',err)
          });
      },


      handleRowHandle (index,event) {
        let testName = event.toElement.outerText;
          this.$router.push({name: 'AnalysisRegister', query:{eventName: this.tableData[index].name, eventId: this.tableData[index].interactionViewId}});
      },
      //获取日历时间
      getTime(msg,dateType,curtext){
        this.currentDate = msg.Format("yyyy-MM-dd");
        this.dateType = dateType;
        this.curtext = curtext;
        this.init();
      }
    },
    components: {
      Calendar,
      versiongetdata
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/page/public.scss';

  .incident-title {
    display: block;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .block {
    display: inline-block;

  }

  .el-radio-button {
    top: -5px;
  }

  .content-box {
    margin-top: 40px;
    background: #f0f0f0;
    padding: 0;
  }

  .title-select-box {
    float: right;
  }

  .table-wrapper {
    padding: 20px;
    background: #fff;
  }

  .table-title {
    width: 100%;
    background-color: #ffffff;
  }

  .table-title thead tr {
    padding: 0;
    text-align: left;
    height: 40px;
    line-height: 40px;
    background-color: #dfe6ec;
    border: solid 1px #DFE6EC;
  }

  .table-thead-th-1 {
    padding-left: 20px;
  }

  .table-title tbody {
    background: #ffffff;
  }

  tr {
    border-bottom: solid 1px #dfe6ec;
    height: 40px;
  }

  .table-title tbody tr:hover {
    background-color: #EEF1F6;
  }

  .el-icon-information {
    vertical-align: middle;
    color: #9d9d9d;
  }

</style>
<style lang="scss">

  div.hint {
    border: none !important;
      div {
        border: #ffffff !important;
      }
  }
</style>
