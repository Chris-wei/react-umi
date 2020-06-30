import React from 'react';
import {ConfigProvider, Layout} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import {useLocation} from "umi";
import styles from './index.less'
import Header from './components/Header'
import Footer from './components/Footer'

const {Content} = Layout;

export default ({children}: any) => {
    const {pathname} = useLocation();

    if (pathname === '/login') {
        return children
    }

    return (
        <ConfigProvider locale={zhCN} componentSize={"middle"} input={{autoComplete: undefined}}>
            <Layout className={styles.wrapper}>
                <Header/>
                <Content className={styles.content}>{children}</Content>
                <Footer/>
            </Layout>
        </ConfigProvider>
    )
}
