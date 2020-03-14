import {request} from "./request";

export function deleteFile(param,success) {

  request(
    {
      url:'/app/files/delete/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err=>{
      console.log(err);
    }
  )

}
