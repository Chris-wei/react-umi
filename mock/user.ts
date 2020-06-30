import {userList} from "./data";

export default {
    // 用户列表
    '/api/user/list': (req: any, res: any) => {
        const {page, pageSize} = req.query;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        res.end(JSON.stringify({
            err_code: 0,
            msg: 'ok',
            data: {
                page: +page,
                total: userList.length,
                userList: userList.slice((page - 1) * pageSize, pageSize * page)
            }
        }))
    },
    //添加用户
    'POST /api/user/add': (req: any, res: any) => {
        const {username, role} = req.body;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        userList.push({
            id: userList[username.length - 1].id + 1,
            name: username,
            role: role
        })

        // 返回
        res.end(JSON.stringify({
            err_code: 0,
            msg: 'ok'
        }))
    },
    // 编辑用户
    'POST /api/user/edit': (req: any, res: any) => {
        const {id, username, role} = req.body;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        const index = userList.findIndex(item => item.id === Number(id));

        if (index > -1) {
            userList[index].name = username;
            userList[index].role = role;

            res.end(JSON.stringify({
                err_code: 0,
                msg: 'ok'
            }))
        } else {
            res.end(JSON.stringify({
                err_code: -1,
                msg: '用户不存在'
            }))
        }
    },
    // 删除
    '/api/user/del': (req: any, res: any) => {
        const {id} = req.query;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        const index = userList.findIndex(item => item.id === Number(id));

        if (userList[index].role === 'admin') {
            res.end(JSON.stringify({
                err_code: -2,
                msg: '管理员不允许删除'
            }))
        } else if (index > -1) {
            userList.splice(index, 1);
            res.end(JSON.stringify({
                err_code: 0,
                msg: 'ok'
            }))
        } else {
            res.end(JSON.stringify({
                err_code: -1,
                msg: '用户不存在'
            }))
        }
    },
}
