import  axios from 'axios'
import store from "../../store";

export function  request(config,success,failure) {

  const axiosRequest = axios.create({
    baseURL:'http://localhost:8080',
    timeout:'30000',
    headers:{'Access-Control-Allow-Origin':'*', 'token': store.state.user.token},
  })


  axiosRequest(config)
    .then(res =>{
      success(res)
    })
    .catch(err =>{
      failure(err)
    })
}
