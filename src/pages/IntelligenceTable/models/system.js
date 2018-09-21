/* eslint-disable linebreak-style */
import { loadInitData,loadSplitData,loadInitFields } from '../services/system';

export default {
  namespace: 'system',

  state: {
    table:{
      config:{
        columnConfig:[],
        searchConfig:[],
        btnConfig:[],
      },
      list: {
        data: [],
        pagination: {
          total:0,
          current:1,
          size:'small',
          // pageSize:10,
        },
      },
      title: "",
    },
    dataInfo: {
      fields:[],
      value:{}
    }
  },

  effects: {
    *loadConfigData({payload,path},{call,put}){
      const response = yield call(loadInitData, payload, path);
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
    *loadInitFields({payload,path},{call,put}){
      const response = yield call(loadInitFields, payload, path);
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
        table:payload,
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
