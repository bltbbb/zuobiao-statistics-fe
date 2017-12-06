<template>
  <div class="LogLogin">
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
          prop="clientIp"
          label="客户端Id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="browserType"
          label="浏览器类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="logId"
          label="日志Id"
          width="150">
        </el-table-column>
        <el-table-column
          prop="loginTime"
          label="登陆时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="serverIp"
          label="服务Id"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mainAccount"
          label="登录名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sessionId"
          label="sessionId">
        </el-table-column>
        <el-table-column
          prop="userAgent"
          label="客户端ua信息">
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
          this.$http.post(this.$store.state.domain+'/logLogin/page',qs.stringify(data)).then((res)=>{
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
  .LogLogin
    margin-top: 40px
    background: #fff
    .log-table
      padding: 10px 20px
      .pagination-wrapper
        text-align: center
        margin-top: 10px
</style>
