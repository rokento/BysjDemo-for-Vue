<template>
  <div>

    <el-container>
      <el-aside class="el-aside" width="500px">
        <div>
          <el-image
            class="avatar-uploader el-upload"
            style="width: 185px; height: 185px; margin-top: 20px"
            :src="$store.state.user.touxiang">
          </el-image>
          <span style="display: block;margin-top: 20px; color: black">当前头像</span>
        </div>
      </el-aside>
      <el-main class="el-main">
        <el-upload
          v-loading="loading"
          class="avatar-uploader el-upload"
          :show-file-list="true"
          action="string"
          :before-upload="beforeAvatarUpload">
          <img v-if="requestData.data!=''" :src="requestData.data" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <br>
        <el-button type="primary" @click="uplodatx" plain>上传头像</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {uploadTx} from "../request/uploadTX";

  export default {
        name: "EditTouxiang",
        data() {
          return {
            requestData:{
              data:'',
              username:this.$store.state.user.username
            },
            loading:false
          };
        },
        methods: {
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024  < 60;

            if ( !(isJPG || isPNG) ) {
              this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
              return
            }

            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 60KB!');
              return
            }
            //图片转base64
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              this.requestData.data = reader.result
            }
            reader.onerror = function (error) {
              console.log('Error: ', error)
            }
            return false;
          },
          uplodatx(){
            this.loading=true;
            uploadTx(
              this.requestData,
              res=>{
                if(res.data.code=='200'){
                  this.$store.commit('setUserTouxiang',this.requestData.data)
                  this.$message({message: res.data.msg, type: 'success'})
                }else{
                  this.$message.error(res.data.msg);
                }
                this.loading=false;
              }
            )
          },

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

  .avatar-uploader  {
    border: 1px dashed #8c858a;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload{
    border: 1px dashed #8c858a;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload:hover{
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
