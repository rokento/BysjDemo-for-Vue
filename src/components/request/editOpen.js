import {request} from "./request";

export function editOpen(param,success) {

  request(
    {
      url:'/app/files//editopen/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )

}
