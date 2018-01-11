<template>
  <div class="Feedback">
    <div class="header-wrapper">
      <h1>
        意见反馈
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
          <el-form-item label="用户ID">
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
        <el-table-column
          prop="userId"
          label="用户ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="displayName"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="content"
          label="反馈内容">
        </el-table-column>
        <el-table-column
          label="反馈时间">
          <template scope="scope">
            <span>{{(new Date(scope.row.feedBackTime)).Format("yyyy-MM-dd hh:mm:ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template scope="scope">
            <el-button
              size="small"
              @click="feedbackDelete(scope.$index, scope.row)"
              type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="batchDelete" style="margin-top: 10px;" v-if="this.tableData.length != 0">
        <el-button
          @click="batchDelete()"
          size="small"
          type="danger">批量删除</el-button>
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
          startTime: this.form.startTime,
          stopTime: this.form.stopTime,
          userOrContent: this.form.id
        }
        this.$http.post(this.$store.state.domain+'/feedback/page',qs.stringify(data)).then((res)=>{
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
          id:'',
          startTime: this.form.startTime,
          stopTime: this.form.stopTime,
        }
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
