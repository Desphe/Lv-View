import { message } from 'antd';
import {loadSplitData,loadUserDetail,loadUserDept,editUserData,changeUserStateByIds,loadRoleData} from '../services/userService';

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
      const resUser = yield call(loadUserDetail,payload);
      const resDept = yield call(loadUserDept,payload);
      if(resUser.code===200 && resDept.code===200){
        yield put({
          type: 'userinfo',
          targets: resUser.result.role,
          uData:resUser.result.user,
          dept:resDept.result
        });
      }else{
        message.warn(resRole.message);
      }
    },
    *loadRoleData({}, { call, put }) {
      const res = yield call(loadRoleData,{pageIndex: 1, pageSize: 0});
      if(res.code===200){
        yield put({
          type: 'changeRole',
          list: res.result.data,
        });
      }else{
        message.warn(res.message);
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
    userinfo(state, {targets,uData,dept}){
      return {
        ...state,
        role:{
          list:state.role.list,
          targets:targets,
        },
        dept,
        formValues:uData
      };
    },
    changeRole(state, {list,targets}){
      return {
        ...state,
        role:{
          list:list,
          targets
        }
      };
    }
  },
};
