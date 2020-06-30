import service from '../../utils/service';

// 获取用户列表
export function getUserList(params?: any) {
    return service.get('/api/user/list', params)
}

// 添加用户
export function saveUser(data?:any) {
    return service.post('/api/user/add',data)
}

// 编辑用户
export function updateUser(data?:any){
    return service.post('/api/user/edit',data)
}

// 删除用户
export function deleteUser(params?:any){
    return service.get('/api/user/del',params)
}
