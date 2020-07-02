import {Effect, Reducer} from 'umi'
import * as loginService from "../api";

export interface LoginModelState {
    userInfo: {}
}

export interface LoginModelType {
    namespace: 'login';
    state: LoginModelState;
    effects: {
        userLogin: Effect;
    };
    reducers: {
        save: Reducer<LoginModelState>;
    };
}

const LoginModel: LoginModelType = {
    namespace: 'login',
    state: {
        userInfo: {}
    },
    effects: {
        * userLogin({payload}, {call}) {
            return yield call(loginService.login, payload)
        }
    },
    reducers: {
        save(state, action) {
            return {
                state,
                ...action.payload
            }
        }
    }
}

export default LoginModel;
