<template>
  <div class="messagePush">
    <div class="header-wrapper">
      <h1>
        消息推送
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
          <el-form-item label="接收人">
            <el-input style="width: 146px;" v-model="form.receiver"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input style="width: 146px;" v-model="form.msgTitle"></el-input>
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
          prop="filePath"
          label="附件">
        </el-table-column>
        <el-table-column
          prop="msgCont"
          label="内容">
        </el-table-column>
        <el-table-column
          prop="msgTitle"
          label="标题">
        </el-table-column>
        <el-table-column
          label="消息类型"
          width="100">
          <template scope="scope">
            <span v-if="scope.row.msgType == 1" style="margin-left: 10px">短信</span>
            <span v-if="scope.row.msgType == 2" style="margin-left: 10px">彩信</span>
            <span v-if="scope.row.msgType == 3" style="margin-left: 10px">邮件</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="receiver"
          label="接收人">
        </el-table-column>
        <el-table-column
          prop="sendBeginTime"
          label="开始发送时间">
        </el-table-column>
        <el-table-column
          prop="sendEndTime"
          label="结束发送时间">
        </el-table-column>
        <el-table-column
          prop="sender"
          label="发件人">
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
        form:{
          sendBeginTimeStart:'',
          sendBeginTimeStop:'',
          msgTitle:'',
          receiver:''
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
        this.form.sendBeginTimeStart = start.Format("yyyy-MM-dd");
        this.form.sendBeginTimeStop = date.Format("yyyy-MM-dd");
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          ...this.form
        }
        this.$http.post(this.$store.state.domain+'/logMsgSend/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount = res.data.result.totalCount
            this.tableData = res.data.result.result
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
//          this.$message.error('网络错误');
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
          sendBeginTimeStart:'',
            sendBeginTimeStop:'',
            msgTitle:'',
            receiver:''
        }
        this.getAllLog()
      },
//      dateStart(data){
//        this.form.sendBeginTimeStart = data
//      },
//      dateEnd(data){
//        this.form.sendBeginTimeStop = data
//      }
      getTime(msg){
        this.form.sendBeginTimeStart = msg[0].Format("yyyy-M-d");
        this.form.sendBeginTimeStop = msg[1].Format("yyyy-M-d");
        this.getAllLog();
      },
    }
  }
</script>
<style lang="sass">
  .messagePush
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
