import {request} from "./request";

export function addNewQx(params,success){
  request(
    {
      url:'/app/qxManager/add',
      method:'POST',
      data:params
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}



export function getFileqx(param,success){
  request(
    {
      url:'/app/qxManager/get/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}

export function deleteQx(param,success){
  request(
    {
      url:'/app/qxManager/delete/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}
