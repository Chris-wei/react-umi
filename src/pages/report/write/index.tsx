import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'dva';
import {history, useParams} from "umi";
import {Button, Form, Input, message, Select, Space} from 'antd';
import Container from '@/components/Container';
//@ts-ignore
import E from 'wangeditor';
import styles from './index.less';

const menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'image',  // 插入图片
    'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
]


const Index = ({userList, loading, dispatch}: any) => {
    let editor: any = null;
    // 路由参数
    const params: any = useParams();
    // 表单
    const [form] = Form.useForm()
    // editor 容器
    const editorRef = useRef(null);
    const [content, setContent] = useState('');
    const [editorCheck, setEditorCheck] = useState(true);
    const [disabled, setDisabled] = useState(false);

    // 初始化
    useEffect(() => {
        // 构造实例
        editor = new E(editorRef.current);
        editor.customConfig.menus = menus;
        editor.customConfig.zIndex = 1;
        editor.customConfig.onchange = onEditorChange;
        editor.create();

        if (params && params.id) {
            getReportDetails(params.id);
            setDisabled(true);
            editor.$textElem.attr('contenteditable', false);
        }
    }, [])

    // 获取详情
    const getReportDetails = (id: number) => {
        dispatch({type: 'report/getReportDetail', payload: {id}}).then((res: any) => {
            if (res.err_code === 0) {
                const {data} = res;
                form.setFieldsValue({
                    title: data.title,
                    receiver: data.receiver_id,
                })
                setContent(data.content);
                editor.txt.html(data.content);
            } else {
                message.warning(res.msg)
            }
        })
    }

    // 监控editor的变化
    const onEditorChange = (html: string) => {
        if (!html || html === '<p><br></p>') {
            setEditorCheck(false)
        } else {
            setEditorCheck(true)
            setContent(html)
        }
    }

    // 取消
    const onCancel = () => {
        history.replace('/report')
    }

    // 提交
    const onSubmit = () => {
        form.validateFields().then(values => {
            if (editorCheck && content) {
                dispatch({type: 'report/saveReport', payload: {...values, content}}).then((res: any) => {
                    if (res.err_code === 0) {
                        message.success('提交成功');
                        history.replace('/report')
                    } else {
                        message.warning('提交失败');
                    }
                })
            } else {
                setEditorCheck(false);
            }
        }).catch(() => {
        })
    }

    // 布局
    const layout = {
        labelCol: {span: 3},
        wrapperCol: {span: 16},
    };

    const tailLayout = {
        wrapperCol: {offset: 3, span: 10},
    }

    return (
        <Container>
            <h1 className={styles.title}>写日报</h1>
            <Form {...layout} size={"middle"} form={form}>
                <Form.Item label="标题" name='title' rules={[{required: true}]}>
                    <Input disabled={disabled} className={styles.max240} placeholder="请输入标题" maxLength={40}/>
                </Form.Item>
                <Form.Item label="接收人" name='receiver' rules={[{required: true}]}>
                    <Select disabled={disabled} className={styles.max240} placeholder="请选择接收人">
                        {userList && userList.map((item: any) =>
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label="内容" required>
                    <div className={`${styles.editorWrapper} ${!editorCheck ? styles.warning : ''}`} ref={editorRef}/>
                    <div className={styles.warningText}>{!editorCheck ? '内容不能为空' : ''}</div>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button onClick={onCancel}>取消</Button>
                        {!disabled && <Button loading={loading} type="primary" onClick={onSubmit}>提交</Button>}
                    </Space>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default connect(({report, loading}: any) => ({
    ...report,
    loading: loading.models.report
}))(Index)
