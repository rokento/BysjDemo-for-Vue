import {request} from "./request";

export function checkSc(param,success) {

  request(
    {
      url:'/app/sc/checksc/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err=>{
      console.log(err);
    }
  )

}
