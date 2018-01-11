<template>
  <div class="AccessLog">
    <div class="header-wrapper">
      <h1>
        访问日志
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
        <div class="time-wrapper">
          <Calendar @timeValue="getTime" :containToday="true"></Calendar>
        </div>
        <div class="form-input">
          <!--<el-form-item label="开始时间">-->
            <!--<el-date-picker-->
              <!--v-model="form.visitBeginTimeStart"-->
              <!--type="date"-->
              <!--placeholder="选择日期"-->
              <!--@change="dateStart"-->
              <!--style="width: 146px;">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="结束时间">-->
            <!--<el-date-picker-->
              <!--v-model="form.visitBeginTimeStop"-->
              <!--type="date"-->
              <!--placeholder="选择日期"-->
              <!--@change="dateEnd"-->
              <!--style="width: 146px;">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item label="操作用户">
            <el-input style="width: 146px;" v-model="form.mainAccount"></el-input>
          </el-form-item>
          <el-form-item label="是否报错">
            <el-select v-model="form.isError" style="width: 146px;">
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
          prop="browserType"
          label="客户端浏览器类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="clientIp"
          label="客户端IP"
          width="150">
        </el-table-column>
        <el-table-column
          prop="errMsg"
          label="错误信息">
        </el-table-column>
        <el-table-column
          label="是否报错"
          width="100">
          <template scope="scope">
            <span v-if="scope.row.isError == 1" style="margin-left: 10px">是</span>
            <span v-if="scope.row.isError == -1" style="margin-left: 10px">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mainAccount"
          label="登陆名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="serverIp"
          label="服务IP">
        </el-table-column>
        <el-table-column
          prop="userAgent"
          label="UA">
        </el-table-column>
        <el-table-column
          prop="visitBeginTime"
          label="访问时间">
          <template scope="scope">
            <span>{{scope.row.visitBeginTime}}</span><br>
            <span>-</span><br>
            <span>{{ scope.row.visitEndTime}}</span>
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
  import Calendar from '@/components/calendar/Calendar'
  import qs from 'qs'
  export default {
    data() {
      return {
        token:'',
        tableData: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        form: {
          visitBeginTimeStart:'',
          visitBeginTimeStop:'',
          mainAccount:'',
          isError:''
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
        this.form.visitBeginTimeStart = start.Format("yyyy-MM-dd");
        this.form.visitBeginTimeStop = date.Format("yyyy-MM-dd");
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          ...this.form
        }
        this.$http.post(this.$store.state.domain+'/logVisit/page',qs.stringify(data)).then((res)=>{
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
          visitBeginTimeStart:'',
          visitBeginTimeStop:'',
          mainAccount:'',
          isError:''
        }
        this.getAllLog()
      },
//      dateStart(data){
//        this.form.oprBeginTimeStart = data
//      },
//      dateEnd(data){
//        this.form.oprBeginTimeStop = data
//      },
      getTime(msg){
        this.form.visitBeginTimeStart = msg[0].Format("yyyy-M-d");
        this.form.visitBeginTimeStop = msg[1].Format("yyyy-M-d");
        this.getAllLog()
      },
    }
  }
</script>
<style lang="sass">
  .AccessLog
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
