import {reportList, userList} from "./data";
import moment from 'moment'

export default {
    '/api/report/list': (req: any, res: any) => {
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
                total: reportList.length,
                reportList: reportList.slice((page - 1) * pageSize, pageSize * page)
            }
        }))
    },
    '/api/report/userList': (req: any, res: any) => {
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        res.end(JSON.stringify({
            err_code: 0,
            msg: 'ok',
            data: userList.filter(user => user.role !== 'guest')
        }))
    },
    'POST /api/report/save': (req: any, res: any) => {
        const {title, receiver, content} = req.body;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        reportList.unshift({
            id: reportList[reportList.length - 1].id++,
            title,
            receiver: userList.filter(item => item.id === Number(receiver))[0].name,
            content,
            date: moment().format('YYYY-MM-DD')
        })

        res.end(JSON.stringify({
            err_code: 0,
            msg: 'ok'
        }))
    },

    '/api/report/detail': (req: any, res: any) => {
        const {id} = req.query;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        const index = reportList.findIndex(item => item.id === Number(id));

        if (index > -1) {
            res.end(JSON.stringify({
                err_code: 0,
                msg: 'ok',
                data: {
                    ...reportList[index],
                    receiver_id: userList.filter(item => item.name === reportList[index].receiver)[0].id
                }
            }))
        } else {
            res.end(JSON.stringify({
                err_code: -1,
                msg: '查询的日报不存在'
            }))
        }
    },
    //删除
    '/api/report/delete' : (req: any, res: any) => {
        const {id} = req.query;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', '*');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        const index = reportList.findIndex(item => item.id === Number(id));

        if( index > -1){
            reportList.splice(index,1)
            res.end(JSON.stringify({
                err_code: 0,
                msg: 'ok'
            }))
        }else{
            res.end(JSON.stringify({
                err_code: -1,
                msg: '删除的日报不存在'
            }))
        }
    }
}
