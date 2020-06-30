export interface ResponseData {
    err_code: number,
    msg: string,
    data?: any
}

export interface RequestGet {
    <T extends ResponseData>(url: string, params?: any, options?: any): Promise<T>
}

export interface RequestPost {
    <T extends ResponseData>(url: string, data?: any, options?: any): Promise<T>
}

export interface Request {
    get:RequestGet,
    post:RequestPost
}
