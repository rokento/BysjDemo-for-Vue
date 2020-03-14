<template>
  <div>
    <el-divider content-position="center" >
      <img src="../../img/zuce.png" style="width: 50px;height: 35px">
    </el-divider>


    <el-steps :active="zcStatus" finish-status="success" process-status="finish"  simple style="margin-top: 20px">
      <el-step title="填写注册信息" ></el-step>
      <el-step title="设置密保问题" ></el-step>
      <el-step title="注册完成" ></el-step>
    </el-steps>
    <el-container>

      <el-main class="el-main">
        <!--FORM表单开始-->
        <el-form ref="form" :model="form" label-width="100px"  style="margin: 0 auto; width: 420px;" >
          <!--步骤1内容-->
          <div v-if="zcStatus==0">
            <el-form-item label="昵称：" >
              <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="性 别：" >
              <template>
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="2">女</el-radio>
              </template>
            </el-form-item>
            <el-form-item label="出生日期：">
              <el-date-picker v-model="form.csrq" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>

            <el-form-item label="用户名：" >
              <el-input   v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密 码：">
              <el-input v-model="form.password1" show-password></el-input>
            </el-form-item><el-form-item label="确认密码：" >
            <el-input  v-model="form.password2" @blur="validatePass" show-password></el-input>
          </el-form-item>
          </div>
          <!--步骤2内容-->
          <div v-else-if="zcStatus==1">
            <el-form-item label="问题一：" >
              <el-input v-model="form.wt1.wt" placeholder="问题内容"></el-input>
              <el-input v-model="form.wt1.da" placeholder="输入答案"></el-input>
            </el-form-item>

            <el-form-item label="问题二：" >
              <el-input v-model="form.wt2.wt" placeholder="问题内容"></el-input>
              <el-input v-model="form.wt2.da" placeholder="输入答案"></el-input>
            </el-form-item>

            <el-form-item label="问题三：" >
              <el-input v-model="form.wt3.wt" placeholder="问题内容"></el-input>
              <el-input v-model="form.wt3.da" placeholder="输入答案"></el-input>
            </el-form-item>
          </div>

          <div v-else-if="zcStatus==3">
            <span class="zcsuccess"><i class="el-icon-check"></i>  注册成功！</span>
            <br>
            <span>登录账号：{{form.username}}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/toLogin">现在去登录</router-link>
          </div>

          <el-button v-if="zcStatus==1" @click="back">上一步</el-button>
          <el-button v-if="zcStatus==0" type="primary" @click="next">下一步</el-button>
          <el-button v-if="zcStatus==1" type="primary" @click="submituserinfo">提交</el-button>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {register} from '../request/register'
    export default {
        name: "Register",
        data(){
          return{
            form:{
              username:'',
              name:'',
              sex:'1',
              csrq:'',
              password1:'',
              password2:'',
              wt1:{
                wt:'',
                da:''
              },
              wt2:{
                wt:'',
                da:''
              },
              wt3:{
                wt:'',
                da:''
              }
            },
            zcStatus: 0
          }
        },
      methods:{
          back(){
            this.zcStatus=0
          },
          next(){
            if(this.zcStatus==0){
              let obj=this.form
              if(obj.name=='' || obj.csrq=='' || obj.password2=='' || obj.password1=='' || obj.sex==''){
                this.$message.error("存在未填写的信息，请填写完后点击下一步重试")
              }else {
                this.zcStatus=1
              }
              }
            },
        //提交用户信息
        submituserinfo(){
          let obj=this.form
          if(this.zcStatus==1){
            if((obj.wt1.wt==''&&obj.wt1.da=='')||(obj.wt2.wt==''&&obj.wt2.da=='')
              ||(obj.wt3.wt==''&&obj.wt3.da=='')){
              this.$message.error("存在未设置的，请填写完后点击下一步重试")
            }else{
              //校验通过调用后端注册接口
              register(this.form)
              this.zcStatus=3


            }
          }
        },
        validatePass(){
          if(this.form.password1!= this.form.password2){
            this.$message.error("两次密码不一致，请重新输入")
            this.form.password1=''
            this.form.password2=''
          }
        }
      }
    }
</script>

<style scoped>
.zcsuccess{
  color: #67C23A;
}
</style>
