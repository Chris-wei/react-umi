import service from '../../utils/service'

// 登录
export function login(data?: any) {
    return service.post('/api/pass/login', data)
}
