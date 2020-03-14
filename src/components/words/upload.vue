<template>
  <div v-loading="loading">
    <el-divider content-position="center">
      <img src="../../img/upload.png" style="width: 50px;height: 50px">
    </el-divider>
    <el-container>
      <el-main class="el-main">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="String"
          :before-upload="beforeUpload"
          accept=".doc"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>

        <label for="bt">标 题 :</label>
        <el-input id="bt" v-model="file.title" placeholder="请输入标题" class="input"></el-input>
        <div>
          <label>分 类 :</label>
          <el-radio-group v-model="file.sort" @change="requestTag">
            <el-radio-button v-for="item in flSelect" :key="item.kind_code" :label="item.detail"/>
          </el-radio-group>
          <div/>
          <div style="margin-top: 20px"  :class="{'kz':tagSelect.length==0}">
            <label>标 签 :</label>
            <el-radio-group v-model="file.tags" size="mini">
              <el-radio-button v-if="tagSelect.length==0" disabled label="先选择稿件的分类才能继续选择标签哦"/>
              <el-radio-button v-for="(tag,index) in tagSelect" :key="index" :label="tag.detail"/>
            </el-radio-group>
          </div>

          <div style="margin-top: 20px; float: left; margin-left: 150px;">
            <label>是否公开:</label>
            <el-switch v-model="file.public"/>
          </div>


        </div>
      </el-main>
    </el-container>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>

<script>
  import {getmenu} from "../request/getMenu";
  import {getTages} from "../request/getTags";
  import {uploadFile} from "../request/uploadFie";
  import {callBackInfo} from "../request/CallBackFile";

  export default {
        name: "upload",
      data(){
          return{
            uploadForm:new FormData(),
            file:{
              title:'',
              public:false,
              sort:'',
              tags:'',
              filename:'',
              filepath:''
            },
            flSelect:[],
            tagSelect:[],
            loading:false
          }
      },
      methods: {
        submitUpload() {
          this.loading=true
          this.$refs.upload.submit();
          if(this.uploadForm.get('file')===null){
            this.$message.error("请选择文件")
            this.loading=false
            return
          }
          uploadFile(
            this.uploadForm,
            res=>{
              //上传成功回写文件信息
              if(res.data.code=='200'){
                this.file.filename=res.data.data.filename
                this.file.filepath=res.data.data.filepath
                callBackInfo(
                  this.file,res =>{
                    this.$message({message: res.data.msg, type: 'success'})
                    this.loading=false
                    this.$router.push('/myfile')
                  })
              }else if(res.data.code=='201'){
                this.loading=false
                this.$message.error(res.data.msg)
              }else{
                this.loading=false
                this.$router.push('/err')
              }
            }
          )
        },
        beforeUpload(file){
          this.uploadForm.append('file',file)
          return false
        },
        requestTag(){
          let code = ''
          //根据detail获取kind_code
          for(let i=0;i<this.flSelect.length;i++){
            if(this.file.sort===this.flSelect[i].detail){
              code=this.flSelect[i].kind_code;
            }
          }
          getTages(code,
          res =>{
            this.tagSelect=res.data.data
          })
        }
      },
      mounted() {
          getmenu(
            res =>{
              this.flSelect=res.data.data
            }
          )
      }
    }
</script>

<style scoped>
  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
.input{
  width: 250px;
}
  .kz{
    float: left;
    margin-left: 150px
  }
</style>
