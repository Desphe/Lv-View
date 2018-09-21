import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
let tableList = [];
for (let i = 0; i < 46; i += 1) {
  tableList.push({
    id: i,
    tableKey: i,
    name: `name_${i}`,
    ResCode: `ResCode_${i}`,
    addBtn: `addBtn_${i}`,
    editBtn: `editBtn_${i}`,
    delBtn: `delBtn_${i}`,
    sortCondition: `sortCondition_${i}`,
    type: `type_${i}`,
    sort: `sort_${i}`,
    remark: `remark_${i}`,
  });
}
tableListDataSource = {
  code:200,
  result:{
    config:{
      columnConfig:[
        {key:"id",title:"编号",dataIndex:"id",required:false,errorMessage:"",editable:false},
        {key:"tableKey",title:"表编号",dataIndex:"tableKey",sorter:true,required:true,errorMessage:"",editable:true},
        {key:"name",title:"模块名称",dataIndex:"name",sorter:true,required:true,errorMessage:"",editable:true},
        {key:"ResCode",title:"资源索引",dataIndex:"ResCode",sorter:true,required:false,errorMessage:"",editable:true},
        {key:"addBtn",title:"新增按钮",dataIndex:"addBtn",required:false,errorMessage:"",editable:true},
        {key:"editBtn",title:"编辑按钮",dataIndex:"editBtn",required:false,errorMessage:"",editable:true},
        {key:"delBtn",title:"删除按钮",dataIndex:"delBtn",required:false,errorMessage:"",editable:true},
        {key:"sortCondition",title:"过滤条件",dataIndex:"sortCondition",sorter:true,required:false,errorMessage:"",editable:true},
        {key:"type",title:"模块类型",dataIndex:"type",required:false,errorMessage:"",editable:true},
        {key:"sort",title:"排序",dataIndex:"sort",required:false,errorMessage:"",editable:true},
        {key:"remark",title:"备注",dataIndex:"remark",required:false,errorMessage:"",editable:true},
      ],
      searchConfig:[
        {type:"text",label:"编号",field:"id",required:false,errorMessage:"",row:"half",disabled:false},
        {type:"text",label:"标题",field:"name",required:true,errorMessage:"不能为空",row:"half",disabled:false},
        {type:"text",label:"资源索引",field:"ResCode",required:true,errorMessage:"不能为空",row:"half",disabled:false},
      ],
      btnConfig:[
        {btnName:"新增",type:"primary",funCode:"add",icon:"diff",showType:0,modalCode:"get",isModal:true,isNeedSelect:0},
        {btnName:"编辑",type:"primary",funCode:"edit",icon:"edit",showType:0,modalCode:"get",isModal:true,isNeedSelect:1},
        {btnName:"删除",funCode:"delete",icon:"delete",showType:0,modalCode:"get",isModal:false,isNeedSelect:2},
        {btnName:"列权限配置",funCode:"save",showType:1,isModal:true,isNeedSelect:"tableKey",modalCode:"getRows"},
      ]
    },
    list:{
      data:tableList,
      pagination:{size:"small",total:350,pageSize:10,current:1},
      tableKey:"1",
    },
    title:"功能模块配置",
  },
};

let fieldSList = {};

function getList(req, res, u) {
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
    result:[
      {
        fields:[
          {"type":"int","label":"编号","field":"id","required":false,"errorMessage":"","row":"half","disabled":false},
          {"type":"int","label":"表编号","field":"tableKey","required":false,"errorMessage":"","row":"half","disabled":false},
          {"type":"text","label":"模块名称","field":"name","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
          {"type":"text","label":"资源索引","field":"ResCode","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
          {"type":"text","label":"过滤条件","field":"sortCondition","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
          {"type":"text","label":"模块类型","field":"type","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
          {"type":"int","label":"排序","field":"sort","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
          {"type":"textarea","label":"备注","field":"remark","required":true,"errorMessage":"不能为空","row":"half","disabled":false},
        ],
        tabName:"模块配置",
      },
      {
        fields:[
          {"type":"text","label":"按钮名称","field":"type","required":false,"errorMessage":"","row":"half","disabled":false},
          {"type":"checkbox","label":"","field":"addBtn","required":false,"errorMessage":"","row":"half","disabled":false,initValue: [1],
            options: [
              {text: "是否打开弹窗", value: 1}, 
              {text: "是否选择数据", value: 2}, 
              {text: "是否保存", value: 3}, 
            ]
          },
        ],
        tabName:"按钮配置",
      }
    ]
  };

  let dataSource = [];
  dataSource = fieldSList;
  if(key) {
    dataSource["result"].value = {
      id: 2,
      tableKey: 3,
      name: `name_1`,
      ResCode: `ResCode_1`,
      addBtn: `0`,
      editBtn: `0`,
      delBtn: `0`,
      sortCondition: `sortCondition_1`,
      type: `type_1`,
      sort: `sort_1`,
      remark: `remark_1`,
    };
  }
  return res.json(dataSource);
}

function getRows(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const key = params.key;
  fieldSList = {};
  if(key) {
    fieldSList = {
      code:200,
      result:[
        {
          config:{
            columnConfig:[
              {"key":"table","title":"列表页面显示","dataIndex":"table"}
            ],
          },
          data:{
            list:[
              {table:"编号"},{table:"表编号"},{table:"模块名称"},{table:"资源索引"},{table:"新增按钮"},{table:"编辑按钮"},{table:"删除按钮"},{table:"过滤条件"},{table:"模块类型"},{table:"排序"},{table:"备注"},
            ],
          },
        },
        {
          config:{
            columnConfig:[
              {"key":"edit","title":"编辑页面显示","dataIndex":"edit"},
            ],
          },
          data:{
            list:[
              {edit:"编号"},{edit:"表编号"},{edit:"模块名称"},{edit:"资源索引"},{edit:"新增按钮"},{edit:"编辑按钮"},{edit:"删除按钮"},{edit:"过滤条件"},{edit:"模块类型"},{edit:"排序"},{edit:"备注"},
            ],
          },
        },
        {
          config:{
            columnConfig:[
              {"key":"filter","title":"筛选功能","dataIndex":"filter"},
            ],
          },
          data:{
            list:[
              {filter:"编号"},{filter:"表编号"},{filter:"模块名称"},{filter:"资源索引"},{filter:"新增按钮"},{filter:"编辑按钮"},{filter:"删除按钮"},{filter:"过滤条件"},{filter:"模块类型"},{filter:"排序"},{filter:"备注"},
            ],
          },
        },
        {
          config:{
            columnConfig:[
              {"key":"readonly","title":"只读","dataIndex":"readonly"},
            ],
          },
          data:{
            list:[
              {readonly:"编号"},{readonly:"表编号"},{readonly:"模块名称"},{readonly:"资源索引"},{readonly:"新增按钮"},{readonly:"编辑按钮"},{readonly:"删除按钮"},{readonly:"过滤条件"},{readonly:"模块类型"},{readonly:"排序"},{readonly:"备注"},
            ],
          },
        }
      ]
    };
  }
  return res.json(fieldSList); 
}

function postApi(req, res, u, b) {
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
  'GET /system/funModule/list': getList,
  'GET /system/funModule/get': getFieldsAdd,
  'GET /system/funModule/getRows': getRows,
  'POST /system/funModule': postApi,
};
