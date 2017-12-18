<template>
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
    <el-dialog
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose"
      ref="dialog">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import lockr from 'lockr'
  import qs from 'qs'
  export default {
      data(){
        return {
          dialogVisible:false,
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
            ],
            tNewPw: [
              { required: true, message: '请输入旧密码', trigger: 'blur',  },
              { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{10,16}$/, message: '请包含字母和数字，且不低于10位', trigger: 'change'}
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
            this.dialogVisible = true
            this.$refs.dialog.style.zIndex = 3000
            console.log(this.$refs.dialog.style.cssText)
            //this.$router.push('/Content/ChangePwd')
          }
        },
        handleClose(){

        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/css/page/header.scss';
</style>
