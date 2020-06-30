import service from '../../utils/service'
import * as types from './types'

// 登录
export function login(data: types.LoginParams) {
    return service.post('/api/pass/login', data)
}
