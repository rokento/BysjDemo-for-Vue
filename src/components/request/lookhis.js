import {request} from "./request";

export function lookHis(param,success) {

  request(
    {
      url:'/app/filehis/lookhis/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}
