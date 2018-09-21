/* eslint-disable linebreak-style */
import { loadSplitData } from '../services/menuManage';

let columnConfig = [
  {key:"id",title:"编号",dataIndex:"id",sorter:true},
  {key:"parentId",title:"父级编号",dataIndex:"parentId",sorter:true},
  {key:"name",title:"菜单名称",dataIndex:"name",sorter:true},
  {key:"code",title:"菜单编码",dataIndex:"code",sorter:true},
  {key:"path",title:"明细",dataIndex:"path",sorter:true},
  {key:"sort",title:"排序",dataIndex:"sort,sorter:true"},
  {key:"state",title:"状态",dataIndex:"state",sorter:true},
  {key:"createTime",title:"创建时间",dataIndex:"createTime",sorter:true},
  {key:"createUser",title:"创建人",dataIndex:"createUser",sorter:true},
  {key:"lastUpdateTime",title:"最后修改时间",dataIndex:"lastUpdateTime",sorter:true},
  {key:"lastUpdateUser",title:"最后修改人",dataIndex:"lastUpdateUser",sorter:true},
];
let searchConfig = [
  {type:"text",label:"编号",field:"id",row:"half"},
  {type:"text",label:"父级编号",field:"parentId",row:"half"},
  {type:"text",label:"菜单名称",field:"name",row:"half"},
  {type:"text",label:"菜单编码",field:"code",row:"half"},
  {type:"text",label:"明细",field:"path",row:"half"},
  {type:"text",label:"排序",field:"sort",row:"half"},
  {type:"text",label:"状态",field:"state",row:"half"},
  {type:"text",label:"创建时间",field:"createTime",row:"half"},
  {type:"text",label:"创建人",field:"createUser",row:"half"},
  {type:"text",label:"最后修改时间",field:"lastUpdateTime",row:"half"},
  {type:"text",label:"最后修改人",field:"lastUpdateUser",row:"half"},
];
let btnConfig = [
  {btnName:"新增",type:"primary",funCode:"EditMenuDetail",icon:"diff",showType:0,modalCode:"",isModal:true,isNeedSelect:0},
  {btnName:"编辑",type:"primary",funCode:"EditMenuDetail",icon:"edit",showType:0,modalCode:"GetDetail",isModal:true,isNeedSelect:1},
  {btnName:"删除",funCode:"DeleteMenuByIds",icon:"delete",showType:0,isModal:false,isNeedSelect:2},
]
let fields = [
  {type:"treeSelect",label:"父级编号",field:"parentId",required:true,errorMessage:"不能为空",row:"half",disabled:false},
  {type:"text",label:"菜单名称",field:"name",required:true,errorMessage:"不能为空",row:"half",disabled:false},
  {type:"int",label:"菜单编码",field:"code",required:true,errorMessage:"不能为空",row:"half",disabled:false},
  {type:"text",label:"明细",field:"path",required:true,errorMessage:"不能为空",row: "half",disabled:false},
  {type:"text",label:"排序",field:"sort",required:false,errorMessage:"",row: "half",disabled:false},
  {type:"text",label:"状态",field:"state",required:false,errorMessage:"",row: "half",disabled:false},
]

function getField(data) {
  for(let item of data) {
    item["title"] = item.name;
    item["value"] = item.id;
    item["key"] = item.id;
    if(item.children&&item.children.length>0) {
      getField(item.children)
    }
  }
  return data;
}

export default {
  namespace: 'funModule',

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
      title: "菜单配置",
    },  
    dataInfo: {
      fields:[],
      value:{}
    }
  },

  effects: {
    *loadSplitData({path,payload},{call,put}){
      const response = yield call(loadSplitData, payload ,path);
      if (response.code===200){
        yield put({
          type: 'split',
          payload: response.result,
        });
      }
    },
    *loadInitFields({path,payload},{call,put}){
      if(Object.keys(payload).length != 0) {
        const response = yield call(loadSplitData, payload, path);
        if (response.code===200){
          yield put({
            type: 'field',
            payload: response.result,
          });
        }
      }else{
        yield put({
          type: 'field',
          payload: "",
        });
      }
    },

    *buttonFun({path,payload,callBackPayload,callBackPath},{call,put}){
      const response = yield call(loadSplitData, payload, path);
      if (response.code===200){
        const callBackResponse = yield call(loadSplitData, callBackPayload ,callBackPath);
        if (callBackResponse.code===200){
          yield put({
            type: 'split',
            payload: callBackResponse.result,
          });
        }
      }
    },
  },

  reducers: {
    split(state,{payload}){
      return{
        ...state,
        table:{
          config:{
            columnConfig:columnConfig,
            searchConfig:searchConfig,
            btnConfig:btnConfig,
          },
          list:payload,
          title: "菜单配置",
        }
      }
    },
    // options: [{
    //   title: '首页',
    //   value: '0-0',
    //   key: '0-0',
    //   children: [
    //   {
    //     title: '系统管理',
    //     value: '0-0-1',
    //     key: '0-0-1',
    //   }, 
    //   {
    //     title: '自动构建',
    //     value: '0-0-2',
    //     key: '0-0-2',
    //   }],
    // }],
    field(state,{payload}){
      console.log(state)
      let data = state.table.list.data;
      let options = getField(data);
      fields[0].options = options;
      return{
        ...state,
        dataInfo:{
          fields:fields,
          value:payload,
        },
      }
    },
  },
};
