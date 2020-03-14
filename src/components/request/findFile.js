import {request} from "./request";

export function findFile(param,success) {

  request(
    {
      url:'/app/files/find/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}
