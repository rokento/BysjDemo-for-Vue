<template>
  <div id="app">
    <div  class="top-bottomDiv">
      <el-menu v-if="$store.state.loginState" :default-active="activeIndex"
               class="el-menu-demo" mode="horizontal"
               text-color="#3a8ee6" active-text-color="#3a8ee6">
        <el-menu-item/>
        <el-menu-item index="1"  @click="gotoHome">
          <el-tooltip class="item" effect="dark" content="返回首页" placement="bottom">
            <img src="./img/home.png" alt="" style="width: 35px;width: 35px">
          </el-tooltip>
        </el-menu-item>
        <el-menu-item/><el-menu-item/>

        <el-menu-item>
        <el-input placeholder="请输入内容" v-model="input"  class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="find"></el-button>
        </el-input>
      </el-menu-item>
      <el-menu-item >
        <el-avatar :size="40" :src="$store.state.user.touxiang"></el-avatar>
      </el-menu-item>
      <el-menu-item index="2" @click="gotoHistory">历史</el-menu-item>
      <el-menu-item index="3" @click="gotoSoucang">收藏</el-menu-item>
        <el-menu-item index="4" @click="gotoUpload">上传稿件</el-menu-item>
      <el-menu-item index="5" @click="myFiles" >我的</el-menu-item>
      <el-menu-item index="6" @click="drawer=true" ><i class="el-icon-setting"></i></el-menu-item>
    </el-menu>
          <!-- 未登录状态 -->
      <el-menu v-else :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect"
               text-color="#3a8ee6" active-text-color="#3a8ee6">
        <el-menu-item index="1" @click="gotoHome">
          <el-tooltip class="item" effect="dark" content="返回首页" placement="bottom">
            <img src="./img/home.png" alt="" style="width: 35px;width: 35px">
          </el-tooltip>
        </el-menu-item>
        <el-menu-item/>   <!-- 占位用 -->
        <el-menu-item/><el-menu-item/>
        <el-menu-item/><el-menu-item/>
        <el-menu-item>
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="find"></el-button>
          </el-input>
        </el-menu-item>
        <el-menu-item >
          <el-avatar :size="40" :src="wdlcircleUrl"></el-avatar>
        </el-menu-item>
        <el-menu-item index="2" @click="gotoLogin">登录</el-menu-item>
        <el-menu-item index="3" @click="gotoRegister">注册</el-menu-item>
        <el-menu-item index="4" disabled><i class="el-icon-setting"></i></el-menu-item>
      </el-menu>
    </div>


    <el-container class="el-main">
      <el-main> </el-main>
    </el-container>

    <el-drawer title="title" :visible.sync="drawer"  :with-header="false">
      <br>
      <div class="block">
        <el-avatar :size="50" :src="$store.state.user.touxiang"/>
        <el-link type="primary" :underline="false" @click="gotoEditTouxiang" style="display: block;">
          更换头像
        </el-link>
        <span  style="color: #E4E7ED;font-size: 12px"><i class="el-icon-s-custom"/>  {{$store.state.user.username}}</span>
      </div>

      <el-divider></el-divider>
      <el-link type="primary" :underline="false" style="display: block;" @click="gotoqxgl">
        授权管理
      </el-link>
      <el-divider></el-divider>
      <br><br>
      <el-button plain  icon="el-icon-sort" @click="switchUser">切换用户</el-button>
      <br> <br>
      <el-button plain  icon="el-icon-arrow-right" @click="loginout">退出</el-button>

      <el-drawer
        title="权限管理"
        :append-to-body="true"
        :visible.sync="sqgl"
        direction="rtl"
        size="450px">
        <el-table :data="ckqx">
          <el-table-column property="filename" label="文件名" width="150"></el-table-column>
          <el-table-column property="cjsj" label="创建时间" width="150"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="newqx(scope.$index)">授权</el-button>
              <el-button size="mini" @click="lookqx(scope.$index)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-drawer>

    </el-drawer>
    <!--权限对话框-->
    <el-dialog title="权限管理" :visible.sync="qxdhk">
      <el-table :data="qx">
        <el-table-column property="userid" label="账号" width="150"></el-table-column>
        <el-table-column property="name" label="昵称" width="100"></el-table-column>
        <el-table-column property="sqsj" width="180" label="授权时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="qxqx(scope.$index)">取消授权</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--添加权限对话框-->
    <el-dialog title="授权给他人" :visible.sync="addqxdhk">
      <label>用户账号:</label>
      <el-input v-model="addqx.userid" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addqxdhk = false">取 消</el-button>
        <el-button type="primary" @click="submitaddQx">确 定</el-button>
      </div>
    </el-dialog>

    <div class="top-bottomDiv">
      <router-view/>
    </div>
    <!--<div class="bottom">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-link :underline="false">
            <img src="./img/github.png" style="width: 25px;height: 25px">
          </el-link>
          <el-link :underline="false" href="https://github.com/rokento/bysjdemo-for-Spring-boot.git">
            前端地址：https://github.com/rokento/bysjdemo-for-Spring-boot.git
          </el-link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link :underline="false">
            <img src="./img/github.png" style="width: 25px;height: 25px">
          </el-link>
          <el-link :underline="false" href="https://github.com/rokento/bysjdemo-for-Spring-boot.git">
            后端地址：https://github.com/rokento/bysjdemo-for-Spring-boot.git
          </el-link>
        </div></el-col>
      </el-row>
    </div>-->


   <!-- <el-link :underline="false">
      <img src="./img/github.png" style="width: 25px;height: 25px">
    </el-link>
    <el-link :underline="false" href="https://github.com/rokento/bysjdemo-for-Spring-boot.git">
      后端地址：https://github.com/rokento/bysjdemo-for-Spring-boot.git
    </el-link>-->

  </div>
