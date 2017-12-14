<template>
  <div class="role-man">
    <div class="header-wrapper">
      <h1>
        角色管理
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          popper-class="popover-class">
          <slot>{{explain}}</slot>
          <i class="el-icon-information" slot="reference"></i>
        </el-popover>
      </h1>
    </div>
    <div class="role-main">
      <el-form :model="form" label-width="80px" inline="">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchRole">查询</el-button>
        <el-button type="success" @click="addRole">新增</el-button>
      </el-form>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="validBegin"
          label="有效开始时间">
        </el-table-column>
        <el-table-column
          prop="validEnd"
          label="有效结束时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="scope">
            <el-button
              size="small"
              @click="roleEdit(scope.$index, scope.row)"
              type="primary">配置</el-button>
            <el-button
              size="small"
              @click="deleteRole(scope.$index, scope.row)"
              type="danger">删除</el-button>
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
      <div class="addRoleDialog">
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible" size="tiny">
          <el-form :model="form2">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form2.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色拼音" :label-width="formLabelWidth">
              <el-input v-model="form2.roleNameQp" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form2.remark" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="postAddRole">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data(){
      return {
        dialogFormVisible: false,
        formLabelWidth:'100px',
        token:'',
        currentPage:1,
        pageSize: 10,
        totalCount: 40,
        explain: '角色维护',
        form:{
          roleName: '',
          remark:''
        },
        form2:{
          roleName: '',
          roleNameQp: '',
          remark: ''
        },
        tableData: [{
          name: 1,
          address: 2
        }],
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        this.initParams()
        this.getAllRole()
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken')
      },
      getAllRole(){
        let data = {
          adoptToken: this.token,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          roleName: this.form.roleName,
          remark: this.form.remark
        }
        this.$http.post(this.$store.state.domain+'/role/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount = res.data.result.totalCount
            this.tableData = res.data.result.result
          }
        },(err)=>{

        })
      },
      roleEdit(index,row){
        this.$router.push('/Content/RoleManDetail/'+row.roleId)
      },
      roleDelete(){

      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      addRole(){
        this.dialogFormVisible = true
      },
      postAddRole(){
        let data = {
          adoptToken: this.token,
          ...this.form2
        }
        this.$http.post(this.$store.state.domain+'/role',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.$message('提交成功')
            this.dialogFormVisible = false
            this.getAllRole()
          }
        },(err)=>{

        })
      },
      deleteRole(index,row){
        this.$http.delete(this.$store.state.domain+'/role',{
            params:{
              adoptToken: this.token,
              roleId: row.roleId
            }
        }).then((res)=>{
          if(res.data.status == 0){
            this.$message('删除成功')
            this.getAllRole()
          }
        },(err)=>{

        })
      },
      searchRole(){
        this.getAllRole()
      }
    }
  }
</script>
<style lang="sass" scoped>
  .role-man
    margin-top: 40px
    background: #fff
    .role-main
      padding: 20px
      .pagination-wrapper
        margin-top: 15px
        text-align: center
</style>
<style lang="sass">
  .role-man
    .el-dialog--tiny
      width: 25%
      padding-right: 20px
</style>
