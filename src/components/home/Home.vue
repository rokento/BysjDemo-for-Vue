<template>
  <div>
    <div class="eltag">
      <el-radio-group v-model="tableParam.tags" @change="clickTag" size="mini">
        <el-radio-button v-for="item in tags" :key="'tag'+item.kind_code" :label="item.detail"/>
      </el-radio-group>
    </div>

    <el-container v-loading="loading">
      <el-aside class="el-aside" width="200px">
        <el-menu v-for="menu in menuname" :key="'menu1'+menu.kind_code" active-text-color="#303133"
                 :default-active="menu.kind_code" class="el-menu-vertical-demo" >
          <el-menu-item :index="menu.kind_code"  @click="leftClick(menu.kind_code,menu.detail)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{menu.detail}}</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-main class="el-main">
            <div>
              <el-table :data="tableData" stripe header-align="center" size="mini"
                        border max-height="600" height="600" style="width: 100%">
                <el-table-column prop="filename" label="文件名称"  ></el-table-column>
                <el-table-column prop="user" label="作者"></el-table-column>
                <el-table-column prop="cjsj" label="上传时间" ></el-table-column>
                <el-table-column prop="oper" label="操作">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button size="small" round @click="previewFile(scope.$index)" icon="el-icon-view"></el-button>
                      <el-button size="small" round @click="download(scope.$index)" icon="el-icon-download"></el-button>
                      <el-button size="small" round  icon="el-icon-share"></el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import {getmenu} from "../request/getMenu";
  import {getTages} from "../request/getTags";
  import {getFiles} from "../request/getFiles";


  export default {
        name: "Home",
      data() {
        return {
          tags: [],
          menuname:[{kind_code:'',detail:''}],
          tableData: [],
          tableParam:{
            tags:null,
            sort:null
          },
          effect:'plain',
          loading:false
        };
      },
      methods: {
        leftClick(code,detail){
          this.tableParam.sort=detail
          //菜单被单击要重置tag
          this.tableParam.tags=null
          getTages(code,
            res =>{
              this.tags=res.data.data
            })
          //更新列表数据
          this.getTableData()
        },
        //预览
        previewFile(index) {
          let id = this.tableData[index].systemid
          console.log(id);
          this.$router.push({path:'/preview',
            query:{
              fileId:id,
              fileName:this.tableData[index].filename,
              name:this.tableData[index].user
          }
          })

        },
        //按标签筛选
        clickTag(){
          console.log(this.tableParam.tags)
          //更新列表数据
          this.getTableData()
        },
        getTableData(){
          this.loading=true
          getFiles(this.tableParam,res =>{
            this.tableData=res.data.data
            this.loading=false
          })
        },
        //下载文件
        download(index){
          window.location.href=this.$store.state.host+'/app/files/download/'+this.tableData[index].systemid
        }
      },
      mounted(){
        this.loading=true
        getmenu(
          res =>{
            this.menuname=res.data.data
          }
        )
        getTages('01',
        res =>{
          this.tags=res.data.data
        })
        getFiles({tags:null, sort:null},res =>{
          this.tableData=res.data.data
        })
        this.loading=false
      }
    }
</script>

<style scoped>
  .el-main {
    color: #333;
    text-align: center;
    line-height: 20px;
    width: 1000px;
    margin: 0;
    padding: 0;
  }
  .el-aside {
    background-color:  white;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 600px;
    overflow-x: hidden;
  }
  .el-aside::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 3px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .el-aside::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #535353;
  }
  .test-1::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #ededed;
  }

  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 20px;
  }

</style>
