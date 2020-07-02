const routes = [
    {
        path: '/', redirect: '/dashboard'
    },
    {
        path: '/404', component: '@/pages/404'
    },
    {
        exact: true, path: '/login', component: '@/pages/login/index', title: '登录',
        wrappers: [
            '@/wrappers/auth',
        ]
    },
    {
        component: '@/layouts/index',
        wrappers: [
            '@/wrappers/auth',
        ],
        routes: [
            {exact: true, path: '/dashboard', component: '@/pages/dashboard/index', title: '首页'},
            {exact: true, path: '/user', component: '@/pages/user/index', title: '用户'},
            {exact: true, path: '/report', component: '@/pages/report/index', title: '日报'},
            {exact: true, path: '/report/write', component: '@/pages/report/write/index', title: '写日报'},
            {exact: true, path: '/report/write/:id', component: '@/pages/report/write/index', title: '写日报'},
            {exact: true, path: '/dynamic', component: '@/pages/dynamic/index', title: '动态组件'},
            {path: '*', redirect: '/404'}
        ]
    },
    {
        path: "*", redirect: '/404'
    }
]

export default routes;
