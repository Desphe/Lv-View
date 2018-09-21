import { message } from 'antd';
import {loadSplitData,loadRoleDetail,editRoleData,deleteRoleByIds } from '../services/roleService';

export default {
  namespace: 'sysRole',

  state: {
    list: [],
    pagination: {},
    formValues:{},
    treeMenu:{
      list:[],
      checkedids:[]
    },
    tbModule:{
      list:[],
      checkedids:[]
    },
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
    *loadData({payload},{call,put}){
      const resRole = yield call(loadRoleDetail,payload);
      if(resRole.code===200){
        yield put({
          type: 'detail',
          payload:resRole.result
        });
      }else{
        message.warn(resRole.message);
      }
    },
    *checkTreeMenu({payload},{put}){
      yield put({
        type:'checkedTree',
        payload
      })
    },
    *checkTbRow({payload},{put}){
      yield put({
        type:'checkedRow',
        payload
      })
    },
    *editData({payload},{call}){
      const res = yield call(editRoleData,payload);
      if(res.code===200){
        message.success(res.message);
      }else{
        message.warn(res.message);
      }
    },
    *deleteRoleByIds({payload},{call}){
      const res = yield call(deleteRoleByIds,payload);
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
    detail(state, {payload}) {
      return {
        ...state,
        formValues:payload.role_info,
        treeMenu:{
          list:payload.tree_menu,
          checkedids:payload.menu_ids,
        },
        tbModule:{
          list:payload.list_module,
          checkedids:payload.module_ids,
        }
      };
    },
    checkedTree(state, {payload}) {
      return {
        ...state,
        treeMenu:{
          list:state.treeMenu.list,
          checkedids:payload
        }
      };
    },
    checkedRow(state, {payload}) {
      return {
        ...state,
        tbModule:{
          list:state.tbModule.list,
          checkedids:payload
        }
      };
    },
  },
};
