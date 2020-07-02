import {Effect, Reducer, Subscription} from 'umi'
import * as userService from "../api";

export interface UserModelState {
    userList: any[]
    pageSize: number
    page: number
    total: number
}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        getUserList: Effect;
        addUser: Effect;
        editUser: Effect;
        delUser: Effect;
    };
    reducers: {
        save: Reducer<UserModelState>;
    };
    subscriptions: {
        setup: Subscription
    };
}

const UserModel: UserModelType = {
    namespace: 'user',
    state: {
        pageSize: 10,
        userList: [],
        page: 1,
        total: 0
    },
    effects: {
        * getUserList({payload: {page}}, {call, put, select}) {
            const pageSize = yield select((state: any) => state.user.pageSize);
            const res = yield call(userService.getUserList, {page: page, pageSize});
            if (res.err_code === 0) {
                yield put({type: 'save', payload: {...res.data}});
            }
        },
        * addUser({payload}, {call, put}) {
            // 添加
            return yield call(userService.saveUser, {...payload});
        },
        * editUser({payload}, {call}) {
            return yield call(userService.updateUser, {...payload});
        },
        * delUser({payload}, {call}) {
            return yield call(userService.deleteUser, {...payload});
        }
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/user') {
                    dispatch({
                        type: 'getUserList',
                        payload: {page: 1}
                    })
                }
            })
        }
    }
}

export default UserModel;
