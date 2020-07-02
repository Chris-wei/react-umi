import {Effect, Reducer, Subscription} from 'umi'
import * as reportService from '../api'

export interface ReportModelState {
    userList: any[]
    reportList: any[]
    page: number
    pageSize: number
    total: number
}

export interface ReportModelType {
    namespace: 'report';
    state: ReportModelState;
    effects: {
        getUserList: Effect;
        getReportList: Effect;
        saveReport: Effect;
        getReportDetail: Effect;
        deleteReport: Effect;
    };
    reducers: {
        save: Reducer<ReportModelState>;
    };
    subscriptions: {
        fetchUserList: Subscription
        fetchReportList: Subscription
    };
}

const ReportModel: ReportModelType = {
    namespace: 'report',
    state: {
        userList: [],
        reportList: [],
        page: 1,
        pageSize: 10,
        total: 0
    },
    effects: {
        * getUserList({}, {call, put}) {
            const res = yield call(reportService.getCheckUsers);
            if (res.err_code === 0) {
                yield put({type: 'save', payload: {userList: res.data}})
            }
        },
        * getReportList({payload: {page}}, {call, put, select}) {
            const pageSize = yield select((state: any) => state.report.pageSize);
            const res = yield call(reportService.getReportList, {page, pageSize});
            if (res.err_code === 0) {
                yield put({type: 'save', payload: {...res.data}});
            }
        },
        * saveReport({payload}, {call}) {
            return yield call(reportService.saveReport, payload);
        },
        * getReportDetail({payload}, {call}) {
            return yield call(reportService.getReportDetail, payload)
        },
        * deleteReport({payload}, {call}) {
            return yield call(reportService.deleteReport, payload)
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
        fetchReportList({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/report') {
                    dispatch({
                        type: 'getReportList',
                        payload: {page: 1}
                    })
                }
            })
        },
        fetchUserList({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname.indexOf('/report/write') > -1) {
                    dispatch({
                        type: 'getUserList'
                    })
                }
            })
        }
    }
}

export default ReportModel;
