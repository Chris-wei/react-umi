import React, {useRef} from 'react';
import {Button, message, Modal} from 'antd';
import {connect} from 'dva';
import Container from '@/components/Container';
import UserList from './components/UserList';
import UserModal from './components/UserModal';

const Index = ({userList, page, total, loading, dispatch}: any) => {
    const userModalRef: any = useRef();

    // 显示弹窗
    const showUserModal = () => {
        userModalRef.current.onShowModal()
    }

    // 编辑用户
    const onEdit = (record: any) => {
        userModalRef.current.onShowModal(record)
    }

    // 添加用户
    const onOk = (data: any, id?: number) => {
        if (!id) {
            dispatch({type: 'user/addUser', payload: data}).then((res: any) => {
                if (res.err_code === 0) {
                    message.success('添加成功');
                    dispatch({type: 'user/getUserList', payload: {page: 1}})
                    userModalRef.current.onCancel();
                }
            })
        } else {
            dispatch({type: 'user/editUser', payload: {id, ...data}}).then((res: any) => {
                if (res.err_code === 0) {
                    message.success('编辑成功');
                    dispatch({type: 'user/getUserList', payload: {page: page}})
                    userModalRef.current.onCancel();
                }else{
                    message.warning(res.msg);
                }
            })
        }
    }

    // 删除用户
    const onDeleteUser = (record: any) => {
        dispatch({type: 'user/delUser', payload: {id:record.id}}).then((res: any) => {
            if (res.err_code === 0) {
                message.success('删除成功');
                dispatch({type: 'user/getUserList', payload: {page: 1}})
                userModalRef.current.onCancel();
                close()
            }else{
                message.warning(res.msg);
            }
        })
    }

    // 分页
    const onPageChange = (pageNo: number) => {
        if (pageNo !== page) {
            dispatch({type: 'user/getUserList', payload: {page: pageNo}})
        }
    }

    return (
        <Container>
            <Button type={"primary"} size={"middle"} onClick={showUserModal}>添加用户</Button>
            <UserList
                data={userList}
                loading={loading}
                pagination={{
                    current: page,
                    total: total,
                    onChange: onPageChange
                }}
                onEditUser={onEdit}
                onDeleteUser={onDeleteUser}
            />
            <UserModal cRef={userModalRef} onOk={onOk} loading={loading}/>
        </Container>
    )
}

//@ts-ignore
export default connect(({user, loading}) => ({
    ...user,
    loading: loading.models.user
}))(Index)
