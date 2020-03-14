<template>
  <el-container v-loading="loading">
    <el-header class="el-header">
      <el-page-header @back="goBack" content="搜索结果">
      </el-page-header>
    </el-header>
    <el-main class="el-main">
      <el-table
        :data="ssjg"
        style="width: 100%">
        <el-table-column
          prop="filename"
          label="文件名"
          width="170">
        </el-table-column>
        <el-table-column
          prop="name"
          label="作者"
          width="170">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="分类"
          width="170">
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          width="170">
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="时间"
          width="170">
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
    import {findFile} from "../request/findFile";

    export default {
        name: "Find",
      data(){
          return{
            ssjg:[],
            loading:false
          }
      },
      methods:{
        goBack() {
          this.$router.back(-1)
        },
        look(index){
          console.log(index);
          let id = this.ssjg[index].systemid
          console.log(id);
          this.$router.push({path:'/preview',
            query:{
              fileId:id,
              fileName:this.ssjg[index].filename,
              name:this.ssjg[index].name
            }
          })
        }
      },
      mounted() {
          findFile(this.$route.query.input,res =>{
            this.ssjg=res.data.data
          })
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
