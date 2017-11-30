<template>
    <div class="role-man-detail">
      <div class="header-wrapper">
        <h1>
          角色维护
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
      <div class="role-detail-main">
        <el-tabs type="border-card">
          <el-tab-pane label="信息维护">
            <el-form :model="form" label-width="80px">
              <el-form-item label="角色名称">
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色拼音">
                <el-input v-model="form.roleNameQp"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
            </el-form>
            <div class="tab1-btn">
              <el-button type="primary" @click="changeRole">保存</el-button>
              <el-button type="success">重置</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资源分配">
            <div class="tab2-left">
              <el-tree :data="treeData" ref="tree" node-key="menuId" :props="defaultProps" default-expand-all show-checkbox
                       @check-change="getCheckedNodes" :check-strictly="true"></el-tree>
            </div>
            <div class="tab2-right">
              <div class="table1" style="margin-bottom: 10px;">
                <h1>已提交</h1>
                <el-table
                  :data="tableData4"
                  border
                  style="width: 100%"
                  max-height="450"
                  @selection-change="handleSelectionChange"
                  @row-click="tableClick"
                  :highlight-current-row="true"
                  ref="table">
                  <el-table-column
                    prop="menuId"
                    label="菜单编码">
                  </el-table-column>
                  <el-table-column
                    prop="menuName"
                    label="菜单名称">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="80">
                    <template scope="scope">
                      <el-button
                        size="small"
                        @click="editeMenuHnadle(scope.$index, scope.row)"
                        type="primary">配置</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="table2">
                <h1>待提交</h1>
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%"
                  max-height="450"
                  @selection-change="handleSelectionChange"
                  @row-click="tableClick"
                  :highlight-current-row="true"
                  ref="table">
                  <el-table-column
                    prop="menuId"
                    label="菜单编码">
                  </el-table-column>
                  <el-table-column
                    prop="menuName"
                    label="菜单名称">
                  </el-table-column>
                </el-table>
                <div class="btn-wrapper">
                  <el-button
                    @click="commitMenuSelect"
                    type="success">提交</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="人员分配">
            <el-form :model="form2" label-width="80px" inline="">
              <el-form-item label="角色名称">
                <el-input v-model="form2.roleName"></el-input>
              </el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="success" @click="addRoleUser">新增</el-button>
            </el-form>
            <el-table
              :data="tableData2"
              border
              style="width: 100%">
              <el-table-column
                prop="nickName"
                label="用户昵称">
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="validBegin"
                label="开始有效时间">
              </el-table-column>
              <el-table-column
                prop="validEnd"
                label="结束有效时间">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="roleDelete2(scope.$index, scope.row)"
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
                :total="totalCounts">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据权限">数据权限</el-tab-pane>
        </el-tabs>
      </div>
      <div class="roleAddDialog">
        <el-dialog title="人员分配" :visible.sync="dialogTableVisible">
          <div class="selectWrapper">
            <el-select
              v-model="selectUserModel"
              filterable
              clearable
              placeholder="请输入关键词"
              :loading="loading"
              @change="selectChangeHandle">
              <el-option
                v-for="item in tableData3"
                :key="item.index"
                :label="item.nickName"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <el-table :data="tableData3" @selection-change="selectNotUser" max-height="250" ref="roleAddTable">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="nickName"
              label="用户昵称">
            </el-table-column>
            <el-table-column
              prop="phoneNo"
              label="手机">
            </el-table-column>
            <el-table-column
              prop="validBegin"
              label="开始有效时间">
            </el-table-column>
            <el-table-column
              prop="validEnd"
              label="结束有效时间">
            </el-table-column>
          </el-table>
          <div class="roleAddBtn">
            <el-button
              @click="selectUser"
              type="primary">提交</el-button>
            <el-button
              @click="dialogTableVisible = false"
              type="danger">取消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="comfirmDelete">
        <el-dialog
          title="提示"
          :visible.sync="confirmDialog"
          size="tiny">
          <span>该菜单权限已提交，是否删除该菜单权限</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="comfirmHandle(false)">取 消</el-button>
            <el-button type="primary" @click="comfirmHandle(true)">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data(){
            return {
              confirmDialog:false,
              selectUserData: [],
              selectUserModel:'',
              loading: false,
              token:'',
              dialogTableVisible: false,
              explain:'角色维护',
              form:{
                  ID:'',
                  name:'',
                  sname:'',
                  mark:''
              },
              form2:{
                ID:'',
                name:'',
                sname:'',
              },
              treeData: [{
                label: '一级 1',
                children: [{
                  label: '二级 1-1',
                  children: [{
                    label: '三级 1-1-1'
                  }]
                }]
              }, {
                label: '一级 2',
                children: [{
                  label: '二级 2-1',
                  children: [{
                    label: '三级 2-1-1'
                  }]
                }, {
                  label: '二级 2-2',
                  children: [{
                    label: '三级 2-2-1'
                  }]
                }]
              }, {
                label: '一级 3',
                children: [{
                  label: '二级 3-1',
                  children: [{
                    label: '三级 3-1-1'
                  }]
                }, {
                  label: '二级 3-2',
                  children: [{
                    label: '三级 3-2-1'
                  }]
                }]
              }],
              defaultProps:{
                children: 'children',
                label: 'label'
              },
              tableData: [],
              tableData2: [],
              tableData3: [{
                loginName:1,
                name: 1,
                sname: 2
              }],
              tableData4: [],
              currentPage: 1,
              totalCounts: 40,
              pageSize: 10,
              roleId: 0,
              selectedUser: [],
              selectMenu: [],
              setData: {}
            }
        },
        mounted(){
          this.initParams()
          this.init()
        },
        methods:{
          init(){
            this.getRoleInfo()
            this.getMenu()
            this.getUserByRole()
            this.getRoleAuth()
          },
          initParams(){
            this.token = this.$cookie.get('adoptToken')
            this.roleId = this.$route.params.id
          },
          getRoleInfo(){
            this.$http.get(this.$store.state.domain+'/role/getRole',{
                params:{
                  adoptToken: this.token,
                  roleId: this.roleId
                }
            }).then((res)=>{
              if(res.data.status == 0){
                this.form = res.data.result
              }
            },(err)=>{

            })
          },
          getMenu(){
            this.$http.get(this.$store.state.domain+'/menu',{
              params:{
                adoptToken: this.token
              }
            }).then((res)=>{
              if(res.data.status == 0){
                this.treeData = res.data.result.result
              }
            },(err)=>{

            })
          },
          handleNodeClick(){

          },
          handleSelectionChange(){

          },
          filterMethod(query, item) {
            return item.label.indexOf(query) > -1;
          },
          filterMethod2(query, item) {
            return item.label.indexOf(query) > -1;
          },
          roleEdit2(){

          },
          roleDelete2(index,data){
            let userId = data.userRoleID
            this.$http.delete(this.$store.state.domain+'/roleUser',{
                params:{
                  adoptToken: this.token,
                  id: userId
                }
            }).then((res)=>{
              if(res.data.status == 0){
                this.$message('删除成功')
                this.getUserByRole()
              }
            },(err)=>{

            })
          },
          handleSizeChange(data){
            this.pageSize = data
            this.getUserByRole()
          },
          handleCurrentChange(data){
            this.currentPage = data
            this.getUserByRole()
          },
          getCheckedNodes(data,isChecked){
              this.tableData = []
              if(!isChecked){
                this.tableData4.forEach((item)=>{
                    if(item.menuId == data.menuId){
                        this.confirmDialog = true
                        this.setData = item
                    }
                })
              }else {
                this.tableData4.forEach((item)=>{
                  if(item.menuId != data.menuId){
                    this.tableData.push(data)
                  }
                })
              }
//              this.tableData = this.$refs.tree.getCheckedNodes()
//              let length = this.tableData4.length
//              for (var i = 0;i<length;i++){
//                this.tableData.splice(4,1)
////                if(this.tableData4[i].menuId == this.tableData[i].menuId){
////                  this.tableData.splice(i,1)
////                }
//              }
          },
          comfirmHandle(bool){
              if(bool){
                  this.deleteRoleAuth(this.setData.roleVisitId)
                  this.confirmDialog = false
              }else{
                  this.$refs.tree.setChecked(this.setData,true)
                  this.confirmDialog = false
              }
          },
          tableClick(row, event, column){
            this.$refs.table.setCurrentRow(row)
            this.getMenuSource(row.menuId)
          },
          getMenuSource(id){
            let data = {
              adoptToken: this.token,
              menuId: id
            }
            this.$http.post(this.$store.state.domain+'/resPanel/query',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                console.log(res)
              }
            },(err)=>{

            })
          },
          changeRole(){
              let data = {
                adoptToken: this.token,
                roleId: this.roleId,
                roleName: this.form.roleName,
                remark: this.form.remark,
                roleNameQp: this.form.roleNameQp
              }
              console.log(data)
              this.$http.put(this.$store.state.domain+'/role',qs.stringify(data)).then((res)=>{
                if(res.data.status == 0){
                  this.$message('修改成功')
                }else {
                  this.$message('修改失败')
                }
              },(err)=>{
                this.$message('修改失败')
              })
          },
          getUserByRole(){
            this.$http.get(this.$store.state.domain+'/user/queryByRoleIdSelected',{
                params:{
                  adoptToken: this.token,
                  roleId: this.roleId,
                  pageSize: this.pageSize,
                  currentPage: this.currentPage
                }
            }).then((res)=>{
              if(res.data.status == 0){
                this.totalCounts = res.data.result.totalCount
                this.tableData2 = res.data.result.result
              }
            },(err)=>{

            })
          },
          addRoleUser(){
            this.dialogTableVisible = true
            this.$http.get(this.$store.state.domain+'/user/queryByRoleIdNotSelected',{
              params:{
                adoptToken: this.token,
                roleId: this.roleId
              }
            }).then((res)=>{
              if(res.data.status == 0){
                this.tableData3 = res.data.result.result
              }
            },(err)=>{

            })
          },
          selectNotUser(selection){
              this.selectedUser = []
              selection.forEach((item)=>{
                  this.selectedUser.push(item.userId)
              })
          },
          selectUser(){
            let data =  {
                adoptToken: this.token,
                userId: this.selectedUser.join(','),
                roleId: this.roleId
            }
            this.$http.post(this.$store.state.domain+'/roleUser/insertCodeBatch',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.$message('提交成功')
                this.getUserByRole()
                this.dialogTableVisible = false
              }
            },(err)=>{

            })
          },
          selectChangeHandle(data){
            if (this.tableData3[data.index]) {
              this.$refs.roleAddTable.toggleRowSelection(this.tableData3[data.index]);
            }
          },
          commitMenuSelect(){
            let id = []
            this.tableData.forEach((item)=>{
              id.push(item.privVisitId)
            })
            let data =  {
              adoptToken: this.token,
              roleId: this.roleId,
              privVisitId: id.join(',')
            }
            this.$http.post(this.$store.state.domain+'/roleVisit/insertCodeBatch',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.$message('提交成功')
                this.tableData = []
                this.getRoleAuth()
              }
            },(err)=>{

            })
          },
          getRoleAuth(){
            this.$http.get(this.$store.state.domain+'/menu/queryByRoleId',{
                params:{
                  adoptToken: this.token,
                  roleId: this.roleId,
                }
            }).then((res)=>{
              if(res.data.status == 0){
                this.tableData4 = res.data.result.result
                this.checkedMenu()
              }
            },(err)=>{

            })
          },
          deleteRoleAuth(id){
            this.$http.delete(this.$store.state.domain+'/roleVisit',{
              params:{
                adoptToken: this.token,
                id: id
              }
            }).then((res)=>{
              if(res.data.status == 0){
                  this.getRoleAuth()
              }
            },(err)=>{

            })
          },
          checkedMenu(){
              this.$refs.tree.setCheckedNodes(this.tableData4)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .role-man-detail
    margin-top: 40px
    background: #fff
    .role-detail-main
      padding: 20px
      .tab1-btn
        text-align: center
      .tab2-left
        width: 20%
        float: left
      .tab2-right
        width: 75%
        float: right
        h1
          padding-bottom: 5px
          border-bottom: 1px solid #ccc
          margin-bottom: 10px
        .transfer-wrapper
          .transfer
            text-align: center
            margin-top: 20px
      .pagination-wrapper
        margin-top: 20px
        text-align: center
    .roleAddBtn
      margin-top: 10px
      text-align: center
    .selectWrapper
      margin-bottom: 10px
      .el-select
        display: block
  .btn-wrapper
    text-align: right
    margin-top: 15px
</style>
<style lang="sass">
  .el-table__body-wrapper
    overflow-x: hidden
</style>
