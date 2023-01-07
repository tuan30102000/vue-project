import axios from "axios"
import ApiUrl from "../Constan/ApiUrl";

// axios.defaults.withCredentials = true

const axiosClient = axios.create({
  baseURL: ApiUrl.baseURL,
  withCredentials: true,
  headers: {
    'content-Type': 'application/json',
    // 'content-type': 'application/x-www-form-urlencoded'
    'Access-Control-Allow-Origin': ApiUrl.baseURL

  }
})

axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // console.log(error.response.data)
  return Promise.reject(error.response.data);
});
export default axiosClient