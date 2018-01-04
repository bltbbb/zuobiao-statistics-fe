<template>
  <div class="ReportMan">
    <div class="header-wrapper">
      <h1>
        举报管理
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
          <Calendar @timeValue="getTime"></Calendar>
          <el-form-item label="举报人ID">
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
        style="width: 100%">
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
          label="举报类型">
          <template scope="scope">
            <span>{{scope.type ? '用户' : '群组'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="masterId"
          label="举报人ID">
        </el-table-column>
        <el-table-column
          prop="masterName"
          label="举报人昵称">
        </el-table-column>
        <el-table-column
          prop="targetId"
          label="被举报人ID">
        </el-table-column>
        <el-table-column
          prop="targetName"
          label="被举报人昵称">
        </el-table-column>
        <el-table-column
          label="举报时间">
          <template scope="scope">
            <span>{{(new Date(scope.row.createTime)).Format("yyyy-MM-dd hh:mm:ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="举报状态">
          <template scope="scope">
            <span v-if="scope.row.status == 0">未处理</span>
            <span v-if="scope.row.status == 1">处理中</span>
            <span v-if="scope.row.status == 2">处理完成</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理结果">
          <template scope="scope">
            <span v-if="scope.row.isMalice == 0">N/A</span>
            <span v-if="scope.row.isMalice == 1">有效举报</span>
            <span v-if="scope.row.isMalice == 2">恶意举报</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template scope="scope">
            <el-button
              size="small"
              @click="seeReport(scope.$index, scope.row)"
              type="primary">查看</el-button>
            <el-button
              size="small"
              @click="reportDelete(scope.$index, scope.row)"
              type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="batchDelete" style="margin-top: 10px;" v-if="this.tableData.length != 0">
        <el-button
          @click="batchDelete"
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
    <div class="dialog">
      <el-dialog title="举报详情" :visible.sync="dialogTableVisible">
        <table width="100%" cellspacing="0" cellpadding="0" border="1" class="dialogTable" style="table-layout:fixed;">
          <tr>
            <th>举报类型</th>
            <td>{{detailData.type ? '用户' : '群组'}}</td>
          </tr>
          <tr>
            <th>举报人ID</th>
            <td>{{detailData.masterId}}</td>
          </tr>
          <tr>
            <th>举报人昵称</th>
            <td>{{detailData.masterName}}</td>
          </tr>
          <tr>
            <th>被举报人ID</th>
            <td>{{detailData.targetId}}</td>
          </tr>
          <tr>
            <th>被举报人昵称</th>
            <td>{{detailData.targetName}}</td>
          </tr>
          <tr>
            <th>举报内容</th>
            <td><div style="word-wrap:break-word;word-break:break-all;padding: 0 8px;">{{detailData.content}}</div></td>
          </tr>
          <tr>
            <th>举报人时间</th>
            <td>{{(new Date(detailData.createTime)).Format("yyyy-MM-dd hh:mm:ss")}}</td>
          </tr>
          <tr>
            <th>举报状态</th>
            <td>
              <span v-if="detailData.status == 0">未处理</span>
              <span v-if="detailData.status == 1">处理中</span>
              <span v-if="detailData.status == 2">处理完成</span>
            </td>
          </tr>
          <tr v-if="detailData.status == 2">
            <th>处理人员</th>
            <td>{{detailData.delPeople}}</td>
          </tr>
          <tr v-if="detailData.status == 2">
            <th>处理时间</th>
            <td>{{(new Date(detailData.delTime)).Format("yyyy-MM-dd hh:mm:ss")}}</td>
          </tr>
          <tr v-if="detailData.status == 2">
            <th>处理结果</th>
            <span v-if="detailData.isMalice == 0">N/A</span>
            <span v-if="detailData.isMalice == 1">有效举报</span>
            <span v-if="detailData.isMalice == 2">恶意举报</span>
          </tr>
          <tr v-if="detailData.status == 2">
            <th>处理备注</th>
            <td>{{detailData.result}}</td>
          </tr>
          <tr v-if="detailData.status != 2">
            <th>处理备注</th>
            <td style="padding: 3px 5px;"><el-input type="textarea" v-model="remark"></el-input></td>
          </tr>
        </table>
        <div class="btn-wrapper" v-if="detailData.status != 2">
          <el-button
            @click="repoertHanle(1)"
            type="success">有效举报</el-button>
          <el-button
            @click="repoertHanle(2)"
            type="danger">恶意举报</el-button>
        </div>
      </el-dialog>
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
        detailData:{},
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        form:{
          startTime:'',
          stopTime:'',
          id:'',
        },
        remark:'',
        dialogTableVisible: false
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
        this.form.startDate = start.Format("yyyy-MM-dd");
        this.form.stopDate = date.Format("yyyy-MM-dd");
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startTime: this.form.startDate,
          stopTime: this.form.stopDate,
          id: this.form.id
        }
        this.$http.post(this.$store.state.domain+'/complaint/page',qs.stringify(data)).then((res)=>{
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
      },
      searchHandle(){
        this.getAllLog()
      },
      reset(){
        this.form = {
          id:''
        }
        this.getAllLog()
      },
//      dateStart(data){
//        this.form.startDate = data
//      },
//      dateEnd(data){
//        this.form.stopDate = data
//      },
      getTime(msg){
        this.form.startDate = msg[0].Format("yyyy-M-d");
        this.form.stopDate = msg[1].Format("yyyy-M-d");
        this.getAllLog()
      },
      seeReport(index,data){
        this.dialogTableVisible = true
        this.detailData = data
        this.remark = ''
      },
      repoertHanle(isMalice){
        let data = {
          adoptToken: this.token,
          id: this.detailData.id,
          result: this.remark,
          isMalice: isMalice
        }
        this.$http.post(this.$store.state.domain+'/complaint/handle',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.getAllLog()
            this.dialogTableVisible = false
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      reportDelete(index,data){
        let id = data.id
        this.deleteHandle(id)
      },
      handleSelectionChange(val){
        this.idArr = []
        val.forEach(item=>{
          this.idArr.push(item.id)
        })
      },
      batchDelete(){
        this.deleteHandle(this.idArr.join(','))
      },
      deleteHandle(id){
        this.$http.delete(this.$store.state.domain+'/complaint',{
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
  .ReportMan
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
    .dialogTable
      line-height: 40px
      text-align: center
      color: #1f2d3d
      border: 1px solid #dfe6ec
      th
        width: 40%
        background: #EEF1F6
      td
        width: 60%
    .btn-wrapper
      text-align: center
      margin-top: 15px
</style>
