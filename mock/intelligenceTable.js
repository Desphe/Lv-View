import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `通用表格1 ${i}`,
    title: `品牌名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一份通用表格1',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
    aaa: "aaa有"+Math.floor(Math.random() * 100)+"个",
    bbb: "bbb有"+Math.floor(Math.random() * 100)+"个",
    ccc: "ccc有"+Math.floor(Math.random() * 100)+"个",
  });
}

let status = ['关闭', '运行中', '已上线', '异常'];

let columns = [];
columns = [
  {
    title: '通用表格1',
    dataIndex: 'name',
    isEmpty:true,
    width:400,
  },
  {
    title: '品牌',
    dataIndex: 'desc',
    isEmpty:true,
    width:400,
  },
  {
    title: '金额',
    dataIndex: 'callNo',
    isEmpty:true,
    sorter: true,
    align: 'right',
    needTotal: true,
    width:400,
  },
  {
    title: '状态',
    dataIndex: 'status',
    isEmpty:true,
    filters: [
      {
        text: status[0],
        value: 0,
      },
      {
        text: status[1],
        value: 1,
      },
      {
        text: status[2],
        value: 2,
      },
      {
        text: status[3],
        value: 3,
      },
    ],
    width:400,
  },
  {
    title: '上次调度时间',
    dataIndex: 'updatedAt',
    isEmpty:true,
    sorter: true,
    width:400,
  },
  {
    title: 'aaa',
    dataIndex: 'aaa',
    sorter: true,
    align: 'right',
    width:400,
  },
  {
    title: 'bbb',
    dataIndex: 'bbb',
    sorter: true,
    align: 'right',
    width:400,
  },
  {
    title: 'ccc',
    dataIndex: 'ccc',
    sorter: true,
    align: 'right',
    width:400,
  },
];

let btnConfig = [];
btnConfig = [
  { btnName:"新增", funCode:"001", icon:"plus", type:"primary" },
  { btnName:"修改", funCode:"002", icon:"edit", type:"primary" },
  { btnName:"删除", funCode:"003", type:"danger" },
];

function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    btnConfig: btnConfig,
    columns: columns,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  if(params.route == "currencyTable1") {
    return res.json(result);
  }else{
    return res.json(result);
  }
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
  'GET /currencyTable/intelligenceTable': getRule,
  'POST /currencyTable/currencyTable1': postRule,
};
