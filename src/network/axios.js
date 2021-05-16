import axios from 'axios'

// axios.defaults.withCredentials = true

export function require (config) {
  const instance = new axios.create({
    // baseURL: 'http://112.74.174.199:3000',
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    xhrFields: {
      withCredentials: true, 
    },
  })

  instance.interceptors.request.use(config => {
    // if(sessionStorage.getItem('token')) {
    //   config.headers['token'] = sessionStorage.getItem('token')
    // }
    return config;
  }, err => {
    console.log(err);
  })
  
  instance.interceptors.response.use(res => {
    res.headers
    return res.data
  }, err => {
    console.log(err)
  })
  
  return instance(config)
}