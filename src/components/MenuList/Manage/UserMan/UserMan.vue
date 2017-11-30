<template>
  <div class="user-man">
    <div class="header-wrapper">
      <h1>
        用户管理
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
    <div class="form-wrap">
      <div class="search-wrapper">
        <div class="title-header">
          <span>人员信息查询</span>
        </div>
        <div class="form-content">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="form-input">
              <el-form-item label="用户昵称">
                <el-input v-model="form.nickName"></el-input>
              </el-form-item>
              <el-form-item label="用户性别">
                <el-input v-model="form.sex"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </div>
            <div class="form-btn">
              <el-button @click="searchRole">查询</el-button>
              <el-button>重置</el-button>
              <!--<el-button>导入</el-button>-->
              <!--<el-button>导出</el-button>-->
            </div>
          </el-form>
        </div>
      </div>
      <div class="list-wrapper">
        <div class="title-header">
          <span>人员信息列表</span>
        </div>
        <div class="list-content">
          <div class="list-btn">
            <el-button @click="addUserDialog = true">新增</el-button>
            <el-button @click="deleteUser">删除</el-button>
          </div>
          <div class="list-table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="nickName"
                label="昵称">
              </el-table-column>
              <el-table-column
                width="100"
                label="性别">
                <template scope="scope">
                  <span style="margin-left: 10px" v-if="scope.row.sex == 1">男</span>
                  <span style="margin-left: 10px" v-if="scope.row.sex == 2">女</span>
                  <span style="margin-left: 10px" v-if="scope.row.sex == -1">未知</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="生日"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="手机"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="validBegin"
                label="开始时间"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="validEnd"
                label="结束时间"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template scope="scope">
                  <el-button
                  size="small"
                  @click="configUser(scope.$index, scope.row)">配置</el-button>
                  <el-button
                    size="small"
                    @click="jurisdiction(scope.$index, scope.row)">权限查看</el-button>
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
                :total="totalPages">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="用户维护" :visible.sync="dialogFormVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="用户资料">
          <el-form :model="form2" label-width="80px">
            <el-form-item label="用户昵称">
              <el-input v-model="form2.nickName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form2.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="form2.phoneNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input v-model="form2.postcode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form2.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form2.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="有效时间">
              <el-date-picker
                v-model="form2.valueTime"
                type="daterange"
                placeholder="选择日期范围"
                range-separator="~"
                @change="dataChange">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div class="tab-1-btn">
            <el-button type="primary">保存</el-button>
            <el-button type="danger">重置</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色分配">
          <el-form :model="form3" label-width="80px">
            <el-form-item label="系统名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
          <div class="transfer-wrapper">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="search"
              v-model="transferModel"
              :data="transferData"
              :titles="['待选区', '已选区']">
            </el-transfer>
          </div>
          <div class="tab-2-btn">
            <el-button type="primary">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <el-form :model="form4" label-width="80px">
            <el-form-item label="旧密码">
              <el-input v-model="form.oldPw"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.newPw"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="form.tNewPw"></el-input>
            </el-form-item>
          </el-form>
          <div class="tab-3-btn">
            <el-button type="primary" @click="commitPwd">保存</el-button>
            <el-button type="danger">重置</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="用户维护" :visible.sync="dialogTreeVisible" size="large">
      <el-tabs type="border-card">
        <el-tab-pane label="资源权限">
          <div class="dialog-left">
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all :expand-on-click-node="false"></el-tree>
          </div>
          <div class="dialog-right">
            <div class="dialog-right-top">
              <el-form :model="form5" label-width="80px" inline="">
                <el-form-item label="面板编码">
                  <el-input v-model="form.ID"></el-input>
                </el-form-item>
                <el-form-item label="面板名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form>
              <div class="dialog-right-table">
                <el-table
                  :data="tableData2"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="面板1">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="面板2">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="面板3">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template scope="scope">
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)"
                        type="primary">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="dialog-right-bottom">
              <el-form :model="form7" label-width="80px" inline="">
                <el-form-item label="元素编码">
                  <el-input v-model="form.ID"></el-input>
                </el-form-item>
                <el-form-item label="元素名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form>
              <div class="dialog-right-table">
                <el-table
                  :data="tableData3"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="元素1">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="元素2">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="元素3">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template scope="scope">
                      <el-button
                        size="small"
                        @click="handleEdit2(scope.$index, scope.row)"
                        type="primary">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据权限">配置管理</el-tab-pane>
      </el-tabs>

    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="addUserDialog" size="small">
      <el-form :model="form8" label-width="100px" inline>
        <el-form-item label="用户昵称">
          <el-input v-model="form8.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form8.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form8.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form8.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form8.postcode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form8.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form8.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效时间">
          <el-date-picker
            v-model="form8.valueTime"
            type="daterange"
            placeholder="选择日期范围"
            range-separator="~"
            @change="dataChange">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUserHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    data(){
      return {
        valueTime:'',
        addUserDialog:false,
        pageSize: 10,
        explain: 'bar',
        form: {
            nickName: '',
            sex: '',
            email: ''
        },
        form2: {
            nickName: '',
            phone:'',
            sex:'',
            pwd:'',
            postcode:'',
            address:'',
            remark:'',
            startTime:'',
            endTime:'',
            valueTime:''
        },
        form3: {
            name: ''
        },
        form4: {
            oldPw: '',
            newPw: '',
            tNewPw: ''
        },
        form5:{
            ID: '',
            name: ''
        },
        form6:{
          ID: '',
          name: ''
        },
        form7:{
          ID: '',
          name: ''
        },
        form8:{
          nickName: '',
          phone:'',
          sex:'',
          pwd:'',
          postcode:'',
          address:'',
          remark:'',
          startTime:'',
          endTime:'',
          valueTime:''
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
        transferData: [],
        transferModel: [],
        currentPage: 1,
        totalPages: 50,
        tableData: [],
        tableData2: [],
        tableData3: [{
          name: 1,
          address: 2
        }],
        dialogFormVisible: false,
        dialogTreeVisible: false,
        token: '',
        selectUserId: [],
        userId:'',
        privVisitId:''
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        this.initParams()
        this.initData()
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken');
      },
      initData(){
        this.getRoleList()
      },
      getRoleList(){
        let data = {
          adoptToken: this.token,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
        this.$http.post(this.$store.state.domain+'/user/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalPages = res.data.result.totalCount
            this.tableData = res.data.result.result
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      searchRole(){
          let data = {
              adoptToken: this.token,
              pageSize: this.pageSize,
              currentPage: this.currentPage,
              nickName: this.form.nickName || null,
              email: this.form.email || null,
              sex: this.form.sex || null
          }
          if(this.nickName == '' || this.email == '' || this.sex == ''){
            this.$message('请输入查询条件')
            return
          }
          this.$http.post(this.$store.state.domain+'/user/page',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.totalPages = res.data.result.totalCount
              this.tableData = res.data.result.result
            }
            else{

            }
          },(err)=>{
            //view('网络错误')
            this.$message.error('网络错误');
          })

      },
      handleSizeChange(val){
        this.pageSize = val
        this.getRoleList()
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.getRoleList()
      },
      handleSelectionChange(data){
        this.selectUserId = []
        data.map((item) => {
            this.selectUserId.push(item.userId)
        })
      },
      generateData(){
        const data = [];
        const postData = {
            adoptToken: this.token,
            pageSize: 100,
            currentPage: 1
        }
        this.$http.post(this.$store.state.domain+'/role/page',qs.stringify(postData)).then((res)=>{
            if(res.data.status == 0){
              res.data.result.result.forEach((item, index) => {
                data.push({
                  label: item.roleName,
                  key: item.roleId
                });
              });
              this.transferData = data
            }else{

            }
        },(err)=>{

        })
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      handleNodeClick(data) {
        this.privVisitId = data.privVisitId
        this.getPanel()
      },
      getPanel(){
        let data = {
          adoptToken: this.token,
          userId: this.userId,
          privVisitId: this.privVisitId
        }
        this.$http.post(this.$store.state.domain+'/resPanel/queryVisitPanel',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.tableData2 = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      handleEdit(data1,data2){
        console.log(data1,data2)
      },
      handleEdit2(data1,data2){
        console.log(data1,data2)
      },
      addUserHandle(){
        console.log(this.form8)
      },
      dataChange(value){
        console.log(value)
        let arrTemp = value.split('~')
        this.form8.startTime = arrTemp[0]
        this.form8.endTime = arrTemp[1]
      },
      addUserHandle(){
        let data = this.form8;
        data.adoptToken = this.token
        this.$http.post(this.$store.state.domain+'/user',qs.stringify(this.form8)).then((res)=>{
          if(res.data.status == 0){
            this.$message('提交成功')
            this.addUserDialog = false
            this.getRoleList()
            this.form8 = {
              nickName: '',
              phoneNo:'',
              sex:'',
              pwd:'',
              postcode:'',
              address:'',
              remark:'',
              startTime:'',
              endTime:'',
              valueTime:''
            }
          }
          else{

          }
        },(err)=>{
          //view('网络错误')
          this.$message.error('网络错误');
        })
      },
      deleteUser(){
          this.$http.delete(this.$store.state.domain+'/user',{
              params:{
                adoptToken: this.token,
                userId: this.selectUserId.join(',')
              }
          }).then((res)=>{
            if(res.data.status == 0){
              this.$message('删除成功')
              this.getRoleList()
            }
            else{

            }
          },(err)=>{
            //view('网络错误')
            this.$message.error('网络错误');
          })
      },
      getSlectedRole(id){
        let data = {
          adoptToken: this.token,
          userId: id
        }
        let transferData = []
        this.$http.post(this.$store.state.domain+'/roleUser/queryBySelected',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            res.data.result.result.forEach((item,index)=>{
              transferData.push(item.roleId)
            })
          }else{

          }
        },(err)=>{

        })
        this.transferModel = transferData
      },
      configUser(index,data){
        this.generateData()
        this.getSlectedRole(data.userId)
        this.userId = data.userId
        this.form2 = data
        let arr = []
        arr.push(this.form2.validBegin)
        arr.push(this.form2.validEnd)
        this.form2.valueTime = arr
        this.dialogFormVisible = true
      },
      commitPwd(){
        let data = {
          adoptToken: this.token,
          userId: this.userId,
          passWord: this.form4.oldPw,
          newPassword: this.form4.newPw,
          repeatPassword: this.form4.tNewPw,
        }
        this.$http.post(this.$store.state.domain+'/user/updatePwd',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.$message('修改成功！')
            this.dialogFormVisible = true
          }else{
            this.$message(res.data.result.result.message)
          }
        },(err)=>{

        })
      },
      jurisdiction(index,data){
        this.userId = data.userId
        this.$http.get(this.$store.state.domain+'/menu/queryByUserId',{
            params:{
              adoptToken: this.token,
              userId: this.userId
            }
        }).then((res)=>{
          if(res.data.status == 0){
            this.treeData = res.data.result.result
            this.dialogTreeVisible = true
          }else{
            this.$message(res.data.result.result.message)
          }
        },(err)=>{

        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .user-man
    margin-top: 40px
    background: #fff
    .form-wrap
      padding: 0 20px
      .title-header
        margin-top: 25px
        background: #EFF2F7
        height: 45px
        line-height: 45px
        padding-left: 15px
      .form-content
        border: 1px solid #eeeeee
        border-top: none
        padding: 20px 15px
        .form-input
          .el-form-item
            display: inline-block
            width: 30%
        .form-btn
          padding-left: 25px
    .list-wrapper
      .list-content
        border: 1px solid #eeeeee
        border-top: none
        padding-bottom: 20px
        .title-header
          margin-top: 25px
          background: #EFF2F7
          height: 45px
          line-height: 45px
          padding-left: 15px
        .list-btn
          padding: 20px 40px 0
        .list-table
          margin-top: 20px
          padding: 0 40px
          .pagination-wrapper
            margin-top: 20px
            text-align: center
  .tab-1-btn
    text-align: right
  .transfer-wrapper
    text-align: center
  .tab-2-btn,.tab-3-btn
    margin-top: 30px
    text-align: center
  .dialog-left
    width: 20%
    float: left
  .dialog-right
    width: 75%
    float: right
  .dialog-right-top
    margin-bottom: 15px
  .dialog-right-top,.dialog-right-bottom
    border: 1px solid #eee
    padding: 15px
</style>
<style lang="sass">
  .el-transfer-panel
    text-align: left
</style>
