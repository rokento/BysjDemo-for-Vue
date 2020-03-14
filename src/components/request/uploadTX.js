import {request} from "./request";

export  function  uploadTx(param,success) {

  request(
    {
      url:'/app/user/uploadtouxiang',
      method:'POST',
      data: param
    },res =>{
      success(res)
    },err =>{
      console.log(err)
    }
  )

}
