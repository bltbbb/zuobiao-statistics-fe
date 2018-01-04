<template>
  <div class="Feedback">
    <div class="header-wrapper">
      <h1>
        自定义事件
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
            <el-select v-model="form2.appId" style="width: 192px;" placeholder="请选择" filterable>
              <el-option
                v-for="plat in appIdData"
                :key="plat.id+''"
                :label="plat.appName"
                :value="plat.id+''">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件ID">
            <el-input style="width: 146px;" v-model="form2.eventId"></el-input>
          </el-form-item>
          <el-form-item label="事件名称">
            <el-input style="width: 146px;" v-model="form2.eventName"></el-input>
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
            <el-button type="success" @click="addApp">新增事件</el-button>
            <el-button type="success" @click="addClass">新增分类</el-button>
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
          label="Application">
        </el-table-column><el-table-column
          prop="classifyName"
          label="分类">
        </el-table-column>
        <el-table-column
          prop="eventId"
          label="事件ID">
        </el-table-column>
        <el-table-column
          prop="eventName"
          label="事件">
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
          <el-form-item label="appId" prop="appId">
            <el-input v-model="form.appId" style="width: 192px;"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="事件ID" prop="eventId">
            <el-input v-model="form.eventId" style="width: 192px;"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="事件分类" prop="classifyId">
            <el-select v-model="form.classifyId" style="width: 192px;" placeholder="请选择" filterable allow-create>
              <el-option
                v-for="plat in plats"
                :key="plat.id+''"
                :label="plat.classifyName"
                :value="plat.id+''">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件名称" prop="eventName">
            <el-input v-model="form.eventName" style="width: 192px;"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" style="width: 192px;" placeholder="请选择">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="已删除" value="-1"></el-option>
            </el-select>
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
      <el-dialog title="新增分类" :visible.sync="classDialog" size="tiny">
        <el-form :model="form3">
          <el-form-item label="分类名称" label-width="100px">
            <el-input v-model="form3.classifyName" auto-complete="off" style="width: 90%;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="classDialog = false">取 消</el-button>
          <el-button type="primary" @click="addClassHandle">确 定</el-button>
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
          appId :'',
          eventId : '',
          eventName: '',
          status: '',
          classifyId:''
        },
        form2:{
          appId :'',
          eventId : '',
          eventName: '',
          status: '',
          classifyId:''
        },
        form3:{
          classifyName:''
        },
        feedbackId:[],
        change: false,
        adoptToken: '',
        plats: [],
        appIdData:[],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        classDialog: false
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        this.initParams()
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
            this.getPlat()
            this.getAppIdData()
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
        let data = {
          token: this.token,
        }
        this.$http.post(this.domain+'/findEventClassify',qs.stringify(data)).then((res)=>{
          this.plats = res.data.result;
        });
      },
      //获取平台
      getAppIdData(){
        let data = {
          token: this.token,
          currentPage: 1,
          pageSize: 1000,
        }
        this.$http.post(this.domain+'/findApplication',qs.stringify(data)).then((res)=>{
          if(res.data.status == 'success'){
            this.appIdData = res.data.result.result
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('请求错误');
        })
      },
      getAllLog(){
        let data = {
          token: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          appId: this.form2.appId,
          classifyId:this.form2.classifyId,
          eventId: this.form2.eventId,
          eventName: this.form2.eventName,
          status: this.form2.status
        }
        this.$http.post(this.domain+'/findEvent',qs.stringify(data)).then((res)=>{
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
          appId :'',
          eventId : '',
          eventName: '',
          status: '',
          classifyId:''
        }
        this.getAllLog()
      },
      appDelete(index,data){
        this.change = false
        this.deleteHandle(data)
      },
      appChange(index,data){
        this.addDialog = true
        this.form.status = data.status +''
        this.form.appId  = data.appId
        this.form.eventId  = data.eventId
        this.form.eventName  = data.eventName
        this.form.describe = data.describe
        this.form.id = data.id
        this.change = true
        this.form.classifyId = []
        this.getPlat()

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
        this.$http.post(this.domain+'/alterEvent?token='+this.token+'&alter='+alter,postData).then((res)=>{
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
        this.form = {
          appId :'',
          eventId : '',
          eventName: '',
          status: '',
          classifyId:''
        }
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
        this.$http.post(this.domain+'/saveEvent?token='+this.token,dataString).then((res)=>{
          if(res.data.status == 'success'){
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
      addClass(){
        this.classDialog = true
      },
      addClassHandle(){
        let data = {
          ...this.form3
        }
        this.$http.post(this.domain+'/saveEventClassify?token='+this.token,data).then((res)=>{
          if(res.data.status == 'success'){
            this.$message('新增成功')
            this.classDialog = false
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
        postData.appId = data.appId
        postData.eventId = data.eventId
        postData.eventName = data.eventName
        postData.describe = data.describe
        postData.id = data.id
        this.$http.post(this.domain+'/alterEvent?token='+this.token+'&alter=1',postData).then((res)=>{
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
