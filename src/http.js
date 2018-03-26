import axios from 'axios';
import router from './router'
import store from './store/store'
import {Message} from 'iview'

axios.defaults.baseURL = "/api";//全局配置baseURL

//http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log(response)
        switch (response.data.code) {
            case 90001:
                store.commit('REMOVE_TOKEN');
                // router.replace({
                //     path: '/login',
                //     query: {redirect: router.currentRoute.fullPath}
                // });
                let basePath = ''
                if(store.state.basePath == 'http://192.168.88.166:9984/' || store.state.basePath == 'http://192.168.88.222:9984/'){
                    basePath = store.state.basePath + 'alliance/logout.aspx'
                }else if(store.state.basePath == 'https://admin.egongzheng.com/gzy/'){
                    basePath = store.state.basePath + 'alliance/back/toLogin.aspx'                    
                }
                window.location.href = basePath
                // SUCESS(200, "success"),
                // /**数据错误 10开头*/
                // ERROR10001(10001, " {0}"),
                // ERROR10002(10002, " {0}不能为空"),
                // ERROR10003(10003, "数据已经存在,无需再添加"),
                // ERROR10004(10004, "该记录不存在"),
                // /**系统错误 90开头*/
                // ERROR90000(90000, "access-token不能为空"),
                // ERROR90001(90001, "访问TOKEN已过期,请重新获取!"),
                // ERROR90002(90002, "获取访问TOKEN失败,请联系客服!"),
                // ERROR90003(90003, "系统异常,请联系客服!");
                break
            case 10001:
                if(response.data.errorMsg == " 发票信息管理数据未设置" || response.data.errorMsg == " 地址管理数据未设置" || response.data.errorMsg ==" 该手机号已被注册"){
                    console.log(response);break
                }else{
                    if($('.ivu-message-notice-content').length == 0){
                        Message.error(response.data.errorMsg);console.log(response);break  
                    }
                    break  
                }
            case 10002:
                if($('.ivu-message-notice-content').length == 0){
                    Message.error(response.data.errorMsg);console.log(response);break 
                } 
                break 
            case 10003:
                if($('.ivu-message-notice-content').length == 0){
                    Message.error(response.data.errorMsg);console.log(response);break
                } 
                break  
            case 10004:
                if($('.ivu-message-notice-content').length == 0){
                    Message.error(response.data.errorMsg);console.log(response);break
                } 
                break   
            case 90000:
                if($('.ivu-message-notice-content').length == 0){
                    Message.error(response.data.errorMsg);console.log(response);break
                } 
                break  
            case 90001:
                if($('.ivu-message-notice-content').length == 0){
                    Message.error(response.data.errorMsg);console.log(response);break
                } 
                break   
            case 90002:
                if($('.ivu-message-notice-content').length == 0){
                    Message.error(response.data.errorMsg);console.log(response);break
                } 
                break   
            case 90003:
                if($('.ivu-message-notice-content').length == 0){
                    Message.error(response.data.errorMsg);console.log(response);break
                } 
                break   
        }
        return response;
    },
    // error => {
    //     if (error.response) {
    //         switch (error.response.status) {
    //             case 404:
    //                 // 404
    //                 store.commit('REMOVE_TOKEN');
    //                 router.push({
    //                     name: '404'
    //                 });
    //         }
    //     }
    //     // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    //     return Promise.reject(error.response.data)
    // }
);

export default axios;