<template>
    <div>
      <el-divider content-position="center" >
        <img src="../../img/login.png" style="width: 50px;height: 35px">
      </el-divider>
      <el-container>
        <el-aside class="el-aside" width="200px"></el-aside>
        <el-main class="el-main">
          <div class="loginComponents">
            <el-input class="input" placeholder="请输入用户名" v-model="username" clearable></el-input>
            <el-input class="input" placeholder="请输入密码" v-model="password" show-password></el-input>
            <el-button type="primary" v-loading="loading" style="width: 100px" @click="login(username,password)">登 录</el-button>
             &nbsp
             &nbsp;
            <el-link :underline="false" type="primary">忘记密码？</el-link>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import {loginRequest} from '../request/login'
    export default {
        name: "Login",
        data(){
          return{
            username:'',
            password:'',
            loading:false
          }
        },
      methods:{
          login(username,password){
            this.loading=true
            loginRequest(username,password,
            res =>{
              if(res.data.code=='200'){
                let userInfo = {
                  name:res.data.data.name,
                  username:res.data.data.username,
                  token:res.data.data.token,
                  csrq:res.data.data.csrq,
                  touxiang:res.data.data.touxiang
                }
                this.$store.commit('setUserInfo',userInfo)
                console.log(this.$store.state.user)
                this.$store.state.loginState=true
                this.$message({message: res.data.msg, type: 'success'})
                this.$router.push('/home')
              }else{
                this.$message.error(res.data.msg)
              }
              this.loading=false
            });
          }
      }



    }
</script>

<style scoped>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color:  white;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 500px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  .input{
    width: 300px;
    display: block;
    margin: 0 auto;
  }
  .loginComponents{
    margin-top: 120px;
  }

</style>
