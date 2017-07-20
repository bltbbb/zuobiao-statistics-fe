<!--埋点分析-->
<template>
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
      <div class="title-select-box">
        <el-select v-model="platVal" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.name"
            :label="plat.name"
            :value="plat.id">
          </el-option>
        </el-select>
        <el-select v-model="canalVal" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
          </el-option>
        </el-select>
        <el-select v-model="evalVal" placeholder="版本">
          <el-option
            v-for="edition in editions"
            :key="edition.name"
            :label="edition.name"
            :value="edition.id">
          </el-option>
        </el-select>
      </div>
    </div>

    <!--页面名称列表-->

    <div>
      <table class="table-title">
        <thead>
        <tr>
          <th class="table-thead-th-1" :style="{width: '180px'}">事件名称</th>
          <th :style="{width: '180px'}">事件Id</th>
          <th :style="{width: '40%'}">事件数量（日均）
            <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
              <i class="el-icon-information"></i>
            </el-tooltip>
          </th>

          <th :style="{width: 'auto'}">触发用户数（日均）
            <el-tooltip class="item" effect="light" content="Right Center 提示文字" placement="right" popper-class="hint">
              <i class="el-icon-information"></i>
            </el-tooltip>
          </th>
        </tr>

        </thead>
        <tbody>
          <tr v-for="vaule in tableData">
            <td class="table-thead-th-1" v-on:click="handleRowHandle($event)">{{ vaule.name }}</td>
            <td>{{ vaule.id }}</td>
            <td>{{ vaule.eventNum }}</td>
            <td>{{ vaule.triggerUserNum }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Calendar from '@/components/calendar/Calendar'

  export default {
    data() {
      return {
        port: 'http://192.168.1.32:80',
        platVal: -1,
        canalVal: '-1',
        evalVal: -1,
        explain: '这是菜单的说明文字',
        //  页面列表
        tableData: [
          {
            name: "注册界面1",
            id: 1,
            eventNum: 45465465465,
            triggerUserNum: 465465465465
          }
        ],
        activeIndex: '1',
        activeIndex2: '1',

        radio3: '今天',
        plats: [

        ],
        canals: [{
          val: '-1',
          label: '全部渠道'
        }],
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
        currentDate:'',
        dateType: 1,
        curtext: '',
        getEditionId: ''
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      handleSelect (key, keyPath) {
//        console.log(key, keyPath);
      },

      initParams () {
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.initParams();
        this.getPlatform();
        this.getEdition();
        this.getAnalysis();
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
        this.$http.post(this.port + '/getEdition',Params).then( (res) => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              let data = res.data.result.result;
              this.editions = data;
              this.getEditionId = data[0].id;
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

      //  获取事件
      getAnalysis () {
          let Params = new URLSearchParams();
          Params.append('adoptToken', this.token);
         ((this.curtext == '自定义') ? Params.append('date', this.currentDate) : Params.append('dateType', this.dateType));
          Params.append('platformId', this.platVal);
          Params.append('versionId', 0);
          Params.append('channelId', this.canalVal);
          this.$http.post(this.port + '/eventAnalysis',Params)
              .then( (res) => {

                if (res.status == 200) {
                  if (res.data.status == 0) {
                    console.log('res',res)
                    let data = res.data.result.result;
  //                this.tableData = data
                  }
                  else if (res.data.status == 1) {
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


      handleRowHandle (event) {
        let testName = event.toElement.outerText;
        if (testName == '注册界面1') {
          this.$router.push({name: 'AnalysisRegister'});
        }
        console.log(event.incidentName)
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
      Calendar
    },
    watch: {
      // 异步请求待用
      platVal (val) {  //  平台变化
        this.platVal = val;
        this.getEdition();
        this.evalVal = this.getEditionId;
        this.getAnalysis();
      },
      canalVal (val) {
        this.canalVal = val;
        this.getAnalysis();
      },
      evalVal (val) {  //  版本变化
        this.evalVal = val;
        this.getAnalysis();
      }
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
    /*width:100%;*/
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
