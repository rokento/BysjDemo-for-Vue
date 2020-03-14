import {request} from "./request";

export function getTages(param,success){
  request(
    {
      url:'/app/dictionary/get/menutag_'+param,
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err)
    }
  )
}
