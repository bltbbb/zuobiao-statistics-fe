<template>
  <div class="EnumerationMan">
    <div class="header-wrapper">
      <h1>
        枚举管理
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          popper-class="popover-class">
        </el-popover>
      </h1>
    </div>
    <div class="man-btn">
      <el-button type="primary" @click="addEnu">新增</el-button>
    </div>
    <div class="log-table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="enumCode"
          label="CODE">
        </el-table-column>
        <el-table-column
          prop="enumGroup"
          label="分组">
        </el-table-column>
        <el-table-column
          prop="enumValue"
          label="值">
        </el-table-column>
        <el-table-column
          prop="enumTxt"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          label="是否缓存">
          <template scope="scope">
            <span v-if="scope.row.isCache" style="margin-left: 10px">是</span>
            <span v-if="!scope.row.isCache" style="margin-left: 10px">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sortIndex"
          label="排序">
        </el-table-column>
        <el-table-column width="150" label="操作">>
          <template scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="editeHandle(scope.$index, scope.row)">修改</el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteHandle(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="title" :visible.sync="addDialog" size="small" v-if="addDialog">
      <el-form :model="form2" label-width="100px" inline :rules="rules" ref="addFrom">
        <el-form-item label="CODE" prop="enumCode">
          <el-input v-model="form2.enumCode" style="width: 192px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分组" prop="enumGroup">
          <el-input v-model="form2.enumGroup" style="width: 192px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否缓存" prop="isCache">
          <el-select v-model="form2.isCache" style="width: 192px;" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值" prop="enumValue">
          <el-input v-model="form2.enumValue" style="width: 192px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortIndex">
          <el-input v-model="form2.sortIndex" style="width: 192px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="enumTxt">
          <el-input v-model="form2.enumTxt" style="width: 192px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea"  v-model="form2.remark" style="width: 192px;"  auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        title:'新增',
        editeFlag: false,
        addDialog: false,
        token:'',
        tableData: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        form: {
          oprBeginTimeStart:'',
          oprBeginTimeStop:'',
          mainAccount:'',
          isError:''
        },
        form2: {
          enumCode:'',
          enumGroup:'',
          isCache:'',
          enumValue:'',
          enumTxt: '',
          remark:'',
          sortIndex:''
        },
        rules: {
          enumCode: [
            { required: true, message: '请输入CODE', trigger: 'blur' }
          ],
          enumGroup: [
            { required: true, message: '请输入分组', trigger: 'blur' },
          ],
          isCache: [
            { required: true, message: '请选择是否缓存', trigger: 'change'},
          ],
          enumValue: [
            { required: true, message: '请输入值', trigger: 'blur' }
          ],
          enumTxt: [
            {  required: true, message: '请输入名称', trigger: 'change' }
          ],
          sortIndex: [
            { required: true, message: '请输入序号', trigger: 'blur',  },
            { pattern: /^[0-9]+$/, message: '请输入正确的序号', trigger: 'blur' },
          ]
        },
      }
    },
    mounted(){
      this.initParams()
      this.init()
    },
    methods:{
      init(){
        this.getAllPage()
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken');
      },
      getAllPage(){
        let data = {
          adoptToken: this.token,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
        this.$http.post(this.$store.state.domain+'/dicenum/page',qs.stringify(data)).then((res)=>{
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
        this.getAllPage()

      },
      handleCurrentChange(data){
        this.currentPage = data
        this.getAllPage()
      },
      addEnu(){
          this.title = '新增'
          this.form2 = {
            enumCode:'',
            enumGroup:'',
            isCache:'',
            enumValue:'',
            enumTxt: '',
            remark:'',
            sortIndex:''
          }
          this.addDialog = true
      },
      addHandle(){
        let canCommit = true
        this.$refs.addFrom.validate((valid) => {
          if (valid) {
            canCommit = true
          } else {
            canCommit = false
          }
        });
        if(!canCommit){
            return
        }
        let data = {
          adoptToken: this.token,
          ...this.form2
        }
        if(this.editeFlag){
          this.$http.put(this.$store.state.domain+'/dicenum',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.form2 = {
                enumCode:'',
                enumGroup:'',
                isCache:'',
                enumValue:'',
                enumTxt: '',
                remark:'',
                sortIndex:''
              }
              this.$message('修改成功')
              this.addDialog = false
              this.getAllPage()
            }
            else{

            }
          },(err)=>{
            //view('网络错误')
            this.$message.error('接口错误');
          })
        }else {
          this.$http.post(this.$store.state.domain+'/dicenum',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.form2 = {
                enumCode:'',
                enumGroup:'',
                isCache:'',
                enumValue:'',
                enumTxt: '',
                remark:'',
                sortIndex:''
              }
              this.$message('添加成功')
              this.addDialog = false
              this.getAllPage()
            }
            else{

            }
          },(err)=>{
            //view('网络错误')
            this.$message.error('接口错误');
          })
        }

      },
      deleteHandle(index,data){
        this.$http.delete(this.$store.state.domain+'/dicenum',{
          params:{
            adoptToken: this.token,
            id: data.id
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.$message('删除成功')
            this.getAllPage()
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('接口错误');
        })
      },
      editeHandle(index,data){
        this.title = '修改'
        this.addDialog = true
        this.form2 = data
        this.form2.isCache = data.isCache + ''
        this.editeFlag = true
      }
    }
  }
</script>
<style lang="sass" scoped>
  .EnumerationMan
    margin-top: 40px
    background: #fff
    .log-table
      padding: 10px 20px
      .pagination-wrapper
        text-align: center
        margin-top: 10px
    .log-form
      padding: 10px 20px 0
    .man-btn
      padding: 10px 10px 0 20px
</style>
<style lang="sass">
  .EnumerationMan
    .el-dialog--tiny
      width: 400px!important
</style>
