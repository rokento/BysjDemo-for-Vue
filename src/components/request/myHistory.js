import {request} from "./request";

export function getHistory(success) {

  request(
    {
      url:'/app/user/history',
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}
