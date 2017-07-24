<template id="calendar">
  <div class="calendar">
    <!--分为单日期版 日期范围版 由于涉及太多 只能分开写 传入showToday来启用-->

    <!--单日期-->
    <el-radio-group v-model="radio1" @change="dataChange" v-if="!showToday">
      <el-radio-button name="1" label="昨天"></el-radio-button>
      <el-radio-button name="2" label="最近7天"></el-radio-button>
      <el-radio-button name="3" label="最近30天"></el-radio-button>
      <el-radio-button name="4" label="最近60天"></el-radio-button>
      <el-radio-button name="5" label="自定义" class="time-box" ref="custom">
        <el-date-picker v-model="value1" type="date" placeholder=""
                        class="data-piker" @change="change" @focus="focusPiker"
                        :picker-options="pickerOptions1" @click="this.date = true">
        </el-date-picker>
      </el-radio-button>
    </el-radio-group>

    <!--双日期-->
    <el-radio-group v-model="radio2" @change="datarangeChange" v-if="showToday">
      <el-radio-button name="1" label="今天"></el-radio-button>
      <el-radio-button name="2" label="昨天"></el-radio-button>
      <el-radio-button name="3" label="最近7天"></el-radio-button>
      <el-radio-button name="4" label="最近30天"></el-radio-button>
      <el-radio-button name="5" label="最近60天"></el-radio-button>
      <el-radio-button name="6" label="自定义" class="time-box" ref="custom">
        <el-date-picker v-model="value2" type="daterange" placeholder=""
                        class="data-piker" @change="rangeChange" @focus="focusPiker"
                        :picker-options="pickerOptions0">
        </el-date-picker>
      </el-radio-button>
    </el-radio-group>

  </div>
</template>
<script>
  export default {
    name: 'calendar',
    props:{
      showToday:{
          type: Boolean,
          default: true
      }
    },
    data () {
      return {
        radio1: '昨天',
        radio2: '今天',
        value1: new Date().setTime(new Date().getTime() - 3600 * 1000),  //单日期默认昨天
        value2: [new Date(),new Date()],
        value3: new Date().setTime(new Date().getTime() - 3600 * 1000),
        date: false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 3600 * 1000 * 24;
          }
        },
        dateType: '',
        curtext: ''
      }
    },
    // 平台图表格-->
    methods: {
      //当前时间点击赋值
      datarangeChange(val){
        let date = new Date();
        let start = new Date();
        if (val == "今天") {
          this.value2 = [new Date(), new Date()];
        } else if (val == "昨天") {
          start.setTime(date.getTime() - 3600 * 1000 * 24);
          this.value2 = [start, start];
        }
        else if (val == "最近7天") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          this.value2 = [start, date];
        }
        else if (val == "最近30天") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          this.value2 = [start, date];
        }
        else if (val == "最近60天") {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
          this.value2 = [start, date];
        }
      },
      //单日期中的日期段必须单独发送value 直接改变value1 会触发change 发送状态失败
      dataChange(val){
        let date = new Date();
        if (val == "昨天") {
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          this.value3 = date;
          this.dateType = 1;
          this.date = false;
          this.$emit("timeValue", this.value3, this.dateType,this.date);
        }
        else if (val == "最近7天") {
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          this.value3 = date;
          this.dateType = 2;
          this.date = false;
          this.$emit("timeValue", this.value3, this.dateType,this.date);
        }
        else if (val == "最近30天") {
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
          this.value3 = date;
          this.dateType = 3;
          this.date = false;
          this.$emit("timeValue", this.value3, this.dateType,this.date);
        }
        else if (val == "最近60天") {
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 60);
          this.value3 = date;
          this.dateType = 4;
          this.date = false;
          this.$emit("timeValue", this.value3, this.dateType,this.date);
        }
      },
      rangeChange:function(val){
        if(!val){
            return
        }
        if(val[0] == null || val[1] == null){
            return
        }
        this.$emit("timeValue", this.value2)
      },
      change:function(val){
        if(!val){
          return
        }
        this.date = true;
        this.$emit("timeValue", this.value1, this.dateType,this.date)
      },
      focusPiker() {
        // 模拟点击自定义 使其获得is-active类名
        this.$refs.custom.$el.click()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/calendar.scss';
</style>
