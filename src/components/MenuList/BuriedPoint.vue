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
      <!--<Calendar @timeValue="getTime" :showToday="false"></Calendar>-->
      <versiongetdata
        @Platform="childgetPlatform"
        @changeVal="changeplatVal1"
        @canalVal1="childcanalVal1"
        @getEdition1="getEdition1"
        @changeEvalVal="changeEdition"
        :allPlat="false"
      >
      </versiongetdata>
    </div>

    <!--页面名称列表-->

    <div class="title-box" style="padding-top: 0;">
      <div style="border: solid 1px #DFE6EC; border-bottom: 0">
        <table class="table-title" width="100%" >
          <thead >
            <tr >
              <th class="table-thead-th-1" :style="{width: '200px'}">事件名称</th>
              <th :style="{width: '260px'}">事件Id</th>
              <th >昨日消息数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <!--<i class="el-icon-information"></i>-->
                </el-tooltip>
              </th>

              <th >昨日独立用户数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <!--<i class="el-icon-information"></i>-->
                </el-tooltip>
              </th>
              <th >前日消息数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <!--<i class="el-icon-information"></i>-->
                </el-tooltip>
              </th>

              <th >前日独立用户数
                <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
                  <!--<i class="el-icon-information"></i>-->
                </el-tooltip>
              </th>
              <th :style="{width: '100px'}">详情</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(value,index) in tableData" >
              <td class="table-thead-th-1 table-thead-th-2">{{ value.eventName }}</td>
              <td>{{ value.eventId }}</td>
              <td>{{ value.yesMessageCount }}</td>
              <td>{{ value.yesUserCount }}</td>
              <td>{{ value.lastyesMessageCount }}</td>
              <td>{{ value.lastyesUserCount }}</td>
              <td><el-button size="small" @click="handleRowHandle(index, $event)">查看</el-button></td>
            </tr>
            <tr v-if="tableData.length == 0">
              <td colspan="7" style="text-align: center;font-size: 12px;">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Calendar from '@/components/calendar/Calendar'
  import versiongetdata from '../versionInformation/VersionGetData'
  import qs from 'qs'

  export default {
    data() {
      return {
        totalCount:0,
        currentPage:1,
        pageSize:10,
        port: this.$store.state.domain,
        explain: '这是菜单的说明文字',
        token:'',
        platVal: '3',
        evalVal: -1,
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
      this.initParams();
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

      //  默认平台
      childgetPlatform (plats) {
        this.platVal = plats;
      },

      // 改变平台
      changeplatVal1 (val) {
        this.platVal = val;
        this.getAnalysis();
      },

      //  改变版本
      changeEdition(val){
        this.evalVal = val;
        this.getAnalysis();
      },
      //  渠道信息
      childcanalVal1 (canalVal) {
        this.canalVal = canalVal * 1;
      },
      // 默认版本
      getEdition1(val){
        this.evalVal = val;
      },


      //  获取事件
      getAnalysis () {
          let data = {
            adoptToken : this.token,
            platformId : this.platVal,
            versionId : this.evalVal,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
          this.$http.post(this.port + '/EventAnalyzePages',qs.stringify(data))
              .then( (res) => {
                if (res.status == 200) {
                  if (res.data.status == 0) {
                    let data = res.data.result.result;
                    this.tableData = data
                    this.totalCount = res.data.result.totalCount
                  }
                  else if (res.data.status == 1) {
                    this.tableData = [];
                    this.$message.warning('暂无数据');
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

      handleRowHandle (index, evnet) {
          let id = this.tableData[index].eventId
          this.$router.push('/Content/AnalysisRegister/'+id);
      },
      //获取日历时间
      getTime(msg,dateType,curtext){
        this.currentDate = msg.Format("yyyy-MM-dd");
        this.dateType = dateType;
        this.curtext = curtext;
        this.init();
      },
      handleSizeChange(data){
        this.pageSize = data
        this.getAnalysis()
      },
      handleCurrentChange(data){
        this.currentPage = data
        this.getAnalysis()
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
    float: left;
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
    font-size: 14px;
  }

  .table-thead-th-1 {
    padding-left: 20px;
  }

  .table-title tbody {
    background: #ffffff;
    font-size: 14px;
    color: #1f2d3d;
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
  .pagination-wrapper {
    text-align: center;
    margin-top: 10px;
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
