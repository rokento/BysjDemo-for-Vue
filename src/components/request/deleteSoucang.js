import {request} from "./request";

export function deleteSc(param,success) {

  request(
    {
      url:'/app/sc/delete/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err=>{
      console.log(err);
    }
  )

}
