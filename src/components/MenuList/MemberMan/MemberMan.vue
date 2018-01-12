<template>
  <div class="MemberMan">
    <div class="header-wrapper">
      <h1>
        会员管理
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
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              @change="getTime"
              range-separator="~"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="登录账号">
            <el-input style="width: 146px;" v-model="form.loginId"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input style="width: 146px;" v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="行业">
            <el-select v-model="form.industryName" style="width: 162px;" placeholder="请选择">
              <el-option
                v-for="item in industryData"
                :key="item.id+''"
                :label="item.name"
                :value="item.id+''">
              </el-option>
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
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          type="index"
          width="65"
          label="序号">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="举报类型">-->
          <!--<template scope="scope">-->
            <!--<span>{{scope.type ? '用户' : '群组'}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="userId"
          label="会员账号"
          width="100">
        </el-table-column>
        <el-table-column
          label="登录账号"
          width="200">
          <template scope="scope">
            <span>{{scope.row.profileMobile}}</span><br v-if="scope.row.profileMobile">
            <span>{{scope.row.profileEmail}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="displayName"
          label="昵称"
          width="130">
        </el-table-column>
        <el-table-column
          prop="industryName"
          label="行业"
          width="130">
        </el-table-column>
        <el-table-column
          prop="scheNum"
          label="日程总数"
          width="100">
          <template scope="scope">
            <span>{{scope.row.scheNum ? scope.row.scheNum : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="PC端在线时长"
          width="140">
          <template scope="scope">
            <span>{{scope.row.pcTimes | toDateString}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="IOS端在线时长"
          width="140">
          <template scope="scope">
            <span>{{scope.row.iostimes | toDateString}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="androidTimes"
          label="Android在线时长"
          width="150">
          <template scope="scope">
            <span>{{scope.row.androidTimes | toDateString}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间">
          <template scope="scope">
            <span>{{(new Date(scope.row.createTime)).Format("yyyy-MM-dd hh:mm:ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="在线设备"
          width="150">
          <template scope="scope">
            <span v-if="scope.row.iosstatus == 1">ios</span><span v-if="scope.row.androidStatus == 1">,</span><span v-if="scope.row.androidStatus == 1">android</span><span v-if="scope.row.macOSStatus == 1">,</span><span v-if="scope.row.macOSStatus == 1">mac</span><span v-if="scope.row.pcStatus == 1">,</span><span v-if="scope.row.pcStatus == 1">pc</span><span v-if="scope.row.webStatus == 1">,</span><span v-if="scope.row.webStatus == 1">WEB</span><span v-if="scope.row.windowsStatus == 1">,</span><span v-if="scope.row.windowsStatus == 1">windows</span><span v-if="scope.row.unKnowStatus == 1&&scope.row.windowsStatus == 1">,</span><span v-if="scope.row.unKnowStatus == 1">未知</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template scope="scope">
            <el-button
              size="small"
              @click="seeReport(scope.$index, scope.row)"
              type="primary">查看</el-button>
            <!--<el-button-->
              <!--size="small"-->
              <!--@click="reportDelete(scope.$index, scope.row)"-->
              <!--type="danger">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="batchDelete" style="margin-top: 10px;" v-if="this.tableData.length != 0">-->
        <!--<el-button-->
          <!--@click="batchDelete"-->
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
    <div class="dialog">
      <el-dialog title="举报详情" :visible.sync="dialogTableVisible">
        <table width="100%" cellspacing="0" cellpadding="0" border="1" class="dialogTable" style="table-layout:fixed;">
          <tr>
            <th>会员账号</th>
            <td>{{detailData.userId}}</td>
            <th>昵称</th>
            <td>{{detailData.displayName}}</td>
          </tr>
          <tr>
            <th>性别</th>
            <td>
              <span v-if="detailData.sex == 1">男</span>
              <span v-if="detailData.sex == 2">女</span>
            </td>
            <th>年龄</th>
            <td v-if="detailData.age == '-9'">未知</td>
            <td v-if="detailData.age != '-9'">{{detailData.age}}</td>
          </tr>
          <tr>
            <th>生日</th>
            <td></td>
            <th>地区</th>
            <td></td>
          </tr>
          <tr>
            <th>行业</th>
            <td>{{detailData.industryName}}</td>
            <th>公司</th>
            <td>{{detailData.company}}</td>
          </tr>
          <tr>
            <th>职位</th>
            <td></td>
            <th>手机</th>
            <td>{{detailData.mobile}}</td>
          </tr>
          <tr>
            <th>邮箱</th>
            <td style="word-wrap:break-word;word-break:break-all;padding: 0 5px;">{{detailData.email}}</td>
            <th>注册时间</th>
            <td>{{(new Date(detailData.createTime)).Format("yyyy-MM-dd hh:mm:ss")}}</td>
          </tr>
          <tr>
            <th>绑定手机</th>
            <td>{{detailData.profileMobile}}</td>
            <th>绑定邮箱</th>
            <td>{{detailData.profileEmail}}</td>
          </tr>
          <tr>
            <th>日程数</th>
            <td>{{detailData.scheNum ? detailData.scheNum : 0}}</td>
            <th>PC端在线时长</th>
            <td>{{detailData.pcTimes | toDateString}}</td>
          </tr>
          <tr>
            <th>ios端在线时长</th>
            <td>{{detailData.iostimes | toDateString}}</td>
            <th>Android端在线时长</th>
            <td>{{detailData.androidTimes | toDateString}}</td>
          </tr>
          <tr>
            <!--<th>最近登录时间</th>-->
            <!--<td>-->
            <!--{{(new Date(detailData.updateTime)).Format("yyyy-MM-dd hh:mm:ss")}}-->
            <!--</td>-->
            <th>在线设备</th>
            <td>
              <span v-if="detailData.iosstatus == 1">ios</span><span v-if="detailData.androidStatus == 1">,</span><span v-if="detailData.androidStatus == 1">android</span><span v-if="detailData.macOSStatus == 1">,</span><span v-if="detailData.macOSStatus == 1">mac</span><span v-if="detailData.pcStatus == 1">,</span><span v-if="detailData.pcStatus == 1">pc</span><span v-if="detailData.webStatus == 1">,</span><span v-if="detailData.webStatus == 1">WEB</span><span v-if="detailData.windowsStatus == 1">,</span><span v-if="detailData.windowsStatus == 1">windows</span><span v-if="detailData.unKnowStatus == 1&&detailData.windowsStatus == 1">,</span><span v-if="detailData.unKnowStatus == 1">未知</span>
            </td>
          </tr>
        </table>
        <div class="sTable">
          <el-table
            :data="tableData2"
            max-height="200"
            style="width: 100%">
            <el-table-column
              type="index"
              width="65"
              label="序号">
            </el-table-column>
            <!--<el-table-column-->
            <!--label="举报类型">-->
            <!--<template scope="scope">-->
            <!--<span>{{scope.type ? '用户' : '群组'}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              prop="timestamp"
              label="登录时间">
              <template scope="scope">
                {{(new Date(scope.row.timestamp)).Format("yyyy-MM-dd hh:mm:ss")}}
              </template>
            </el-table-column>
            <el-table-column
              prop="ip"
              label="IP">
            </el-table-column>
            <el-table-column
              prop="addr"
              label="地区">
            </el-table-column>
            <el-table-column
              prop="platName"
              label="登录方式">
            </el-table-column>
          </el-table>
        </div>
        <!--<div class="btn-wrapper" v-if="detailData.status != 2">-->
          <!--<el-button-->
            <!--@click="repoertHanle(1)"-->
            <!--type="success">有效举报</el-button>-->
          <!--<el-button-->
            <!--@click="repoertHanle(2)"-->
            <!--type="danger">恶意举报</el-button>-->
        <!--</div>-->
        <div class="pagination-wrapper" v-if="this.tableData2.length > 0">
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount2">
          </el-pagination>
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
        dateRange: '',
        token:'',
        tableData: [],
        tableData2: [],
        industryData: [],
        detailData:{},
        totalCount: 0,
        totalCount2: 0,
        currentPage: 1,
        currentPage2: 1,
        pageSize: 10,
        pageSize2: 10,
        form:{
          loginId:'',
          nickName:'',
          industryName:'',
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
        this.getIndustryData()
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken');
//        let date = new Date();
//        let start = new Date();
//        date.setTime(date.getTime() - 3600 * 1000 * 24);
//        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.form.startDate = '';
        this.form.stopDate = '';
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startDate: this.form.startDate,
          stopDate: this.form.stopDate,
          id: this.form.id,
          loginId: this.form.loginId,
          nickName: this.form.nickName,
          industryId: this.form.industryName,
        }
        this.$http.post(this.$store.state.domain+'/userInfo/page',qs.stringify(data)).then((res)=>{
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
      getTable(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          cubeId: this.detailData.userId
        }
        this.$http.post(this.$store.state.domain+'/userInfo/loginInfo',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount2 = res.data.result.totalCount
            this.tableData2 = res.data.result.result
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
      handleSizeChange2(data){
        this.pageSize2 = data
        this.getTable()

      },
      handleCurrentChange2(data){
        this.currentPage2 = data
        this.getTable()
      },
      searchHandle(){
        this.getAllLog()
      },
      reset(){
        this.form = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startDate: '',
          stopDate: '',
          loginId: '',
          nickName: '',
          industryName: '',
        }
        this.dateRange = ''
        this.getAllLog()
      },
      getTime(msg){
        let arr = msg.split('~')
        this.form.startDate = arr[0]
        this.form.stopDate = arr[1]
        this.getAllLog()
      },
      seeReport(index,data){
        this.dialogTableVisible = true
        this.detailData = data
        this.remark = ''
        this.getTable()
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
         this.tableData = []
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
      },
      getIndustryData(){
        this.$http.get(this.$store.state.domain+'/userInfo/industry',{
          params:{
            adoptToken: this.token,
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.industryData = res.data.result.result
          }
          else{

          }
        },(err)=>{
          this.$message.error('接口错误');
        })
      },
    },
    filters:{
        toDateString: function (mss) {
          if(!mss){
              return 0
          }
          let days = parseInt(mss / (1000 * 60 * 60 * 24));
          let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = (mss % (1000 * 60)) / 1000;
          let date="";
          if(days!=0) {
            date=date+days + "天 ";
          }
          if(hours!=0) {
            date=date+ hours + "小时 ";
          }
          if(minutes!=0) {
            date=date+ minutes + "分 ";
          }
          if(seconds!=0) {
            date=date+ seconds + "秒 ";
          }
          return date
        }
    },
  }
</script>
<style lang="sass" scoped>
  .MemberMan
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
    .sTable
      margin-top: 15px
    .pagination-wrapper
      text-align: center
      margin-top: 10px
</style>
<style lang="sass">
  .MemberMan
    .el-dialog--small
      width: 55%
</style>
