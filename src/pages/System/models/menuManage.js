/* eslint-disable linebreak-style */
import { loadInitData,loadSplitData,loadInitFields } from '../services/menuManage';

export default {
  namespace: 'menuManage',

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
        // pageSize:10,
      },
    },
    dataInfo: {
      fields:[],
      value:{}
    }
  },

  effects: {
    *loadConfigData({payload},{call,put}){
      const response = yield call(loadInitData, payload);
      if (response.code===200){
        yield put({
          type: 'build',
          payload: response.result,
        });
      }
    },
    *loadSplitData({payload},{call,put}){
      const response = yield call(loadSplitData, payload);
      if (response.code===200){
        yield put({
          type: 'split',
          payload: response.result,
        });
      }
    },
    *loadInitFields({payload},{call,put}){
      const response = yield call(loadInitFields, payload);
      if (response.code===200){
        yield put({
          type: 'field',
          payload: response.result,
        });
      }
    },
  },

  reducers: {
    build(state,{payload}){
      return{
        ...state,
        ...payload
      }
    },
    split(state,{payload}){
      return{
        ...state,
        data:payload
      }
    },
    field(state,{payload}){
      return{
        ...state,
        dataInfo:payload,
      }
    },
  },
};
