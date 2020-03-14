<template>
  <el-container>
    <el-header class="el-header">
      <el-page-header @back="goBack" content="查看历史版本">
      </el-page-header>
    </el-header>
    <el-main class="el-main">
      <div id="editor"></div>
    </el-main>
  </el-container>
</template>

<script>
    import CKEditor from "@ckeditor/ckeditor5-build-decoupled-document";
    import {lookHis} from "../request/lookhis";

    export default {
        name: "his",
      data(){
          return {
            editor:null
          }
      },
      methods:{
        goBack() {
          this.$router.back(-1)
        }
      },
      mounted() {
        CKEditor.create(document.querySelector('#editor'), {
          language: 'zh-cn',
        }).then(editor => {
          //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
          this.editor = editor
          lookHis(this.$route.query.hisID,res =>{
            //初始化设置编辑器内容
            editor.setData(res.data.data)
          })
          //设置只读
          editor.isReadOnly = true
        }).catch(error => {
          console.error(error);
        });
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


  .el-main {
    margin: 0;
    padding: 0;
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 20px;
  }
</style>
