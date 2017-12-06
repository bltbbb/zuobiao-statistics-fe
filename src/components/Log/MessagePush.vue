<template>
  <div class="messagePush">
    <div class="header-wrapper">
      <h1>
        登陆日志
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          popper-class="popover-class">
        </el-popover>
      </h1>
    </div>
    <div class="log-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border>
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
  export default {
    data() {
      return {
        token:'',
        tableData: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10
      }
    },
    mounted(){
      this.initParams()
      this.init()
    },
    methods:{
      init(){
        this.getAllLog()
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken');
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize
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
          this.$message.error('网络错误');
        })
      },
      handleSizeChange(data){
        this.pageSize = data
        this.getAllLog()

      },
      handleCurrentChange(data){
        this.currentPage = data
        this.getAllLog()
      }
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
</style>
