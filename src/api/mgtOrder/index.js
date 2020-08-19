import axios from 'axios'

const service = axios.create({
  baseURL:"http://192.168.1.108:8084", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

  
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
 
  response => {
    const res = response
console.log("响应拦截",res)
    // if the custom code is not 20000, it is judged as an error.
    
      return res
    
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


// import request from "@/utils/request";
export function getList(data) {
  return service({
    url: "/admin/order/dy",
    method: "post",
    data,
  });
}

export function check(data) {
  return request({
    url: "/admin/order/check",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/table/doDelete",
    method: "post",
    data,
  });
}
