<template id="calendar">
  <div class="calendar">
    <el-radio-group v-model="radio3" @change=dataChange>
      <el-radio-button name="1" label="今天"></el-radio-button>
      <el-radio-button name="2" label="昨天"></el-radio-button>
      <el-radio-button name="3" label="最近7天"></el-radio-button>
      <el-radio-button name="4" label="最近30天"></el-radio-button>
      <el-radio-button name="5" label="最近60天"></el-radio-button>
      <el-radio-button name="6" label="自定义" class="time-box" ref="custom">
        <el-date-picker v-model="value6" type="daterange" placeholder=""
                        class="data-piker" @change="change" @focus="focusPiker"
                        :picker-options="pickerOptions0">
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
        value6: [new Date(), new Date()],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
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
          start.setTime(date.getTime() - 3600 * 1000 * 24);
          this.value6 = [start, start];
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
        if(!val){
            return
        }
        if(val[0] == null || val[1] == null){
            return
        }
        this.$emit("timeValue", this.value6)
      },
      focusPiker() {
        // 模拟点击自定义 使其获得is-active类名
        this.$refs.custom.$el.click()
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
<style lang="scss">
  @import '../../assets/css/page/calendar.scss';
</style>
