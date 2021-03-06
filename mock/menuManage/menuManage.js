import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
tableListDataSource = {
  code:200,
  result:[{
    config:{
      columnConfig:[
        {key:"key",title:"编号",dataIndex:"key"},
        {key:"title",title:"菜单名称",dataIndex:"title",sorter:true},
        {key:"code",title:"菜单编码",dataIndex:"code",sorter:true},
        {key:"type",title:"菜单类型",dataIndex:"type"},
        {key:"ResCode",title:"资源索引",dataIndex:"ResCode",sorter:true},
      ],
      searchConfig:[
        {type:"text",label:"编号",field:"key",required:false,errorMessage:"",row:"half",disabled:false},
        {type:"text",label:"菜单名称",field:"title",required:true,errorMessage:"不能为空",row:"half",disabled:false},
        {type:"text",label:"资源索引",field:"ResCode",required:true,errorMessage:"不能为空",row:"half",disabled:false},
      ],
      btnConfig:[
        {btnName:"新增",type:"primary",funCode:"add",icon:"diff",showType:0,modalCode:"get",isModal:true,isNeedSelect:false},
        {btnName:"编辑",type:"primary",funCode:"edit",icon:"edit",showType:0,modalCode:"get",isModal:true,isNeedSelect:true},
        {btnName:"删除",funCode:"delete",icon:"delete",showType:0,modalCode:"get",isModal:false,isNeedSelect:true},
      ]
    },
    data:{
      list:[
        {key:"1",title:"菜单名称_1",code:"1",ResCode:11,type:"类型1号",
        children: [
          {key: 11,title: '菜单名称_11',code:"1",ResCode: 42,type: '类型11号',}, 
          {key: 12,title: '菜单名称_12',code:"1",ResCode: 30,type: '类型12号',
          children: [
            {key: 121,title: '菜单名称_121',code:"1",ResCode: 16,type: '类型121号',}
          ]},
        ]},
        {key:"2",title:"菜单名称_2",code:"1",ResCode:12,type:"类型2号"},
        {key:"3",title:"菜单名称_3",code:"1",ResCode:13,type:"类型3号"},
        {key:"4",title:"菜单名称_4",code:"1",ResCode:14,type:"类型4号"},
        {key:"5",title:"菜单名称_5",code:"1",ResCode:15,type:"类型5号"},
        {key:"6",title:"菜单名称_6",code:"1",ResCode:16,type:"类型6号"},
        {key:"7",title:"菜单名称_7",code:"1",ResCode:17,type:"类型7号"},
        {key:"8",title:"菜单名称_8",code:"1",ResCode:18,type:"类型8号"},
        {key:"9",title:"菜单名称_9",code:"1",ResCode:19,type:"类型9号"},
        {key:"10",title:"菜单名称_10",code:"1",ResCode:20,type:"类型10号"}
      ],
      pagination:{size:"small",total:350,pageSize:10,current:1},
    },
    title:"菜单配置",
  }],
};

