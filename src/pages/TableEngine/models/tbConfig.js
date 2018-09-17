/* eslint-disable linebreak-style */
import { loadInitData } from '../services/tbServices';

export default {
  namespace: 'tbConfig',

  state: {
    config:{
      columnConfig:[],
      searchConfig:[],
      btnConfig:[],
    },
    data: {
      list: [],
      pagination: {
        total:0,
        current:1,
        size:'small',
        pageSize:10,
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(loadInitData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *loadConfigData({payload},{call,put}){
      const response = yield call(loadInitData, payload);
      if (response.code===200){
        yield put({
          type: 'build',
          payload: response.result,
        });
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    build(state,{payload}){
      return{
        ...state,
        ...payload
      }
    }
  },
};
