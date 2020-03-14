import {request} from '../request/request'

export function register(form) {
 request(
   {
     url: 'app/register/add',
     method: 'POST',
     data: form
   }, res =>{
     console.log(res)
   },err =>{
      this.$router.push('/err')
   }
 )
}
