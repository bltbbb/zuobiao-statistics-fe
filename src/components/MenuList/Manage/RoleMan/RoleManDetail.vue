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
            <el-form :model="form" label-width="80px" :rules="rules" ref="editeRoleForm">
              <el-form-item label="角色名称" prop="roleName">
                <el-input style="width: 216px" v-model="form.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色拼音" prop="roleNameQp">
                <el-input style="width: 216px" v-model="form.roleNameQp"></el-input>
              </el-form-item>
              <el-form-item label="有效时间" prop="valueTime" style="width: 296px">
                <el-date-picker
                  v-model="form.valueTime"
                  type="daterange"
                  placeholder="选择日期范围"
                  range-separator="~"
                  @change="dataChange">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :autoSize="{ minRows: 2, maxRows: 10}" v-model="form.remark"></el-input>
              </el-form-item>
            </el-form>
            <div class="tab1-btn">
              <el-button type="primary" @click="changeRole">保存</el-button>
              <el-button type="success">重置</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资源分配">
            <div class="tab2-left">
              <el-tree :data="treeData" ref="tree" node-key="menuId" :props="defaultProps" show-checkbox
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
                    prop="menuName"
                    label="菜单名称">
                  </el-table-column>
                  <el-table-column
                    prop="menuNameQp"
                    label="菜单英文">
                  </el-table-column>
                  <el-table-column
                    prop="alias"
                    label="菜单别名">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="描述">
                  </el-table-column>
                  <el-table-column
                    label="是否对外发布">
                    <template scope="scope">
                      {{scope.row.isShare ? "是" : "否"}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="urlPath"
                    label="路径">
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
                    prop="menuName"
                    label="菜单名称">
                  </el-table-column>
                  <el-table-column
                    prop="menuNameQp"
                    label="菜单英文">
                  </el-table-column>
                  <el-table-column
                    prop="alias"
                    label="菜单别名">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="描述">
                  </el-table-column>
                  <el-table-column
                    prop="isShare"
                    label="是否对外发布">
                  </el-table-column>
                  <el-table-column
                    prop="urlPath"
                    label="路径">
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
                <el-input v-model="form2.nickName"></el-input>
              </el-form-item>
              <el-button type="primary" @click="searchUser">查询</el-button>
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
                prop="validBeginDate"
                label="开始有效时间">
              </el-table-column>
              <el-table-column
                prop="validEndDate"
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
          <el-tab-pane label="数据权限">
            <el-form :model="form3" label-width="80px" inline="">
              <el-form-item label="描述">
                <el-input v-model="form3.remark"></el-input>
              </el-form-item>
              <el-button type="primary" @click="searchDataSource">查询</el-button>
              <el-button type="success" @click="addDataSource">新增</el-button>
            </el-form>
            <el-table
              :data="tableData5"
              border
              style="width: 100%">
              <el-table-column
                label="json数据">
                  <template scope="scope">
                    <span v-highlight style="font-size: 12px;">
                      <pre><code>{{JSON.stringify(JSON.parse(scope.row.jsonInfo.replace( /^\s*/, '')),null,4)}}</code></pre>
                    </span>
                  </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="描述">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="dataSourceDelete(scope.$index, scope.row)"
                    type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCounts2">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="roleAddDialog">
        <el-dialog title="数据权限" :visible.sync="dialogDataVisible">
          <div class="selectWrapper">
            <el-select
              v-model="selectDataModel"
              filterable
              clearable
              placeholder="请输入关键词"
              :loading="loading"
              @change="selectChangeHandle2">
              <el-option
                v-for="item in tableData6"
                :key="item.index"
                :label="item.remark"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <el-table :data="tableData6" @selection-change="selectNotData" max-height="250" ref="dataAddTable">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="描述">
            </el-table-column>
          </el-table>
          <div class="roleAddBtn">
            <el-button
              @click="selectData"
              type="primary">提交</el-button>
            <el-button
              @click="dialogDataVisible = false"
              type="danger">取消</el-button>
          </div>
        </el-dialog>
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
      <div class="configSourceDialog">
        <el-dialog
          title="提示"
          :visible.sync="configSourceDialog"
          size="tiny">
          <div class="panelSource">
            <div class="selectWrapper">
              <el-select
                v-model="selectPanel"
                filterable
                clearable
                placeholder="请输入关键词"
                @change="selectPanelHandle">
                <el-option
                  v-for="item in PanelData"
                  :key="item.panelId"
                  :label="item.panelName"
                  :value="item.panelId">
                </el-option>
              </el-select>
            </div>
            <el-table
                :data="panelSourceData"
                border
                ref="urlTable"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                height="500">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="urlPath"
                  label="URL路径">
                </el-table-column>
                <el-table-column
                  prop="method"
                  label="Method">
                </el-table-column>
                <el-table-column
                  prop="createUser"
                  label="创建人">
                </el-table-column>
              </el-table>
              <div class="addUrlBtn">
                <el-button
                  @click="commitAddPanel"
                  type="primary">提交</el-button>
              </div>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data(){
            return {
              dialogDataVisible: false,
              selectDataModel:'',
              panelSourceData:[],
              selectPanel:'',
              PanelData: [],
              confirmDialog:false,
              selectUserData: [],
              selectUserModel:'',
              loading: false,
              token:'',
              dialogTableVisible: false,
              explain:'角色维护',
              form:{
                roleName:'',
                roleNameQp:'',
                remark:'',
                valueTime:[],
                validBegin:'',
                validEnd:''
              },
              form2:{
                ID:'',
                name:'',
                sname:'',
              },
              form3:{
                remark:''
              },
              treeData: [],
              defaultProps:{
                children: 'children',
                label: 'label'
              },
              tableData: [],
              tableData2: [],
              tableData3: [],
              tableData4: [],
              tableData5: [],
              tableData6:[],
              currentPage: 1,
              totalCounts: 40,
              pageSize: 10,
              currentPage2: 1,
              totalCounts2: 40,
              pageSize2: 10,
              roleId: 0,
              selectedUser: [],
              selectMenu: [],
              setData: {},
              configSourceDialog: false,
              selectedData: [],
              rules: {
                roleName: [
                  { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                roleNameQp: [
                  { required: true, message: '请输入角色拼音', trigger: 'blur' }
                ],
                valueTime: [
                  { type:'array', required: true, message: '请选择有效期', trigger: 'blur' }
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
            this.getRoleInfo()
            this.getMenu()
            this.getUserByRole()
            this.getRoleAuth()
            this.getDataByRole()
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
                let data = res.data.result
                this.form.roleName = data.roleName
                this.form.roleNameQp = data.roleNameQp
                this.form.remark = data.remark
                this.form.validBegin = data.validBegin
                this.form.validEnd = data.validEnd
                this.form.valueTime.push(data.validBegin)
                this.form.valueTime.push(data.validEnd)
              }
            },(err)=>{

            })
          },
          getMenu(){
            this.$http.get(this.$store.state.domain+'/menu/queryByRoleIdAllMenu',{
              params:{
                adoptToken: this.token,
                roleId: this.roleId
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
          dataSourceDelete(index,data){
            let id = data.roldDataauthId
            this.$http.delete(this.$store.state.domain+'/roleDataauth',{
                params:{
                  adoptToken: this.token,
                  roleId: this.roleId,
                  id: id
                }
            }).then((res)=>{
              if(res.data.status == 0){
                this.$message('删除成功')
                this.getDataByRole()
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
          handleSizeChange2(data){
            this.pageSize2 = data
          },
          handleCurrentChange2(data){
            this.currentPage2 = data
          },
          getCheckedNodes(data,isChecked){
              if(!isChecked){
                this.tableData4.forEach((item)=>{
                    if(item.menuId == data.menuId){
                        this.confirmDialog = true
                        this.setData = item
                    }else{
                      this.tableData.forEach((item,index)=>{
                          if(item.menuId == data.menuId){
                              this.tableData.splice(index,1)
                          }
                      })
                    }
                })
              }else {
                if(!data.selected){
                  this.tableData.push(data)
                }
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
              }
            },(err)=>{

            })
          },
          changeRole(){
            this.$refs.editeRoleForm.validate((valid) => {
              if (!valid) {
                return;
              }else {
                let data = {
                  adoptToken: this.token,
                  roleId: this.roleId,
                  roleName: this.form.roleName,
                  remark: this.form.remark,
                  roleNameQp: this.form.roleNameQp,
                  validBegin: this.form.validBegin,
                  validEnd: this.form.validEnd
                }
                this.$http.put(this.$store.state.domain+'/role',qs.stringify(data)).then((res)=>{
                  if(res.data.status == 0){
                    this.$message('修改成功')
                  }else {
                    this.$message('修改失败')
                  }
                },(err)=>{
                  this.$message('修改失败')
                })
              }
            });
          },
          getUserByRole(){
            this.$http.get(this.$store.state.domain+'/user/queryByRoleIdSelected',{
                params:{
                  adoptToken: this.token,
                  roleId: this.roleId,
                  pageSize: this.pageSize,
                  currentPage: this.currentPage,
                  nickName: this.form2.nickName
                }
            }).then((res)=>{
              if(res.data.status == 0){
                this.totalCounts = res.data.result.totalCount
                this.tableData2 = res.data.result.result
              }
            },(err)=>{

            })
          },
          getDataByRole(){
            let data = {
              adoptToken: this.token,
              roleId: this.roleId,
              pageSize: this.pageSize2,
              currentPage: this.currentPage2,
              remark: this.form2.remark
            }
            this.$http.post(this.$store.state.domain+'/dataauth/queryByRole',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.totalCounts2 = res.data.result.totalCount
                this.tableData5 = res.data.result.result
              }
            },(err)=>{

            })
          },
          searchUser(){
            this.getUserByRole()
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
          addDataSource(){
            this.dialogDataVisible = true
            let data = {
              adoptToken: this.token,
              roleId: this.roleId
            }
            this.$http.post(this.$store.state.domain+'/dataauth/queryByRoleNotSelected',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.getDataByRole()
                this.tableData6 = res.data.result.result
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
          selectNotData(selection){
            this.selectedData = []
            selection.forEach((item)=>{
              this.selectedData.push(item.id)
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
          selectData(){
            let data =  {
              adoptToken: this.token,
              dimauthId: this.selectedData.join(','),
              roleId: this.roleId
            }
            this.$http.post(this.$store.state.domain+'/roleDataauth/insertCodeBatch',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.$message('提交成功')
                this.getDataByRole()
                this.dialogDataVisible = false
              }
            },(err)=>{

            })
          },
          selectChangeHandle(data){
            if (this.tableData3[data.index]) {
              this.$refs.roleAddTable.toggleRowSelection(this.tableData3[data.index]);
            }
          },
          selectChangeHandle2(data){
            if (this.tableData6[data.index]) {
              this.$refs.dataAddTable.toggleRowSelection(this.tableData6[data.index]);
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
              let key = []
              this.tableData4.forEach((item)=>{
                key.push(item.menuId)
              })
              this.$refs.tree.setCheckedKeys(key)
          },
          editeMenuHnadle(index,row){
            this.$router.push('/Content/RoleManConfig/'+row.menuId+'/'+this.roleId)
          },
          getNotSelectPanel(row){
            let data =  {
              adoptToken: this.token,
              roleId: this.roleId,
              menuId: row.menuId
            }
            this.$http.post(this.$store.state.domain+'/resPanel/queryByRoleNotSelected',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.PanelData = res.data.result.result
              }
            },(err)=>{

            })
          },
          selectPanelHandle(){

          },
          commitAddPanel(){

          },
          searchDataSource(){

          },
          dataChange(value){
            let arrTemp = value.split('~')
            this.form.validBegin = arrTemp[0]
            this.form.validEnd = arrTemp[1]
          },
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
