<template>
  <div class="Feedback">
    <div class="header-wrapper">
      <h1>
        应用管理
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
          <el-form-item label="Application">
            <el-input style="width: 146px;" v-model="form2.appName"></el-input>
          </el-form-item>
          <el-form-item label="签名">
            <el-input style="width: 146px;" v-model="form2.appSignature"></el-input>
          </el-form-item>
          <el-form-item label="LicenseKey">
            <el-input style="width: 146px;" v-model="form2.appLicenseKey"></el-input>
          </el-form-item>
          <el-form-item label="平台类型">
            <el-select v-model="form2.appPlatId" style="width: 192px;" placeholder="请选择">
              <el-option
                v-for="plat in plats"
                :key="plat.id+''"
                :label="plat.name"
                :value="plat.id+''">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form2.status" style="width: 192px;" placeholder="请选择">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="已删除" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 30px;">
            <el-button @click="searchHandle">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button type="success" @click="addApp">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="log-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          type="index"
          width="70"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="Application"
          width="120">
        </el-table-column>
        <el-table-column
          prop="appPlatName"
          label="平台类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="appLicenseKey"
          label="LicenseKey"
          width="180">
        </el-table-column>
        <el-table-column
          prop="appSignature"
          label="签名">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="描述">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template scope="scope">
            <span>{{(new Date(scope.row.ctime)).Format("yyyy-MM-dd hh:mm:ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-if="scope.row.status == -1">已删除</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template scope="scope">
            <el-button
              size="small"
              @click="appChange(scope.$index, scope.row)"
              type="primary">修改</el-button>
            <el-button
              size="small"
              @click="appDelete(scope.$index, scope.row)"
              type="danger" v-if="scope.row.status != -1">删除</el-button>
            <el-button
              size="small"
              @click="appRestart(scope.$index, scope.row)"
              type="success" v-if="scope.row.status == -1">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="title" :visible.sync="addDialog" size="small" v-if="addDialog">
        <el-form :model="form" label-width="100px" inline ref="addFrom">
          <el-form-item label="key" prop="appLicenseKey">
            <el-input v-model="form.appLicenseKey" style="width: 192px;"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="appName">
            <el-input v-model="form.appName" style="width: 192px;"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="平台类型" prop="appPlatId">
            <el-select v-model="form.appPlatId" style="width: 192px;" placeholder="请选择">
              <el-option
                v-for="plat in plats"
                :key="plat.id+''"
                :label="plat.name"
                :value="plat.id+''">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" style="width: 192px;" placeholder="请选择">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="已删除" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签名" prop="appSignature">
            <el-input v-model="form.appSignature" style="width: 192px;"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea"  v-model="form.describe" style="width: 192px;"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addHandle">确 定</el-button>
        </div>
      </el-dialog>
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
  import md5 from 'js-md5'

  export default {
    data() {
      return {
        title: '新增',
        addDialog: false,
        domain:'http://192.168.1.21:8088',
        token:'',
        tableData: [],
        form:{
          appLicenseKey:'',
          appName: '',
          appPlatId: '',
          appSignature: '',
          describe: '',
          status: ''
        },
        form2:{
          appLicenseKey:'',
          appName: '',
          appPlatId: '',
          appSignature: '',
          status: ''
        },
        feedbackId:[],
        change: false,
        adoptToken: '',
        plats: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        this.initParams()
        this.getPlat()
        this.login()
      },
      initParams(){
        this.adoptToken = this.$cookie.get('adoptToken');
      },
      login(){
        let data = {
          userName: 'gather-admin',
          passWord: md5('gather-admin-!QAZily@WSX'),
        }
        this.$http.post(this.domain+'/loginApp',qs.stringify(data)).then((res)=>{
          if(res.data.status == 'success'){
            this.token = res.data.result.token
            this.getAllLog()
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('请求错误');
        })
      },
      //获取平台
      getPlat(){
        this.$http.get(this.$store.state.domain+'/getPlatform',{
          params:{
            adoptToken:this.adoptToken
          }
        }).then((res)=>{
          this.plats = res.data.result.result;
        });
      },
      getAllLog(){
        let data = {
          token: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          appName: this.form2.appName,
          appLicenseKey:this.form2.appLicenseKey,
          appPlatId: this.form2.appPlatId,
          appSignature: this.form2.appSignature,
          status: this.form2.status
        }
        this.$http.post(this.domain+'/findApplication',qs.stringify(data)).then((res)=>{
          if(res.data.status == 'success'){
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
        this.form2 = {
          appLicenseKey:'',
          appName: '',
          appPlatId: '',
          appSignature: '',
          status: ''
        }
        this.getAllLog()
      },
      getTime(msg){
        this.form.startTime = msg[0].Format("yyyy-M-d");
        this.form.stopTime = msg[1].Format("yyyy-M-d");
        this.getAllLog()
      },
      appDelete(index,data){
        this.change = false
        this.deleteHandle(data)
      },
      appChange(index,data){
        this.addDialog = true
        this.form.status = data.status +''
        this.form.appName = data.appName
        this.form.appLicenseKey = data.appLicenseKey
        this.form.appPlatId = data.appPlatId + ''
        this.form.appSignature = data.appSignature
        this.form.describe = data.describe
        this.form.id = data.id
        this.change = true
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
      deleteHandle(data){
        let postData = {}
        let msg = ''
        let alter = 0
        if(this.change){
          postData = {
            ...this.form
          }
          msg = '修改成功'
          alter = 1
        }else {
          postData = {
              id: data.id
          }
          msg = '删除成功'
          alter = 0
        }
        this.$http.post(this.domain+'/alterApplication?token='+this.token+'&alter='+alter,postData).then((res)=>{
          if(res.data.status == 'success'){
            this.$message(msg)
            this.getAllLog()
            this.addDialog = false
          }
          else{

          }
        },(err)=>{
          this.$message.error('接口错误');
        })
      },
      addApp(){
        this.addDialog = true
      },
      addHandle(){
        if(this.change){
          this.deleteHandle()
          return
        }
        let dataString = {
          ...this.form
        }
        this.$http.post(this.domain+'/saveApplication?token='+this.token,dataString).then((res)=>{
          if(res.data.status == 0){
            this.$message('新增成功')
            this.getAllLog()
            this.addDialog = false
          }
          else{

          }
        },(err)=>{
          this.$message.error('接口错误');
        })
      },
      appRestart(index,data){
        let postData = {}
        postData.status = 1
        postData.appLicenseKey = data.appLicenseKey
        postData.appName = data.appName
        postData.appPlatId = data.appPlatId
        postData.appSignature = data.appSignature
        postData.describe = data.describe
        postData.id = data.id
        this.$http.post(this.domain+'/alterApplication?token='+this.token+'&alter=1',postData).then((res)=>{
          if(res.data.status == 'success'){
            this.$message.success('启用成功');
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
</style>
