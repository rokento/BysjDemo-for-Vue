import {request} from './request'

export  function loginRequest(username,password,success) {
  request(
    {
      url:'app/user/login',
      method:'POST',
      timeout:10000,
      data:{
        username: username,
        password: password
      }
    }, res =>{
       success(res)
    },err =>{
      console.log(err)
    }
  )
}
