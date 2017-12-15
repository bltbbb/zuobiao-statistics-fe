<template>
  <div class="changePwd">
    <div class="header-wrapper">
      <h1>
        修改密码
      </h1>
    </div>
    <div class="changePwd-content">
      <el-form :model="form" label-width="80px" :rules="pwdRules" ref="changeFrom">
        <el-form-item label="旧密码" prop="oldPw">
          <el-input style="width: 216px" v-model="form.oldPw"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPw">
          <el-input style="width: 216px" v-model="form.newPw"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="tNewPw">
          <el-input style="width: 216px" v-model="form.tNewPw"></el-input>
        </el-form-item>
      </el-form>
      <div class="tab-3-btn">
        <el-button type="primary" @click="commitPwd">保存</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    data(){
      return {
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
            { required: true, message: '请输入新密码', trigger: 'blur',  },
            { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{10,}$/, message: '请包含字母、数字、符号，且不低于10位', trigger: 'change'}
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
        this.$http.post(this.$store.state.domain+'/getTokenUser',qs.stringify(data)).then((res)=>{
          this.userInfo = res.data.result
        })
      },
      commitPwd(){
        if(this.form.newPw != this.form.tNewPw){
          this.$message('新密码不一致，请重新输入')
        }
        this.$refs.changeFrom.validate((valid) => {
          if (valid) {
            let data = {
              adoptToken: this.token,
              userId: this.userInfo.userId,
              passWord: this.form.oldPw,
              newPassword: this.form.newPw,
              repeatPassword: this.form.tNewPw,
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
<style lang="sass" scoped>
  .changePwd
    margin-top: 40px
    background: #fff
    .changePwd-content
      border: 1px solid #eee
      padding: 50px
      width: 350px
      margin: 30px auto 0
      .tab-3-btn
        text-align: center
</style>
