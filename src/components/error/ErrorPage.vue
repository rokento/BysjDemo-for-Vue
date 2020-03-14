<template>
  <div class="bjtp">
    <el-button type="primary" @click="goHome" plain>返回首页</el-button>
  </div>
</template>

<script>
    export default {
        name: "ErrorPage",
        methods:{
          goHome(){
            this.$router.push('/home');
          }
        }
    }
</script>

<style scoped>

  .bjtp{
    width: 800px;
    height: 500px;
    background-image: url("../../img/500.jpg");
    background-size: 100% 100%;
    line-height: 420px;
  }
</style>
