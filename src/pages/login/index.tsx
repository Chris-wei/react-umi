import React, {useState} from 'react';
import {history} from "umi";
import {connect} from 'dva';
import {Button, Form, Input, Layout, message, Spin} from 'antd';
//@ts-ignore
import jwt_decode from 'jwt-decode';
import {CopyrightOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import Logo from '../../assets/app_images/logo-blue.png';
import styles from './index.less';

const {Content, Footer} = Layout;

const Index = ({dispatch}: any) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any): void => {
        setLoading(true);
        dispatch({
            type: 'login/userLogin',
            payload: values
        }).then((res: any) => {
            setLoading(false);
            if (res.err_code === 0) {
                let user_info = jwt_decode(res.data);
                localStorage.setItem('username', user_info.name)
                localStorage.setItem('token', res.data);
                message.success('登录成功');
                history.replace('/dashboard')
            } else {
                message.warning(res.msg);
            }
        })
    };

    return (
        <Spin spinning={loading} tip={'登录中'}>
            <Layout className={styles.loginLayout}>
                <Content className={styles.loginContent}>
                    <img className={styles.logo} src={Logo} alt=""/>
                    <h1 className={styles.title}>米斯特陈后台管理系统</h1>
                    <Form form={form} onFinish={onFinish} style={{width: '240px'}}>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input autoFocus prefix={<UserOutlined/>} placeholder={'请输入用户名'}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined/>} placeholder={'请输入密码'}/>
                        </Form.Item>
                        <Form.Item style={{'width': '100%'}}>
                            <Button className={styles.loginBtn} type="primary" htmlType="submit">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
                <Footer className={styles.footer}>Copyright <CopyrightOutlined/> 米斯特陈</Footer>
            </Layout>
        </Spin>
    )
}

export default connect()(Index)
