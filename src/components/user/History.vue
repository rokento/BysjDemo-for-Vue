<template>
  <el-container>
    <el-main class="el-main">
      <el-table
        :data="myhis"
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
          label="时间">
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
    import {getHistory} from "../request/myHistory";

    export default {
        name: "History",
      data(){
        return{
          myhis:[]
        }
      },
      methods:{
        look(index){
          console.log(index);
          let id = this.myhis[index].systemid
          console.log(id);
          this.$router.push({path:'/preview',
            query:{
              fileId:id,
              fileName:this.myhis[index].filename,
              name:this.myhis[index].name
            }
          })
        }
      },
      mounted() {
          getHistory(res =>{
            if(res.data.code='200'){
              this.myhis=res.data.data
            }else{
              this.$message.error(res.data.msg);
            }
          })
      }
    }
</script>

<style scoped>
  .el-main {
    padding: 0;
    margin: 0;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
