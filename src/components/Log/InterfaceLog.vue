<template>
  <div class="InterfaceLog">
    <div class="header-wrapper">
      <h1>
        接口调用日志
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          popper-class="popover-class">
        </el-popover>
      </h1>
    </div>
    <div class="log-form">
      <el-form ref="form" :model="form" inline>
        <div class="form-input">
          <Calendar @timeValue="getTime" :containToday="true"></Calendar>
          <!--<el-form-item label="开始时间">-->
            <!--<el-date-picker-->
              <!--v-model="form.invokeBeginTimeStart"-->
              <!--type="date"-->
              <!--placeholder="选择日期"-->
              <!--@change="dateStart"-->
              <!--style="width: 146px;">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="结束时间">-->
            <!--<el-date-picker-->
              <!--v-model="form.invokeBeginTimeStop"-->
              <!--type="date"-->
              <!--placeholder="选择日期"-->
              <!--@change="dateEnd"-->
              <!--style="width: 146px;">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item label="完整url">
            <el-input style="width: 146px;" v-model="form.invokeCont"></el-input>
          </el-form-item>
          <el-form-item label="是否报错">
            <el-select v-model="form.isFail" style="width: 146px;">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 30px;">
            <el-button @click="searchHandle">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="log-table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="logId"
          label="日志ID">
        </el-table-column>
        <el-table-column
          prop="errMsg"
          label="错误消息">
        </el-table-column>
        <el-table-column
          prop="interfaceId"
          label="接口ID">
        </el-table-column>
        <el-table-column
          prop="invokeCont"
          label="输入参数">
        </el-table-column>
        <el-table-column
          label="是否报错"
          width="100">
          <template scope="scope">
            <span v-if="scope.row.isFail == 1" style="margin-left: 10px">是</span>
            <span v-if="scope.row.isFail == -1" style="margin-left: 10px">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mainAccount"
          label="登陆名">
        </el-table-column>
        <el-table-column
          prop="serverIp"
          label="服务IP">
        </el-table-column>
        <el-table-column
          prop="invokeBeginTime"
          label="调用时间"
          width="200">
          <template scope="scope">
            <span>{{scope.row.invokeBeginTime}}</span><br>
            <span>-</span><br>
            <span>{{ scope.row.invokeEndTime}}</span>
          </template>
        </el-table-column>
      </el-table>
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
<script>
  import qs from 'qs'
  import Calendar from '@/components/calendar/Calendar'
  export default {
    data() {
      return {
        token:'',
        tableData: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        form: {
          invokeBeginTimeStart:'',
          invokeBeginTimeStop:'',
          invokeCont:'',
          isFail:''
        }
      }
    },
    mounted(){
      this.initParams()
      this.init()
    },
    components: {
      Calendar
    },
    methods:{
      init(){
        this.getAllLog()
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken');
        let date = new Date();
        let start = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.form.invokeBeginTimeStart = start.Format("yyyy-MM-dd");
        this.form.invokeBeginTimeStop = date.Format("yyyy-MM-dd");
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          ...this.form
        }
        this.$http.post(this.$store.state.domain+'/logServerInvoke/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount = res.data.result.totalCount
            this.tableData = res.data.result.result
          }
          else{

          }
        },(err)=>{
          this.tableData = []
        })
      },
      handleSizeChange(data){
        this.pageSize = data
        this.getAllLog()

      },
      handleCurrentChange(data){
        this.currentPage = data
        this.getAllLog()
      },
      searchHandle(){
        this.getAllLog()
      },
      reset(){
        this.form = {
          invokeBeginTimeStart:this.form.invokeBeginTimeStart,
          invokeBeginTimeStop:this.form.invokeBeginTimeStop,
          invokeCont:'',
          isFail:''
        }
        this.getAllLog()
      },
      getTime(msg){
        this.form.invokeBeginTimeStart = msg[0].Format("yyyy-M-d");
        this.form.invokeBeginTimeStop = msg[1].Format("yyyy-M-d");
        this.getAllLog();
      },
    }
  }
</script>
<style lang="sass">
  .InterfaceLog
    margin-top: 40px
    background: #fff
    .log-table
      padding: 10px 20px
      .pagination-wrapper
        text-align: center
        margin-top: 10px
    .log-form
      padding: 10px 20px 0
    .calendar
      margin-right: 15px
</style>
