/* eslint-disable linebreak-style */
import { loadFormConfig,loadFormData,deleteFormData,UpdateFormData } from '../services/formService';
import { message } from 'antd';

export default {
  namespace: 'formBuild',

  state: {
    config:[],
    data: {},
  },

  effects: {
    *loadConfigData({payload},{call,put}){
      const response = yield call(loadFormConfig, payload);
      const responseData = yield call(loadFormData, payload);
      if (response.code===200 && responseData.code===200){
        yield put({
          type: 'build',
          payload: response.result,
          initData:responseData.result,
        });
      }
    },
    *update({payload},{call}){
      const response = yield call(UpdateFormData, payload);
      if (response.code===200){
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *delete({payload},{call}){
      const response = yield call(deleteFormData, payload);
      if (response.code===200){
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    }
  },

  reducers: {
    build(state,{payload,initData}){
      return{
        ...state,
        config:payload,
        data:initData,
      }
    },
  },
};
