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
      <Calendar @timeValue="getTime"></Calendar>
      <div class="title-select-box">
        <el-select v-model="platVal" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.value"
            :label="plat.label"
            :value="plat.value">
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
            :key="edition.Eval"
            :label="edition.label"
            :value="edition.Eval">
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
        port: 'http://192.168.1.201:9999',
        platVal: '1',
        canalVal: '1',
        evalVal: '1',
        explain: '这是菜单的说明文字',
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

        radio3: '今天',
        plats: [
          {
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
        canals: [{
          val: '1',
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
        let date = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
        this.token = this.$cookie.get('adoptToken');
      },
      init () {
        this.initParams();
        this.getAnalysis();
      },

      getAnalysis () {
        let Params = new URLSearchParams();
        Params.append('adoptToken', this.token);
        Params.append('startDate', this.start);
        Params.append('stopDate', this.end);
        Params.append('PlatformId', this.platVal);
        Params.append('EditionId', this.Eval);
        Params.append('channelId', this.val);
        this.$http.post(this.port + '/eventAnalysis',Params)
            .then( (res) => {
              if (res.status == 200) {
                let data = res.data.result.result;
                this.tableData = data
              }
              else {
                console.log('获取数据失败')
              }

        }, (err) => {
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
      getTime(msg){
        console.log('msg', msg)
      }
    },
    components: {
      Calendar
    },
    watch: {
      // 异步请求待用
      platVal: function (val) {
        console.log(val)
      },
      canalVal: function (val) {
        console.log(val)
      },
      evalVal: function (val) {
        console.log(val)
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
