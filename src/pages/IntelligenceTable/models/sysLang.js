import { message } from 'antd';
import { loadSplitData, loadColumnsConfig, loadDetail,editDetail,loadLanguageList } from '../services/langService';

export default {
    namespace: 'sysLang',

    state: {
        columns: [],
        data: {
            list: [],
            pagination: {}
        },
        formValues: {},
        language:[{
            key:'zh_cn',
            title:'中文'
        },
        {
            key:'en',
            title:'英文'
        }]
    },

    effects: {
        *loadConfig({ payload }, { call, put }) {
            const resConfig = yield call(loadColumnsConfig);
            const resData = yield call(loadSplitData, payload);
            if (resConfig.code === 200 && resData.code === 200) {
                yield put({
                    type: 'build',
                    columns: resConfig.result,
                    data: resData.result
                });
            } else {
                message.warn(resConfig.message);
            }
        },
        *loadSplitData({ payload }, { call, put }) {
            const res = yield call(loadSplitData, payload);
            if (res.code === 200) {
                yield put({
                    type: 'split',
                    payload: res.result,
                });
            } else {
                message.warn(res.message);
            }
        },
        *loadDetail({ payload }, { call, put }) {
            const res = yield call(loadDetail, payload);
            const resLanguage = yield call(loadLanguageList, payload);
            if (res.code === 200) {
                yield put({
                    type: 'detail',
                    payload: res.result,
                    language:resLanguage.result
                });
            } else {
                message.warn(res.message);
            }
        },
        *changeLanguage({payload},{put}){
            yield put({
                type: 'change',
                payload
            })
        },
        *editData({ payload }, { call }){
            const res = yield call(editDetail, payload);
            if (res.code === 200) {
                message.success(res.message);
            } else {
                message.warn(res.message);
            }
        }
    },

    reducers: {
        split(state, { payload }) {
            console.info(payload);
            return {
                ...state,
                data:{
                    list: payload.data,
                    pagination: payload.pagination
                }
            };
        },
        build(state, { columns, data }) {
            return {
                ...state,
                columns,
                data: {
                    list: data.data,
                    pagination: data.pagination
                }
            }
        },
        detail(state, { payload,language }) {
            return {
                ...state,
                formValues: {
                    code:payload.code,
                    language:Object.keys(payload.lang_value)[0],
                    value:payload.lang_value[Object.keys(payload.lang_value)[0]],
                    lang_value:payload.lang_value
                },
                language,
            }
        },
        change(state, { payload }) {
            console.info(payload);
            return {
                ...state,
                formValues: {
                    ...state.formValues,
                    language:payload,
                    value:state.formValues.lang_value[payload],
                }
            }
        },
    },
};
