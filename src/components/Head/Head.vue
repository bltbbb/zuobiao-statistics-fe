<template>
  <div class="head-wrapper">
    <div class="head">
      <el-breadcrumb separator="/">
        <div class="logo">
          <img src="../../assets/img/logo2.png" style="float: left;">
        </div>

        <div class="nav-top">
          <!--<a href="javascript:;"><i class="el-icon-date"></i><span>应用概况</span></a>-->
          <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            {{userInfo.nickName}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<a href="javascript:;"><i class="el-icon-date"></i><span></span></a>-->
          <!--<a href="javascript:;" @click="loginOut"><i class="el-icon-date"></i><span>退出</span></a>-->
        </div>
      </el-breadcrumb>
    </div>
    <div class="changePwd-content">
      <el-dialog
        title="提示"
        :visible.sync="changeDialogVisible"
        size="tiny"
        v-if="changeDialogVisible">
        <el-form :model="form" label-width="80px" :rules="pwdRules" ref="changeFrom">
          <el-form-item label="旧密码" prop="oldPw">
            <el-input style="width: 90%" v-model="form.oldPw"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPw">
            <el-input style="width: 90%" v-model="form.newPw" @keyup.native="keyDownHandle($event)"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="tNewPw">
            <el-input style="width: 90%" v-model="form.tNewPw" @blur="bothPwd" @keyup.native="keyDownHandle($event)"></el-input>
          </el-form-item>
        </el-form>
        <div class="tab-3-btn">
          <el-button type="primary" @click="commitPwd">保存</el-button>
          <el-button type="danger" @click="changeDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import lockr from 'lockr'
  import qs from 'qs'
  import md5 from 'js-md5'

  export default {
      data(){
        return {
          changeDialogVisible:false,
          changePwd: false,
          token:'',
          userInfo: {},
          form: {
            oldPw: '',
            newPw: '',
            tNewPw: ''
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
        }
      },
      mounted(){
        this.initParams()
        this.init()
      },
      methods:{
        initParams(){
          this.token = this.$cookie.get('adoptToken')
        },
        init(){
          this.getUserInfo()
        },
        getUserInfo(){
          let data = {
            adoptToken: this.token
          }
          //用户信息
          axios.post(this.$store.state.domain+'/getTokenUser',qs.stringify(data)).then((res)=>{
            this.userInfo = res.data.result
          })
        },
        loginOut(){
          lockr.rm("menuInfo");
          lockr.rm("menuArr")
          this.$cookie.delete('adoptToken');
          this.$router.push('/login');
        },
        handleCommand(command) {
          if(command == 'loginOut'){
              this.loginOut()
          }
          if(command == 'changePwd'){
            this.form = {
              oldPw: '',
              newPw: '',
              tNewPw: ''
            }
            this.changeDialogVisible = true
            //this.$router.push('/Content/ChangePwd')
          }
        },
        handleClose(){

        },
        keyDownHandle(ev){
          if(ev.keyCode == 32){
            this.form.newPw = this.form.newPw.trim()
            this.form.tNewPw = this.form.tNewPw.trim()
            return
          }
        },
        bothPwd(){
          if(this.form.newPw != this.form.tNewPw){
            this.$message('新密码不一致，请重新输入')
            return
          }
        },
        commitPwd(){
          this.$refs.changeFrom.validate((valid) => {
            if (valid) {
              this.bothPwd()
              let data = {
                adoptToken: this.token,
                userId: this.userInfo.userId,
                passWord: md5(this.form.oldPw),
                newPassword: md5(this.form.newPw),
                repeatPassword: md5(this.form.tNewPw),
              }
              this.$http.post(this.$store.state.domain+'/user/updatePwd',qs.stringify(data)).then((res)=>{
                if(res.data.status == 0){
                  this.$message('修改成功！')
                  this.changePwd = true
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
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/header.scss';
</style>
