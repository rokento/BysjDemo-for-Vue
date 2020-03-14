import {request} from "./request";
export function editFile(id,success) {
  request(
    {
      url:'/app/files/edit/'+id,
      method:'GET'
    },res =>{
      success(res)
    }, err =>{
      console.log(err);
    }
  )
}
