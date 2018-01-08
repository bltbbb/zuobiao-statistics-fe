<template>
  <div class="Feedback">
    <div class="header-wrapper">
      <h1>
        消息管理
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
          <el-form-item label="发送者ID或昵称">
            <el-input style="width: 146px;" v-model="form.id"></el-input>
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
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="70"
          label="序号">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="SN"-->
          <!--label="SN"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="master"
          label="发送者ID">
        </el-table-column>
        <el-table-column
          prop="displayName"
          label="发送者昵称">
        </el-table-column>
        <el-table-column
          prop="to"
          label="接收者ID">
        </el-table-column>
        <el-table-column
          prop="toDisplayName"
          label="接收者昵称">
        </el-table-column>
        <el-table-column
          label="消息类型">
          <template scope="scope">
            <span v-if="scope.row.type == 1">文本</span>
            <span v-if="scope.row.type == 2">文件</span>
            <span v-if="scope.row.type == 3">图片</span>
            <span v-if="scope.row.type == 4">短语音</span>
            <span v-if="scope.row.type == 5">短视频</span>
            <span v-if="scope.row.type == 6">卡片消息</span>
            <span v-if="scope.row.type == 7">历史消息</span>
            <span v-if="scope.row.type == 8">富文本消息</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否群消息"
          width="120">
          <template scope="scope">
            <span v-if="scope.row.isGroup == 1">是</span>
            <span v-if="scope.row.isGroup == 2">否</span>
          </template>
        </el-table-column>
        <el-table-column
          label="消息时间"
          width="200">
          <template scope="scope">{{(new Date(scope.row.timestamp)).Format("yyyy-MM-dd hh:mm:ss")}}</template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--width="100">-->
          <!--<template scope="scope">-->
            <!--<el-button-->
              <!--size="small"-->
              <!--@click="feedbackDelete(scope.$index, scope.row)"-->
              <!--type="danger">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <!--<div class="batchDelete" style="margin-top: 10px;" v-if="this.tableData.length != 0">-->
        <!--<el-button-->
          <!--@click="batchDelete()"-->
          <!--size="small"-->
          <!--type="danger">批量删除</el-button>-->
      <!--</div>-->
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
          startTime:'',
          stopTime:'',
          id:'',
        },
        feedbackId:[]
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
        this.form.startTime = start.Format("yyyy-MM-dd");
        this.form.stopTime = date.Format("yyyy-MM-dd");
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startDate: this.form.startTime,
          stopDate: this.form.stopTime,
          user: this.form.id
        }
        this.$http.post(this.$store.state.domain+'/engineMessage/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount = res.data.result.totalCount
            this.tableData = res.data.result.result
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
////          this.$message.error('网络错误');
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
        this.form.id = ''
        this.getAllLog()
      },
      getTime(msg){
        this.form.startTime = msg[0].Format("yyyy-M-d");
        this.form.stopTime = msg[1].Format("yyyy-M-d");
        this.getAllLog()
      },
      feedbackDelete(index,data){
        let id = data.feedbackId
        this.deleteHandle(id)
      },
      handleSelectionChange(val){
        this.feedbackId = []
        val.forEach(item=>{
          this.feedbackId.push(item.feedbackId)
        })
      },
      batchDelete(){
        this.deleteHandle(this.feedbackId.join(','))
      },
      deleteHandle(id){
        this.$http.delete(this.$store.state.domain+'/feedback',{
          params:{
            adoptToken: this.token,
            id: id
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.$message('删除成功')
            this.getAllLog()
          }
          else{

          }
        },(err)=>{
          this.$message.error('接口错误');
        })
      }
    }
  }
</script>
<style lang="sass" scoped>
  .Feedback
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
      margin-right: 30px
</style>
