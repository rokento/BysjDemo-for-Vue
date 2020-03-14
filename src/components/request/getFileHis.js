import {request} from "./request";

export  function getFileHis(param,success) {

  request(
    {
      url:'/app/filehis/gethis/'+param,
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}
