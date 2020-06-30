const routes = [
    {
        path: '/', redirect: '/dashboard'
    },
    {
        exact: true, path: '/login', component: '@/pages/login/index', title: '登录'
    },
    {
        component: '@/layouts/index',
        routes: [
            {exact: true, path: '/dashboard', component: '@/pages/dashboard/index', title: '首页'},
            {exact: true, path: '/user', component: '@/pages/user/index', title: '用户'},
        ],
    },
    {
        path: '*', component: '@/pages/404'
    }
]

export default routes;
