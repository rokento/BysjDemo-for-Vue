<template>
  <el-container>
    <el-main class="el-main">
      <el-table
        :data="myfiles"
        style="width: 100%">
        <el-table-column
          prop="filename"
          label="文件名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="作者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="创建/修改日期">
        </el-table-column>

        <el-table-column label="公开">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.open" active-color="#13ce66" @change="updateOpen(scope.$index)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="look(scope.$index)">查看</el-button>

            <el-popconfirm title="确定要删除这个文件吗？">
              <el-button
                size="mini"
                type="danger"
                slot="reference"
                @click="deleteFile(scope.$index)">删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    import {getMyFile} from "../request/myfile";
    import {editOpen} from "../request/editOpen";
    import {deleteFile} from "../request/deleteFile";

    export default {
        name: "myfile",
        data(){
            return{
              myfiles:[]
        }
      },
      methods:{
        deleteFile(index){
          console.log(index);
          deleteFile(this.myfiles[index].systemid,res =>{
            if(res.data.code=='200'){
              this.$message({type:'success',message:res.data.msg})
              this.myfiles.splice(index,1)
            }else{
              this.$message.error(res.data.msg)
            }
          })
        },
        look(index){
          console.log(index);
          let id = this.myfiles[index].systemid
          console.log(id);
          this.$router.push({path:'/preview',
            query:{
              fileId:id,
              fileName:this.myfiles[index].filename,
              name:this.myfiles[index].name
            }
          })
        },
        updateOpen(index){
          editOpen(this.myfiles[index].systemid,res =>{
            if(res.data.code=='200'){
              this.$message({type:'success',message:res.data.msg})
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }
      },
      mounted() {
          getMyFile(res =>{
            if(res.data.code=='200'){
              this.myfiles=res.data.data
            }else{
              this.$message.error(res.data.msg)
            }
          })
      }
    }
</script>

<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 20px;
  }
</style>
