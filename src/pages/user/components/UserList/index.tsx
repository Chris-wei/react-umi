import React from 'react'
import {Space, Table,Popconfirm} from 'antd'
import styles from './index.less';


export default ({data, pagination, loading, onEditUser, onDeleteUser}: any) => {
    // 表头
    const columns: any[] = [
        {
            title: '角色',
            key: 'role',
            dataIndex: 'role',
            width: '25%',
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name',
            dataIndex: 'name',
            width: '25%',
            align: 'center'
        },
        {
            title: '用户类型',
            key: 'type',
            width: '25%',
            align: 'center',
            render: (text: any, record: any) => (
                <span>{record.role === 'admin' ? '管理员' : record.role === 'user' ? '普通用户' : '游客'}</span>
            )
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <span className={styles.btn} onClick={() => onEditUser(record)}>编辑</span>
                    <Popconfirm title={'确定要删除该用户？'} onConfirm={()=>onDeleteUser(record)}>
                        <span className={styles.btn}>删除</span>
                    </Popconfirm>
                </Space>
            ),
        },
    ]


    return <Table
        className={styles.userTable}
        bordered={true}
        rowKey={'id'}
        size={'small'}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
    />
}
