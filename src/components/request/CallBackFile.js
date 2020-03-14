import {request} from "./request";

export  function callBackInfo(data,success){
  request(
    {
      url:'/app/files/fileinfo',
      method:'POST',
      data:data
    },res=>{
      success(res)
    }
  )
}
