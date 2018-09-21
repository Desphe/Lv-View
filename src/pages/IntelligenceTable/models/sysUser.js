import { message } from 'antd';
import {loadSplitData,loadUserRole,loadUserDataById,loadUserDept,editUserData,changeUserStateByIds} from '../services/userService';

export default {
  namespace: 'sysUser',

  state: {
    list: [],
    pagination: {},
    formValues:{},
    role:{
      list:[],
      targets:[]
    },
    dept:[]
  },

  effects: {
    *loadSplitData({payload}, { call, put }) {
      const res = yield call(loadSplitData,payload);
      if(res.code===200){
        yield put({
          type: 'split',
          payload: res.result,
        });
      }else{
        message.warn(res.message);
      }
    },
    *LoadUserData({payload},{call,put}){
      const resRole = yield call(loadUserRole,payload);
      const resDept = yield call(loadUserDept,payload);
      console.info('获取用户信息',payload);
      console.info('获取用户信息',payload);
      if(resRole.code===200 && resDept.code===200){
        if(payload.id>0){
          const resData = yield call(loadUserDataById,payload);
          if(resData.code===200){
            yield put({
              type: 'userinfo',
              role: resRole.result,
              uData:resData.result,
              dept:resDept.result
            });
          }else{
            message.warn(resData.message);
          }
        }else{
          yield put({
            type: 'userinfo',
            role: resRole.result,
            uData:{},
            dept:resDept.result
          });
        }
      }else{
        message.warn(resRole.message);
      }
    },
    *changeRoleTransfer({payload},{put}){
      yield put({
        type: 'changeRole',
        targets: payload,
      })
    },
    *editUserData({payload},{call}){
      const res = yield call(editUserData,payload);
      if(res.code===200){
        message.success(res.message);
      }else{
        message.warn(res.message);
      }
    },
    *changeUserStateByIds({payload},{call}){
      const res = yield call(changeUserStateByIds,payload);
      if(res.code===200){
        message.success(res.message);
      }else{
        message.warn(res.message);
      }
    }
  },

  reducers: {
    split(state, {payload}) {
      return {
        ...state,
        list: payload.data,
        pagination:payload.pagination
      };
    },
    userinfo(state, {role,uData,dept}){
      return {
        ...state,
        role,
        dept,
        formValues:uData
      };
    },
    changeRole(state, {targets}){
      return {
        ...state,
        role:{
          list:state.role.list,
          targets
        }
      };
    }
  },
};
