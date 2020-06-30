import {request} from 'umi';
import {Request,RequestGet, RequestPost} from './types'

const get: RequestGet = function (url: string, params?: any, options?: any): Promise<any> {
    if (params) {
        let paramsArray: any[] = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return request(url, Object.assign({
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }
    }, options))
}

const post: RequestPost = function (url: string, data?: any, options?: any): Promise<any> {
    return request(url, Object.assign({
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        data: data ? JSON.stringify(data) : {}
    }, options))
}

const service:Request = {
    get,
    post
}
export default service

