import {request} from "./request";

export  function getMyFile (success) {

  request(
    {
      url:'/app/user//myfile',
      method:'GET'
    },res =>{
      success(res)
    },err =>{
      console.log(err);
    }
  )
}
