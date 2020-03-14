import {request} from "./request";

export function saveFile(param,success) {
  request(
    {
      url:'/app/files/save',
      method:'POST',
      data:param
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}
