/* eslint-disable linebreak-style */
import { loadInitData,loadSplitData } from '../services/tbServices';

export default {
  namespace: 'tbBuild',

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
      },
    },
  },

  effects: {
    *loadConfigData({payload},{call,put}){
      const resConfig = yield call(loadInitData, {bCode:payload.bCode});
      const resData = yield call(loadSplitData, payload);
      if (resConfig.code===200){
        yield put({
          type: 'build',
          config: resConfig.result.config ||[],
          data:resData.result || [],
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
    }
  },

  reducers: {
    build(state,{config,data}){
      return{
        ...state,
        config,
        data
      }
    },
    split(state,{payload}){
      return{
        ...state,
        data:payload
      }
    }
  },
};
