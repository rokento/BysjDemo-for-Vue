<template>

  <el-container>
    <el-header class="el-header">
      <div style="float: left;margin-left: 10px">
        <el-link :underline="false" icon="el-icon-document" style="font-size:24px"> {{$route.query.fileName}} </el-link>
        <br> <br> <span>作者:  {{$route.query.name}} </span>
      </div>
    </el-header>
    <el-divider></el-divider>
    <el-container>
      <el-container v-loading="loading">
        <el-main class="el-main">
          <div id="editor"></div>
        </el-main>
      </el-container>
      <el-aside width="270px">

        <el-button type="primary" icon="el-icon-edit-outline" @click="edit">编辑</el-button>
        <el-button type="primary" icon="el-icon-download" @click="downloadFile">下载</el-button>
        <!--添加收藏-->
        <el-button v-if="sfsc==false" type="info" icon="el-icon-star-off" @click="addsoucang" circle></el-button>
        <!--取消收藏-->
        <el-button v-if="sfsc==true" type="warning" icon="el-icon-star-off" @click="deletesoucang" circle></el-button>
        <br><br>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>历史版本</span>
          </div>
          <div v-for="(list,index) in hisList" :key="list.systemid" class="text item">
            <el-link @click="clickHis(index)" :underline="false" icon="el-icon-document">
              {{list.cjsj}}
            </el-link>
          </div>
        </el-card>

      </el-aside>
    </el-container>
  </el-container>


</template>

<script>
  import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
  import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
  import {previewFile} from "../request/Preview";
  import {editFile} from "../request/editFile";
  import {getFileHis} from "../request/getFileHis";
  import {addSc} from "../request/addSoucang";
  import {checkSc} from "../request/checkSoucang";
  import {deleteSc} from "../request/deleteSoucang";
  export default {
    name: "Preview",
    data() {
      return {
        editor:null,//编辑器实例
        hisList:[],
        loading:false,
        sfsc:false
      }
    },
    mounted() {
      this.loading=true
      this.initCKEditor()
      //获取历史信息
      getFileHis(this.$route.query.fileId,res =>{
        if(res.data.code='200'){
          this.hisList=res.data.data
        }else{
          console.log(res);
        }
      })
      //校验是否收藏 true已收藏false未收藏
      checkSc(this.$route.query.fileId,res =>{
        if(res.data.code=='200'){
          this.sfsc=res.data.data
        }
      })
      this.loading=false
    },
    methods: {
      initCKEditor() {
        CKEditor.create(document.querySelector('#editor'), {
          language: 'zh-cn',
        }).then(editor => {
          //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
          this.editor = editor
          previewFile(this.$route.query.fileId,res =>{
            //初始化设置编辑器内容
            editor.setData(res.data.data)
          })
          //设置只读
          editor.isReadOnly = true
        }).catch(error => {
          console.error(error);
        });
      },
      edit(){
        editFile(this.$route.query.fileId,res =>{
          if(res.data.code=='200'){
            this.$store.commit('setEditData',res.data.data)
            this.$router.push({path:'/edit',
              query:{
                fileId:this.$route.query.fileId,
                fileName:this.$route.query.fileName,
                name:this.$route.query.name
              }
            })
          }else if(res.data.code='201'){
            this.$message.error(res.data.msg)
          }else {
            this.$router.push('err')
          }
        })
      },
      downloadFile(){
        window.location.href=this.$store.state.host+'/app/files/download/'+this.$route.query.fileId
      },
      clickHis(index){
        this.$router.push({path:'/filehis',query:{hisID:this.hisList[index].systemid}})
      },
      //添加收藏
      addsoucang(){
        addSc(this.$route.query.fileId,res =>{
          if(res.data.code=='200'){
            this.$message({type:'success',message:res.data.msg})
          }else{
            this.message.error(res.data.msg)
          }
        })
        this.sfsc=!this.sfsc
      },
      //取消收藏
      deletesoucang(){
        deleteSc(this.$route.query.fileId,res =>{
          if(res.data.code=='200'){
            this.$message({type:'success',message:res.data.msg})
          }else{
            this.$message.error(res.data.msg)
          }
        })
        this.sfsc=!this.sfsc
      }
    }
  }
</script>

<style scoped>
  #editor{
    width: 700px;
    height: 600px;
  }

  #editor::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  #editor::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius   : 10px;
    background-color: skyblue;
  }

  #editor::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #ededed;
    border-radius: 10px;
  }

  .el-header {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 20px;
  }

  .el-main {
    margin: 0;
    padding: 0;
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 260px;
  }
</style>
