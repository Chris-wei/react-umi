import React from 'react';
import {Redirect, useLocation} from 'umi';


function useAuth() {
    const token = localStorage.getItem('token');
    return !!token;
}

export default (props: any) => {
    const isLogin = useAuth();
    const location = useLocation();

    if (location.pathname === '/login') {
        console.log(isLogin);
        if (isLogin) return <Redirect to={'/dashboard'}/>
        return <>{props.children}</>;
    } else {
        if (isLogin) return <>{props.children}</>;
        return <Redirect to={'/login'}/>
    }
}

