<template>
  <div class="CrashQuery">
    <div class="header-wrapper">
      <h1>
        崩溃查询
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          popper-class="popover-class">
        </el-popover>
      </h1>
    </div>
    <div class="title-box">
      <Calendar @timeValue="getTime"></Calendar>
      <div class="title-select-box" :row="4">
        <el-select v-model="platVal" placeholder="平台">
          <el-option
            v-for="plat in plats"
            :key="plat.id+''"
            :label="plat.name"
            :value="plat.id+''">
          </el-option>
        </el-select>
        <el-select v-model="canalVal" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
          </el-option>
        </el-select>
        <el-select v-model="evalVal" placeholder="版本">
          <el-option
            v-for="edition in editions"
            :key="edition.appVersionId+''"
            :label="edition.appVersion"
            :value="edition.appVersionId+''">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="log-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border>
        <el-table-column
          prop="crashMessageId"
          label="崩溃信息ID"
          width="240">
        </el-table-column>
        <el-table-column
          prop="platform"
          label="崩溃平台"
          width="150">
        </el-table-column>
        <el-table-column
          prop="processType"
          label="进程类型"
          width="240">
        </el-table-column>
        <el-table-column
          prop="guid"
          label="崩溃uuid"
          width="380">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="是否报错"-->
          <!--width="100">-->
          <!--<template scope="scope">-->
            <!--<span v-if="scope.row.isError == 1" style="margin-left: 10px">是</span>-->
            <!--<span v-if="scope.row.isError == -1" style="margin-left: 10px">否</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="version"
          label="应用版本"
          width="100">
        </el-table-column>
        <el-table-column
          prop="prod"
          label="应用名称"
          width="240">
        </el-table-column>
        <el-table-column
        label="崩溃时间">
          <template scope="scope">
            <span>{{scope.row.year}}/{{scope.row.month}}/{{scope.row.day}} {{scope.row.hour}}:00</span>
          </template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="80"
        prop="handle">
          <template scope="scope">
            <a style="text-decoration: none" :href ="$store.state.domain+'/collapseDownload?adoptToken='+token+'&crashMessageId='+scope.row.crashMessageId" download="w3logo" >
              下载
            </a>
            <!--<el-button-->
            <!--size="small"-->
            <!--@click="handleEdit(scope.$index, scope.row)"-->
            <!--type="primary">-->
            <!--下载-->
            <!--</el-button>-->
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
        },
        platVal: '-1',
        canalVal: '-1',
        evalVal: '-1',
        plats: [],
        canals: [{
          val: '-1',
          label: '全部渠道'
        }],
        editions: [],
        dateType:'',
        start:'',
        end:''
      }
    },
    mounted(){
      this.initParams()
      this.init()
    },
    components:{
      Calendar
    },
    methods:{
      init(){
        this.getAllLog()

        //获取平台
        this.$http.get(this.$store.state.domain+'/getPlatform',{
          params:{
            adoptToken:this.token
          }
        }).then((res)=>{
          this.plats = res.data.result.result;
        });

        this.getEditions();
      },
      getEditions: function () {
        let data = {
          adoptToken: this.token,
          appPlatId: this.platVal
        }

        //获取版本
        this.$http.post(this.$store.state.domain+'/getEdition',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.editions = res.data.result.result;
          }
          else{
            //view(res.data.msg)
            this.$message.error('登录过期，请重新登录');
            lockr.rm("menuInfo");
            this.$cookie.delete('adoptToken');
            this.$router.push('/login');
          }
        })
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken');
        let date = new Date();
        let start = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        this.start = start.Format("yyyy-MM-dd");
        this.end = date.Format("yyyy-MM-dd");
      },
      getAllLog(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startDate:this.start,
          stopDate:this.end,
          platformId: this.platVal,
          channelId: this.canalVal,
          versionId: this.evalVal
        }
        this.$http.post(this.$store.state.domain+'/queryCollapse',qs.stringify(data)).then((res)=>{
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
//      searchHandle(){
//        this.getAllLog()
//      },
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
        this.start = msg[0].Format("yyyy-M-d");
        this.end = msg[1].Format("yyyy-M-d");
        this.getAllLog();
      },
      handleEdit(index,data){
        window.location.href='/collapseDownload?adoptToken='+this.token+'&crashMessageId='+data.crashMessageId
//        this.$http.get(this.$store.state.domain+'/collapseDownload',{
//            params:{
//              adoptToken: this.token,
//              crashMessageId: data.crashMessageId
//            }
//        }).then((res)=>{
//          if(res.data.status == 0){
//            this.$message('开始下载...')
//          }
//          else{
//
//          }
//        },(err)=>{
//          //view('网络错误')
//          this.$message.error('接口错误');
//        })
      }
    },
    watch: {
      platVal: function (val) {
        this.getAllLog();
        this.getEditions();
      },
      evalVal: function (val) {
        this.getAllLog();
      },
      canalVal: function (val) {
        this.getAllLog();
      }
    }
  }
</script>
<style lang="sass">
  .CrashQuery
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
    .title-select-box
      float: right
</style>
