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
          <el-form ref="form" :model="form" label-width="70px" inline>
            <div class="form-input">
              <el-form-item label="用户昵称">
                <el-input style="width: 156px;" v-model="form.nickName"></el-input>
              </el-form-item>
              <el-form-item label="用户性别">
                <el-select style="width: 156px;" v-model="form.sex" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input style="width: 156px;" v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 30px;">
                <el-button @click="searchRole">查询</el-button>
                <el-button @click="reset">重置</el-button>
              </el-form-item>
            </div>
              <!--<el-button>导入</el-button>-->
              <!--<el-button>导出</el-button>-->
          </el-form>
        </div>
      </div>
      <div class="list-wrapper">
        <div class="title-header">
          <span>人员信息列表</span>
        </div>
        <div class="list-content">
          <div class="list-btn">
            <el-button @click="addUser">新增</el-button>
            <el-button @click="deleteUser">删除</el-button>
          </div>
          <div class="list-table">
            <el-table
              reff="multipleTable"
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
                prop="userName"
                label="登录名">
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
    <el-dialog title="用户维护" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="用户资料">
          <el-form :model="form2" label-width="80px" :rules="rules" ref="editeUserForm">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input style="width: 216px" v-model="form2.nickName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆名称" prop="userName">
              <el-input style="width: 216px" v-model="form2.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form2.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机" prop="phoneNo">
              <el-input style="width: 216px" v-model="form2.phoneNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input style="width: 216px" v-model="form2.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                v-model="form2.birthday"
                type="date"
                placeholder="选择生日"
                style="width: 220px;"
                @change="birthChange2">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input style="width: 216px" v-model="form2.postcode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form2.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="form2.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="有效时间" style="width: 300px" prop="valueTime">
              <el-date-picker
                v-model="form2.valueTime"
                type="daterange"
                placeholder="选择日期范围"
                range-separator="~"
                @change="dataChange2">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div class="tab-1-btn">
            <el-button type="primary" @click="saveUserChange">保存</el-button>
            <el-button type="danger">重置</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色分配">
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
            <el-button type="primary" @click="postTransfer">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <el-form :model="form4" label-width="80px" :rules="pwdRules" ref="changeFrom" style="text-align: center;" inline>
            <el-form-item label="旧密码" prop="oldPw">
              <el-input style="width: 216px" v-model="form4.oldPw"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="新密码" prop="newPw">
              <el-input style="width: 216px" v-model="form4.newPw" @keyup.native="keyDownHandle($event)"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="确认密码" prop="tNewPw">
              <el-input style="width: 216px" v-model="form4.tNewPw" @blur="bothPwd" @keyup.native="keyDownHandle($event)"></el-input>
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
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current :expand-on-click-node="false"></el-tree>
          </div>
          <div class="dialog-right">
            <div class="dialog-right-top">
              <el-form :model="form5" label-width="80px" inline="">
                <el-form-item label="面板编码">
                  <el-input v-model="form.ID" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="面板名称">
                  <el-input v-model="form.name" style="width: 150px"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form>
              <div class="dialog-right-table">
                <el-table
                  :data="tableData2"
                  border
                  style="width: 100%"
                  max-height="450"
                  highlight-current-row
                  @cell-click="panelTableClick">
                  <el-table-column
                    prop="panelName"
                    label="面板名称">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="描述">
                  </el-table-column>
                  <el-table-column
                    prop="createUser"
                    label="创建人">
                  </el-table-column>
                  <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--width="100"-->
                    <!--prop="handle">-->
                    <!--<template scope="scope">-->
                      <!--<el-button-->
                        <!--size="small"-->
                        <!--@click="handleEdit(scope.$index, scope.row)"-->
                        <!--type="primary">查看</el-button>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                </el-table>
              </div>
            </div>
            <div class="dialog-right-bottom">
              <el-form :model="form7" label-width="80px" inline="">
                <el-form-item label="元素编码">
                  <el-input v-model="form.ID" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="元素名称">
                  <el-input v-model="form.name" style="width: 150px"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form>
              <div class="dialog-right-table">
                <el-table
                  :data="tableData3"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="elementName"
                    label="元素名称">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="描述">
                  </el-table-column>
                  <el-table-column
                    prop="createUser"
                    label="创建人">
                  </el-table-column>
                  <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--width="100">-->
                    <!--<template scope="scope">-->
                      <!--<el-button-->
                        <!--size="small"-->
                        <!--@click="handleEdit2(scope.$index, scope.row)"-->
                        <!--type="primary">查看</el-button>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据权限">
          <el-table
            :data="tableData4"
            style="width: 100%"
            border>
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
          </el-table>
          <div class="pagination-wrapper">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount2">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="新增用户"  :visible.sync="addUserDialog" size="small" v-if="addUserDialog">
      <el-form :model="form8" :rules="rules" ref="addUserForm" label-width="100px" inline>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form8.nickName" style="width: 220px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名称" prop="userName" ref="userName" :error="nameError">
          <el-input v-model="form8.userName" style="width: 220px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form8.sex" style="width: 220px;" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="form8.passWord" style="width: 220px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phoneNo">
          <el-input v-model="form8.phoneNo" style="width: 220px;"  auto-complete="off" ref="phoneNo"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form8.email" style="width: 220px;"  auto-complete="off" ref="email"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="form8.birthday"
            type="date"
            placeholder="选择生日"
            style="width: 220px;"
            @change="birthChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form8.postcode" style="width: 220px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form8.address" style="width: 220px;"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" prop="valueTime">
          <el-date-picker
            v-model="form8.valueTime"
            type="daterange"
            placeholder="选择日期范围"
            range-separator="~"
            @change="dataChange"
            style="width: 220px;" >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" style="width: 220px;"  v-model="form8.remark" auto-complete="off"></el-input>
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
  import md5 from 'js-md5'

  export default {
    data(){
      return {
        nameError:'',
        pageSize2:10,
        currentPage2:1,
        totalCount2:0,
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
            phoneNo:'',
            sex:'',
            pwd:'',
            postcode:'',
            address:'',
            remark:'',
            startTime:'',
            endTime:'',
            valueTime:'',
            email:'',
            userName:'',
            birthday:''

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
          userName:'',
          phoneNo:'',
          sex:'',
          pwd:'',
          email:'',
          postcode:'',
          address:'',
          remark:'',
          valueTime:'',
          birthday:''
        },
        rules: {
          nickName: [
            { required: true, message: '请输入用户昵称', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { validator: this.nameValid, message: '登录名称重复，请重新输入', trigger: 'blur' },
          ],
          phoneNo: [
            { required: true, message: '请输入手机号', trigger: 'blur'},
            { message: '请输入正确的手机号', trigger: 'blur,change', pattern: /^[1][3,4,5,7,8][0-9]{9}$/},
            { validator: this.phoneValid, message: '手机号重复，请重新输入', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
//          birthday: [
//            { required: true, message: '请选择生日', trigger: 'change' }
//          ],
          passWord: [
            { required: true, message: '请输入新密码', trigger: 'blur',  },
            { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*.,()_?`])[\da-zA-Z~!@#$%^&*.,()_?`]{1,}$/, message: '请包含字母、数字、符号(非空格)', trigger: 'change,blur'},
            { min: 10, message: '不能低于10位', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
            { validator: this.emailValid, message: '邮箱地址重复，请重新输入', trigger: 'blur' },
          ],
          valueTime: [
            { type: 'array', required: true, message: '请选择有效时间', trigger: 'blur' }
          ]
        },
        pwdRules: {
          oldPw: [
            { required: true, message: '请输入旧密码', trigger: 'blur',  },
          ],
          newPw: [
            { required: true, message: '请输入新密码', trigger: 'blur',  },
            { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*.,()_?`])[\da-zA-Z~!@#$%^&*.,()_?`]{1,}$/, message: '请包含字母、数字、符号(非空格)', trigger: 'change,blur'},
            { min: 10, message: '不能低于10位', trigger: 'blur' },
          ],
          tNewPw: [
            { required: true, message: '请确认新密码', trigger: 'blur',  },
            { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*.,()_?`])[\da-zA-Z~!@#$%^&*.,()_?`]{1,}$/, message: '请包含字母、数字、符号(非空格)', trigger: 'change,blur'},
            { min: 10, message: '不能低于10位', trigger: 'blur' },
          ],
        },
        treeData: [],
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
        tableData3: [],
        tableData4: [],
        dialogFormVisible: false,
        dialogTreeVisible: false,
        token: '',
        selectUserId: [],
        userId:'',
        privVisitId:'',
        panelId:'',
        configFlag: false
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
      keyDownHandle(ev){
          if(ev.keyCode == 32){
            this.form4.newPw = this.form4.newPw.trim()
            this.form4.tNewPw = this.form4.tNewPw.trim()
            return
          }
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
      reset(){
        this.form = {
          nickName: '',
            sex: '',
            email: ''
        }
        this.searchRole()
      },
      handleSizeChange(val){
        this.pageSize = val
        this.getRoleList()
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.getRoleList()
      },
      handleSizeChange2(val){
        this.pageSize2 = val
      },
      handleCurrentChange2(val){
        this.currentPage2 = val
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
        this.tableData3 = []
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
      getElement(){
        let data = {
          adoptToken: this.token,
          userId: this.userId,
          privVisitId: this.privVisitId,
          panelId: this.panelId
        }
        this.$http.post(this.$store.state.domain+'/element/queryVisitElement',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.tableData3 = res.data.result.result
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
      dataChange(value){
        let arrTemp = value.split('~')
        this.form8.validBegin = arrTemp[0]
        this.form8.validEnd = arrTemp[1]
      },
      dataChange2(value){
        if(!value){
            this.form2.valueTime = []
            return
        }
        let arrTemp = value.split('~')
        this.form2.validBegin = arrTemp[0]
        this.form2.validEnd = arrTemp[1]
      },
      addUser(){
        this.userId = ''
        this.configFlag = false
        this.form8 = {
          nickName: '',
          phoneNo:'',
          sex:'',
          pwd:'',
          postcode:'',
          address:'',
          remark:'',
          validBegin:'',
          validEnd:'',
          valueTime:'',
          userName:'',
          birthday:''
        }
        this.addUserDialog = true
      },
      addUserHandle(){
        this.$refs.addUserForm.validate((valid) => {
          if (valid) {
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
                  validBegin:'',
                  validEnd:'',
                  valueTime:'',
                  userName:'',
                  birthday:''
                }
              }
              else{

              }
            },(err)=>{
              //view('网络错误')
              this.$message.error('网络错误');
            })
          } else {
            return false;
          }
        });

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
      getSlectedRole(){
        let data = {
          adoptToken: this.token,
          userId: this.userId
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
        this.userId = data.userId
        this.configFlag = true
        this.generateData()
        this.getSlectedRole()
        this.form2.nickName = data.nickName
        this.form2.userName = data.userName
        this.form2.email = data.email
        this.form2.phoneNo = data.phoneNo
        this.form2.postcode = data.postcode
        this.form2.address = data.address
        this.form2.remark = data.remark
        this.form2.validBegin = data.validBegin
        this.form2.validEnd = data.validEnd
        this.form2.sex = data.sex + ''
        this.form2.birthday = data.birthday
        let arr = []
        arr.push(this.form2.validBegin)
        arr.push(this.form2.validEnd)
        this.form2.valueTime = arr

        this.form4 = {
          oldPw: '',
          newPw: '',
          tNewPw: ''
        }

        this.dialogFormVisible = true
      },
      bothPwd(){
        if(this.form4.newPw != this.form4.tNewPw){
          this.$message('新密码不一致，请重新输入')
        }
      },
      commitPwd(){
        this.$refs.changeFrom.validate((valid) => {
          if (valid) {
            let data = {
              adoptToken: this.token,
              userId: this.userId,
              passWord: md5(this.form4.oldPw),
              newPassword: md5(this.form4.newPw),
              repeatPassword: md5(this.form4.tNewPw),
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
          } else {
            return false;
          }
        });
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
        let postData = {
          adoptToken: this.token,
          userId: this.userId,
          pageSize: this.pageSize2,
          currentPage: this.currentPage2,
        }
        this.$http.post(this.$store.state.domain+'/dataauth/queryByUser',qs.stringify(postData)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount2 = res.data.result.totalCount
            this.tableData4 = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      panelTableClick(row, column, cell, event){
        if(column.property == 'handle'){
          return
        }
        this.panelId = row.panelId
        this.getElement()
      },
      postTransfer(){
        let data = {
          adoptToken: this.token,
          userId: this.userId,
          roleId: this.transferModel.join(',')
        }
        this.$http.post(this.$store.state.domain+'/roleUser/updateCodeBatch',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.$message('修改成功！')
            this.generateData()
            this.getSlectedRole()
          }else{
            this.$message('修改失败')
          }
        },(err)=>{

        })
      },
      saveUserChange(){
        this.$refs.editeUserForm.validate((valid) => {
          if (valid) {
            let data = {
              adoptToken: this.token,
              userId: this.userId,
              ...this.form2
            }
            this.$http.put(this.$store.state.domain+'/user',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.$message('修改成功！')
                this.getRoleList()
              }else{

              }
            },(err)=>{

            })
          } else {
            return false;
          }
        });

      },
      birthChange(value){
          this.form8.birthday = value
      },
      birthChange2(value){
        this.form2.birthday = value
      },
      nameValid(rule, value, callback){
          if(value.trim() == ''){
              return
          }
          let data  = {
            adoptToken: this.token,
          }
          if(this.configFlag){
            data.userName = this.form2.userName
            data.userId = this.userId
          }else {
            data.userName = this.form8.userName
          }
          this.$http.get(this.$store.state.domain+'/user/verificationUserName',{
            params:data
          }).then((res)=>{
            if(res.data.status != 0){
              callback(new Error('用户名重复'));
            }else{
              callback();
            }
          },(err)=>{
              callback();
          })
      },
      phoneValid(rule, value, callback){
        if(value.trim() == ''){
          return
        }
        let data  = {
          adoptToken: this.token,
        }
        if(this.configFlag){
          data.phone = this.form2.phoneNo
          data.userId = this.userId
        }else {
          data.phone = this.form8.phoneNo
        }
        this.$http.get(this.$store.state.domain+'/user/verificationPhone',{
          params:data
        }).then((res)=>{
          if(res.data.status != 0){
            callback(new Error());
          }else{
            callback();
          }
        },(err)=>{
          callback();
        })
      },
      emailValid(rule, value, callback){
        if(value.trim() == ''){
          return
        }
        let data  = {
          adoptToken: this.token,
        }
        if(this.configFlag){
          data.email = this.form2.email
          data.userId = this.userId
        }else {
          data.email = this.form8.email
        }
        this.$http.get(this.$store.state.domain+'/user/verificationEmail',{
          params:data
        }).then((res)=>{
          if(res.data.status != 0){
            callback(new Error());
          }else{
            callback();
          }
        },(err)=>{
          callback();
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .user-man
    margin-top: 40px
    background: #fff
    .form-wrap
      padding: 0 15px
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
        /*.form-input*/
          /*.el-form-item*/
            /*display: inline-block*/
            /*width: 30%*/
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
          padding: 20px 5px 0
        .list-table
          margin-top: 20px
          padding: 0 5px
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
  .pagination-wrapper
    margin-top: 20px
    text-align: center
</style>
<style lang="sass">
  .el-transfer-panel
    text-align: left
  .user-man
    .el-transfer-panel
      width: 44%
    .el-transfer__buttons
      width: 6%
    .el-dialog--small
      width: 40%
</style>
