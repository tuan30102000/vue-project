import axios from "axios";
import jwt_decode from "jwt-decode";
import ApiUrl from "../Constan/ApiUrl";
import method from "../Constan/method";
import userApi from "./loginApi";
// axios.defaults.withCredentials = true

const axiosAuth = axios.create({
    baseURL: ApiUrl.baseURL,
    withCredentials: true,
    headers: {
        'content-Type': 'application/json',
        // 'content-type': 'application/x-www-form-urlencoded'
        'Access-Control-Allow-Origin':ApiUrl.baseURL,


    }
})

// axiosJwt.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     console.log(error)
//     // Do something with request error
//     return Promise.reject(error);
// });
axiosJwt.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const accessToken = method.getAccessToken()
    const decodeToken = jwt_decode(accessToken)
    const dateNow = new Date()
    const isExpire = decodeToken.exp < Number(dateNow) / 1000
    if (!isExpire) {
        config.headers.accesstoken = 'Bearer ' + accessToken
        return config
    }
    const data = await userApi.refresh()
    method.setAccessToken(data.accessToken)
    config.headers.accesstoken = 'Bearer ' + data.accessToken
    return config
}, function (error) {
    console.log(error)
    // Do something with request error
    return Promise.reject(error);
});
//check jwt time and refeshToken
axios.interceptors.request.use(function (config) {

})

// Add a response interceptor
axiosJwt.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default axiosAuth