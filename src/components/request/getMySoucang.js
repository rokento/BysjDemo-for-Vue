import {request} from "./request";

export function getMySc(success) {

  request(
    {
      url:'/app/sc/mysc',
      method:'GET'
    },res =>{
      success(res)
    },err=>{
      console.log(err);
    }
  )

}
