<template id="calendar">
  <div class="calendar">
    <el-radio-group v-model="radio3" @change=dataChange>
      <el-radio-button name="1" label="今天"></el-radio-button>
      <el-radio-button name="2" label="昨天"></el-radio-button>
      <el-radio-button name="3" label="最近7天"></el-radio-button>
      <el-radio-button name="4" label="最近30天"></el-radio-button>
      <el-radio-button name="5" label="最近60天"></el-radio-button>
      <el-radio-button name="6" label="自定义" class="time-box">
        <el-date-picker v-model="value6" type="daterange" placeholder=""
                        class="data-piker" @change="change">
        </el-date-picker>
      </el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
  export default {
    name: 'calendar',
    data () {
      return {
        radio3: '今天',
        value6: [new Date(), new Date()]
      }
    },
    // 平台图表格-->
    methods: {
      //当前时间点击赋值
      dataChange(val){
        let date = new Date();
        let start = new Date();
        if (val == "今天") {
          this.value6 = [new Date(), new Date()];
        } else if (val == "昨天") {
          const newData = date.setTime(date.getTime() - 3600 * 1000 * 24);
          this.value6 = [newData, newData];
        }
        else if (val == "最近7天") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          this.value6 = [start, date];
        }
        else if (val == "最近30天") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          this.value6 = [start, date];
        }
        else if (val == "最近60天") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
          this.value6 = [start, date];
        }
      },
      change:function(val){
        let strs = new Array(); //定义一数组
        strs = val.split(" - "); //字符分割
        let dataOne = getNowFormatDate().replace(/[&\|\\\*^%$#@\-]/g, "");//获取当前时间
        let dataTwo = strs[0].replace(/[&\|\\\*^%$#@\-]/g, "");//获取当前查询时间
        let days = (dataTwo - dataOne);//获取时间段
        switch (days) {
          case 0:
            this.radio3 = '今天';
            break;
          case -1:
            this.radio3 = '昨天';
            break;
          case -7:
            this.radio3 = '最近7天';
            break;
          case -99:
            this.radio3 = '最近30天';
            break;
          case -199:
            this.radio3 = '最近60天';
            break;
          default:
            this.radio3 = '自定义';

        }
        this.$emit("timeValue", this.value6)
      }
    }
  }
  function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .calendar{
    float:left
  }
</style>
