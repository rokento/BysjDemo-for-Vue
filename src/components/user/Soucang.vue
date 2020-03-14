<!-- 组件： 个人收藏-->
<template>
  <el-container v-loading="loading">
    <el-header class="el-header">
      <el-page-header @back="goBack" content="我的收藏">
      </el-page-header>
    </el-header>
    <el-main class="el-main">
      <el-table
        :data="sc"
        style="width: 100%">
        <el-table-column
          prop="filename"
          label="文件名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="作者"
          width="200">
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="收藏时间">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="look(scope.$index)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    import {getMySc} from "../request/getMySoucang";

    export default {
        name: "Soucang",
      data(){
        return{
          sc:[],
          loading:false
        }
      },
      methods:{
        goBack() {
          this.$router.back(-1)
        },
        look(index){
          let id = this.sc[index].fileid
          console.log(id);
          this.$router.push({path:'/preview',
            query:{
              fileId:id,
              fileName:this.sc[index].filename,
              name:this.sc[index].name
            }
          })
        }
      },
      mounted() {
          this.loading=true
          getMySc(res =>{
            if(res.data.code=='200'){
              this.sc=res.data.data
            }else{
              this.$message.error(res.data.msg)
            }
          })
        this.loading=false
      }
    }
</script>

<style scoped>
  .el-main {
    padding: 0;
    margin: 0;
    color: #333;
    text-align: center;
    line-height: 20px;
  }
  .el-header {
    color: #333;
    text-align: center;
    line-height: 30px;
  }
</style>
