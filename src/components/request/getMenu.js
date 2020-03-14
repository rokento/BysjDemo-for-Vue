import {request} from "./request";

export  function getmenu(success){
  request(
    {
      url:'/app/dictionary/get/menu',
      method:'GET',
      changeOrigin: true
    },res =>{
      success(res)
    },err =>{
      console.log(err)
    }
  )
}