let fieldSList = {};
fieldSList = {
  code:200,
  result:{
    fields:[
      {"type":"text","label":"编号","field":"key","required":false,"errorMessage":"","row":"half","disabled":false},
      {"type":"text","label":"标题","field":"name","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
      {"type":"int","label":"资源索引","field":"ResCode","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
      {type:"select",label:"类型",field:"type",required:true,errorMessage:"不能为空",row: "half",disabled:false,initValue: "3",
        options: [
          {text: "文件夹", value: "4"}, 
          {text: "功能", value: "2"}, 
          {text: "超链接", value: "3"},
          {text: "查询", value: "1"},
        ]
      },
      {"type":"text","label":"明细","field":"Detail","required":false,"errorMessage":"","row":"half","disabled":false},
      {"type":"select","label":"层","field":"_Lv","required":true,"errorMessage":"不能为空","row":"half","disabled":false,initValue: "1",
        options: [
          {text: "顶部导航", value: "3"}, 
          {text: "文件夹", value: "2"}, 
          {text: "功能菜单", value: "1"},
        ]
      },
      {"type":"select","label":"父节点","field":"Pid","required":true,"errorMessage":"不能为空","row":"half","disabled":false,initValue: "1",
        options: [{
          title: '首页',
          value: '0-0',
          key: '0-0',
          children: [
          {
            title: '系统管理',
            value: '0-0-1',
            key: '0-0-1',
          }, 
          {
            title: '自动构建',
            value: '0-0-2',
            key: '0-0-2',
          }],
        }],
      },
      {"type":"text","label":"排序","field":"sortId","required":false,"errorMessage":"","row":"half","disabled":false},
      {"type":"select","label":"显示/隐藏","field":"IsNoShow","required":true,"errorMessage":"不能为空","row":"half","disabled":false,initValue: "1",
        options: [
          {text: "显示", value: "1"},
          {text: "隐藏", value: "2"},
        ]
      },
    ]
  }
};

function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  // if (params.sorter) {
  //   const s = params.sorter.split('_');
  //   dataSource = dataSource.sort((prev, next) => {
  //     if (s[1] === 'descend') {
  //       return next[s[0]] - prev[s[0]];
  //     }
  //     return prev[s[0]] - next[s[0]];
  //   });
  // }

  // if (params.status) {
  //   const status = params.status.split(',');
  //   let filterDataSource = [];
  //   status.forEach(s => {
  //     filterDataSource = filterDataSource.concat(
  //       dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
  //     );
  //   });
  //   dataSource = filterDataSource;
  // }

  // if (params.name) {
  //   dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  // }

  // let pageSize = 10;
  // if (params.pageSize) {
  //   pageSize = params.pageSize * 1;
  // }

  const result = tableListDataSource;
  return res.json(tableListDataSource);
}

function getFieldsAdd(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const key = params.key;

  fieldSList = {};
  fieldSList = {
    code:200,
    result:{
      fields:[
        {"type":"text","label":"编号","field":"key","required":false,"errorMessage":"","row":"half","disabled":false},
        {"type":"text","label":"标题","field":"name","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
        {"type":"int","label":"资源索引","field":"ResCode","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
        {type:"select",label:"类型",field:"type",required:true,errorMessage:"不能为空",row: "half",disabled:false,initValue: "3",
          options: [
            {text: "文件夹", value: "4"}, 
            {text: "功能", value: "2"}, 
            {text: "超链接", value: "3"},
            {text: "查询", value: "1"},
          ]
        },
        {"type":"text","label":"明细","field":"Detail","required":false,"errorMessage":"","row":"half","disabled":false},
        {"type":"select","label":"层","field":"_Lv","required":true,"errorMessage":"不能为空","row":"half","disabled":false,initValue: "1",
          options: [
            {text: "顶部导航", value: "3"}, 
            {text: "文件夹", value: "2"}, 
            {text: "功能菜单", value: "1"},
          ]
        },
        {"type":"treeSelect","label":"父节点","field":"Pid","required":true,"errorMessage":"不能为空","row":"half","disabled":false,initValue: "0",
          options: [{
            title: '首页1',
            value: '0',
            key: '0',
            children: [
            {
              title: '系统管理',
              value: '0-1',
              key: '0-1',
              children: [
              {
                title: '系统管理2',
                value: '0-1-0',
                key: '0-1-0',
              }],
            }, 
            {
              title: '自动构建',
              value: '0-2',
              key: '0-2',
            }],
          },{
            title: '首页2',
            value: '1',
            key: '1',
          }],
        },
        {"type":"text","label":"排序","field":"sortId","required":false,"errorMessage":"","row":"half","disabled":false},
        {"type":"select","label":"显示/隐藏","field":"IsNoShow","required":true,"errorMessage":"不能为空","row":"half","disabled":false,initValue: "1",
          options: [
            {text: "显示", value: "1"},
            {text: "隐藏", value: "2"},
          ]
        },
      ]
    }
  };

  let dataSource = [];
  dataSource = fieldSList;
  if(key) {
    dataSource["result"].value = {"key":"2","name":"_yanjc_2","ResCode":12,"type":"类型2号",Detail:"hello",_Lv:"功能菜单",Pid:"首页",sortId:"qwe",IsNoShow:"显示"};
  }
  return res.json(dataSource);
}

function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  if(method == "getInfo") {
    var getInfoList = tableListDataSource.filter(item => key.indexOf(item.key) != -1);
    var result = {
      list: tableListDataSource,
      btnConfig: btnConfig,
      columns: columns,
      pagination: {
        total: tableListDataSource.length,
      },
      info: getInfoList,
    };
  }else{
    var result = {
      list: tableListDataSource,
      btnConfig: btnConfig,
      columns: columns,
      pagination: {
        total: tableListDataSource.length,
      },
    };
  }

  return res.json(result);
}

export default {
  'GET /system/menuManage/list': getRule,
  'GET /system/menuManage/get': getFieldsAdd,
  'POST /system/menuManage': postRule,
};
