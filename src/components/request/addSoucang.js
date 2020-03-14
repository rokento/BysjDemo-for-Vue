import {request} from "./request";

export function addSc(param,success) {

  request(
    {
      url:'/app/sc/add/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err=>{
      console.log(err);
    }
  )

}
