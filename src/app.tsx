import {RequestConfig} from 'umi'
import {message} from 'antd'

// 路由变更
export function onRouteChange({location, routes, action}: any) {

}

// 数据请求
export const request: RequestConfig = {
    // prefix: 'http://192.168.0.220',
    timeout: 3000,
    middlewares: [],
    requestInterceptors: [function (url, config:any) {
        if( url !== '/api/pass/login'){
            const token = localStorage.getItem('token');
            config.headers['token'] = token;
        }
        return {
            url,
            config
        }
    }],
    responseInterceptors: [async function (response) {
        const codeMaps: any = {
            403: '没有权限',
            404: '请求资源未找到',
            502: '网关错误。',
            503: '服务不可用，服务器暂时过载或维护。',
            504: '网关超时。',
        };

        if (response.status > 400) {
            message.error(codeMaps[response.status])
        }

        return response;
    }],
    // 错误处理
    errorHandler: function (error) {
        console.error(error)
        return {err_code: 1000, msg: '服务器异常'}
    },
}
