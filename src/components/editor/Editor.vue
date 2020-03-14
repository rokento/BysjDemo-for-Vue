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
      <el-container>
        <el-main class="el-main">
          <div id="toolbar-container"></div>
          <div id="editor"></div>
        </el-main>
      </el-container>
      <el-aside width="268px">

        <el-button type="primary" icon="el-icon-document-add" @click="saveFile">保存</el-button>
        <el-button type="primary" icon="el-icon-download" @click="downloadFile">下载</el-button>
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
  import {saveFile} from "../request/saveFile";
  import {getFileHis} from "../request/getFileHis";

  export default {
        name: "Editor",
      data() {
        return {
          editor:null,//编辑器实例
          saveParam:{
            systemid:'',
            context:''
          },
          hisList:[]
        }
      },
      mounted() {
        this.initCKEditor()
        getFileHis(this.$route.query.fileId,res =>{
          if(res.data.code='200'){
            this.hisList=res.data.data
          }else{
            console.log(res);
          }
        })
      },
      methods: {
        initCKEditor() {
          CKEditor.create(document.querySelector('#editor'), {
            language: 'zh-cn',
          }).then(editor => {
            const toolbarContainer = document.querySelector('#toolbar-container');
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
            //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
            this.editor = editor
            //初始化设置编辑器内容
            editor.setData(this.$store.state.editData)
          }).catch(error => {
            console.error(error);
          });
        },
        //保存方法
        saveFile(){
          this.saveParam.systemid=this.$route.query.fileId
          this.saveParam.context=this.editor.getData()
          console.log(this.saveParam.systemid)
          saveFile(this.saveParam,res =>{
            if(res.data.code='200'){
              this.$message({type:'success',message:res.data.msg})
            }else{
              this.$message.error(res.data.msg)
            }
          })
        },
        downloadFile(){
          window.location.href=this.$store.state.host+'/app/files/download/'+this.$route.query.fileId
        },
        clickHis(index){
          this.$router.push({path:'/filehis',query:{hisID:this.hisList[index].systemid}})
        }
      }
    }
</script>

<style scoped>
  #editor{
    width: 690px;
    height: 700px;
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
  #toolbar-container{
    width: 690px;
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
