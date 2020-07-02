import service from '../../utils/service'

// 获取审核人
export function getCheckUsers(params?: any) {
    return service.get('/api/report/userList', params)
}

// 提交日报
export function saveReport(data?:any) {
    return service.post('/api/report/save',data)
}

// 获取日报
export function getReportList(params?:any) {
    return service.get('/api/report/list',params)
}

// 查看日报
export function getReportDetail(params?:any) {
    return service.get('/api/report/detail',params)
}

// 删除日报
export function deleteReport(params?:any){
    return service.get('/api/report/delete',params)
}
