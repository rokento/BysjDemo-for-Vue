import {request} from "./request";

export function uploadFile(data,success){
  request(
    {
      url:'/app/files/upload',
      method:'POST',
      data:data
    },res =>{
      success(res)
    },err =>{
      console.log(err)
    }
  )
}
