import {request} from "./request";
export function previewFile(id,success) {
  request(
    {
      url:'/app/files/preview/'+id,
      method:'GET'
    },res =>{
      success(res)
    }, err =>{
      console.log(err);
    }
  )
}
