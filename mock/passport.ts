const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.pM2dY8NDjp6CpmvepqPXgDOXLHqTjZqGEK95vtmGUlw';
export default {
    // 登录
    'POST /api/pass/login': (req: any, res: any) => {
        const {username, password} = req.body;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        if (username === 'admin' && password === '123456') {
            res.end(JSON.stringify({
                err_code: 0,
                msg: 'ok',
                data: token
            }))
        } else {
            res.end(JSON.stringify({
                err_code: -1,
                msg: '用户名或密码错误'
            }))
        }
    }
}
