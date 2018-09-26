import { message } from 'antd';
import {loadSplitData,loadButtonSplitData, loadRoleDetail,editRoleData,deleteRoleByIds,loadMenuData } from '../services/funModule';

export default {
  namespace: 'funModule',

  state: {
    list: [],
    pagination: {},
    modalField: {
      btnList: [],
    },

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
    *loadModalData({}, { call, put }) {
      const resBtn = yield call(loadButtonSplitData,{pageIndex: 1,pageSize: 10});
      if(resBtn.code===200){
        yield put({
          type: 'modal',
          btnList: resBtn.result.list,
        });
      }else{
        message.warn(resBtn.message);
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
    *loadFormField({},{call,put}){
      const resMenu = yield call(loadMenuData,{pageIndex: 1,pageSize: 10});
      if(resMenu.code===200){
        yield put({
          type: 'fields',
          payload:resMenu.result.data,
        });
      }else{
        message.warn(resMenu.message);
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
    modal(state, {btnList}) {
      return {
        ...state,
        modalField:{
          btnList:btnList,
        }
      };
    },

    detail(state, {payload}) {
      return {
        ...state,
        formValues:payload.role_info,
        treeMenu:{
          list:state.treeMenu.list,
          checkedids:payload.menu_ids,
        },
        tbModule:{
          list:payload.list_module,
          checkedids:payload.module_ids,
        }
      };
    },
    fields(state, {payload}) {
      return {
        ...state,
        treeMenu:{
          list:payload,
          checkedids:state.treeMenu.checkedids,
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
