import axios from 'axios'
import Golbal from '@/api/global_variable.js'
// import Vue from 'vue'
import router from '@/router'
import { message } from 'ant-design-vue'

const service = axios.create({
    baseURL: `http://${Golbal.baseUrl}:${Golbal.port}/`,
    timeout: 30000,
    // withCredentials: true,
})


message.config({
    top: `100px`,
    duration: 2,
    maxCount: 3,
});


service.interceptors.request.use(function (config) {
    // let user = JSON.parse(window.sessionStorage.getItem('access-user'));
    // if (user) {
    //     token = user.token;
    // }
    var token = localStorage.getItem('jwtToken');
    // let user = JSON.parse(localStorage.getItem("user"));
    // if(user){
        
    // }
    // if (token) {
    //     service.defaults.headers.common["Authorization"] = "Bearer " + token;
    //     console.log(token)
    // }
    config.headers.common["Authorization"] = "Bearer " + token;
    //console.dir(config);
    return config;
}, function (error) {
    // Do something with request error
    // console.info("error: ");
    message.error(error);
    return Promise.reject(error);
});

service.interceptors.response.use(
    response => {

        return response;
    }, error => {
        const response = error.response
        const data = response ? response.data : null
        if (data) {
            if (data.status === 401) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem("user");
                router.push("/login")
                message.error(data.message);
            }else {
                if (data.message) {
                    message.error(data.message);
                } else {
                    message.error('error --interceptors');
                }

            }
            //console.log(data)
        }
       
        return Promise.reject(error)
    }
)



export default service