/** * axios封装 * 请求拦截、响应拦截、错误统一处理 */
import Vue from 'vue';
import axios from 'axios';
import App from "@/main.js";
import store from "@/store";
import CommonFunction from '@/common/commonFunction.js';
// import UatIpObj from "@/config.js";

//跳转登录页
const toLogin = () => {
    //401后清空部分cookie

    //2019.11.28
    // App.$root.mainPageList.forEach((item) => {
    //     if (location.href.indexOf(item.path) > -1)
    //         location.href = UatIpObj.UserManageIp + "bareMetalLogin?toUrl=/" + item.path + "&" + item.keyQuery + "=true";
    // });
}


/** * 请求失败后的错误统一处理
 * @param {Number} status
 * 请求失败的状态码
 * 
 **/
const errorHandle = (status) => {
    // 状态码判断
    switch (status) {
        // 401: token失效，跳转登录页
        case 401:
            toLogin();
            break;
    }
}

// 创建axios实例
let instance = axios.create({ timeout: 5000 * 12 });
//配置默认请求baseURL
// instance.defaults.baseURL = store.state.SetConfigModules.API_ROOT;
instance.defaults.withCredentials = true;
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器，在请求头中加token
instance.interceptors.request.use(
    config => {
        // if (CommonFunction.getCookie("Authorization")) {
        //     config.headers.Authorization = CommonFunction.getCookie("Authorization");
        // }
        return config;
    },
    error => {
        //请求失败 hide loading
        // App.$Notice.error({
        //     title: error.data.message.user_info ? error.data.message.user_info : '操作失败',
        //     duration: 1.5,
        //     onClose: () => {
        //         let errorNotice = document.querySelector(".ivu-notice");
        //         let timer = setTimeout(() => {
        //             errorNotice && errorNotice.classList && errorNotice.classList.contains("error") && errorNotice.classList.remove("error");
        //             clearTimeout(timer);
        //         }, 1000);
        //     }
        // });
        //当 出现错误提示时 给提示添加类error 用来添加和成功不同的样式
        // let errorNotice = document.querySelector(".ivu-notice");
        // errorNotice && errorNotice.classList && errorNotice.classList.add("error");
        return Promise.reject(error);
    }
);
// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => {
        // if (res.data.is_ok == true) {
        //     return Promise.resolve(res);
        // } else {
        //     res.data.no == 401 &&
        //         // res.config.url.indexOf("/access_control/console") == -1 &&
        //         errorHandle(res.data.no);
        //     return Promise.reject(res);
        // }
    },
    // 请求失败
    error => {
        // App.$Notice.error({
        //     title: error.data && error.data.message && error.data.message.user_info ? error.data.message.user_info : '操作失败',
        //     duration: 1.5,
        //     onClose: () => {
        //         let errorNotice = document.querySelector(".ivu-notice");
        //         let timer = setTimeout(() => {
        //             errorNotice && errorNotice.classList && errorNotice.classList.contains("error") && errorNotice.classList.remove("error");
        //             clearTimeout(timer);
        //         }, 1000);
        //     }
        // });
        //当 出现错误提示时 给提示添加类error 用来添加和成功不同的样式
        // let errorNotice = document.querySelector(".ivu-notice");
        // errorNotice && errorNotice.classList && errorNotice.classList.add("error");
        return Promise.reject(error);
    }
);
export default instance;