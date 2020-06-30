import React, {useImperativeHandle, useState} from 'react';
import {Form, Input, Modal, Radio} from 'antd';

export default (props: any) => {
    const {cRef, onOk, loading} = props;
    // 表单
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('添加用户');
    const [record, setRecord] = useState({id: ''});

    // 提交
    const onSubmit = () => {
        form.validateFields().then(values => {
            const {username, role} = values;
            onOk({username, role}, record.id);
        }).catch(() => {
        })
    }

    // 取消
    const onCancel = () => {
        setVisible(false);
        form.resetFields();
    }

    // 暴露给父元素的方法
    useImperativeHandle(cRef, () => ({
        onShowModal: (record?: any) => {
            if (record) {
                form.setFieldsValue({
                    role: record.role,
                    username: record.name
                })
                setRecord(record);
                setTitle('编辑用户')
            } else {
                setRecord({id: ''})
                setTitle('添加用户')
            }
            setVisible(true)
        },
        onCancel
    }))

    // 布局
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    };

    return (
        <Modal
            {...layout}
            width={400}
            centered={true}
            title={title}
            visible={visible}
            maskClosable={false}
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={onSubmit}
        >
            <Form {...layout} name={'form'} size={"middle"} form={form}>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '请输入用户名!'}]}
                >
                    <Input placeholder={'请输入用户名'}/>
                </Form.Item>
                <Form.Item
                    label="用户类型"
                    name="role"
                    rules={[{required: true, message: '请选择用户类型!'}]}
                    initialValue={'user'}
                >
                    <Radio.Group>
                        <Radio value="admin">管理员</Radio>
                        <Radio value="user">普通用户</Radio>
                        <Radio value="guest">游客</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}