</template>

<script>
import {getMyFile} from "./components/request/myfile";
import {addNewQx, deleteQx, getFileqx} from "./components/request/QxManager";

export default {
  name: 'App',
  data(){
    return{
      //未登录状态默认头像
      wdlcircleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      activeIndex: '1',
      input:'',
      drawer:false,
      sqgl:false,
      qxdhk:false,
      addqxdhk:false,
      addqx:{
        fileid:'',
        userid:''
      },
      ckqx:[],
      qx:[]
    }
  },

  methods: {
    //打开授权对话框
    newqx(index){
      this.addqx.fileid=this.ckqx[index].systemid
      this.addqxdhk=true
    },
    //提交要添加的权限
    submitaddQx(){
      addNewQx(this.addqx,res =>{
        if(res.data.code='200'){
          this.$message.success(res.data.msg)
        }else{
          this.$message.error(res.data.msg)
        }
      })
      this.addqxdhk=false
    },
    //查看文件编辑权限
    lookqx(index){
      getFileqx(this.ckqx[index].systemid,res =>{
        if(res.data.code='200'){
          this.qx=res.data.data
        }else{
          this.$message.error(res.data.msg)
        }
      })
      this.qxdhk=true
    },
    //取消权限
    qxqx(index){
      deleteQx(this.qx[index].systemid,res =>{
        if(res.data.code='200'){
          this.$message.success(res.data.msg)
          this.qx.splice(index,1)
        }else{
          this.$message.error(res.data.msg)
        }
      })
      this.qxdhk=true
    },
    //打开权限管理界面
    gotoqxgl(){
      getMyFile(res =>{
        if(res.data.code=='200'){
          this.ckqx=res.data.data
        }else{
          this.$message.error(res.data.msg)
        }
      })
      this.sqgl=true
    },
    //搜索
    find(){
      this.$router.push({path:'/find',query:{input:this.input}})
    },
    //跳转登录界面
    gotoLogin(){
      this.$router.push('/toLogin')
    },
    //跳转注册
    gotoRegister(){
      this.$router.push('/toRegister')
    },
    //返回首页
    gotoHome(){
      this.$router.push('/home')
    },
    //跳转个人页
    myFiles(){
      this.$router.push('/myfile')
    },
    //跳转到浏览历史页
    gotoHistory(){
      this.$router.push('/history')
    },
    gotoSoucang(){
      this.$router.push('/sc')
    },
    //更换头像
    gotoEditTouxiang(){
      this.$router.push('/editTouXiang')
      this.drawer=false
    },
    gotoUpload(){
      this.$router.push('/upload')
    },
    switchUser(){
      this.$store.commit('setUserInfo',{})
      this.$store.commit('setLoginState',false)
      this.$router.push('/toLogin')
      this.drawer=false
    },
    loginout(){
      this.$store.commit('setUserInfo',{})
      this.$store.commit('setLoginState',false)
      this.$router.push('/home')
      this.drawer=false
    }


  }
}
</script>

<style>
  .top-bottomDiv{
    margin: 0 auto;
    width: 1000px;
    color: #3a8ee6;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  .bottom{
    width: 100%;
    height: 150px;
    padding: 0;
    margin: 0;
    position: fixed;
    bottom: 0;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
