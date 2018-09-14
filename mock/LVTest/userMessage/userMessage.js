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
    name: `姓名 ${i}`,
    idcard: `身份证 ${i}`,
    callNo: Math.floor(Math.random() * 1000),
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

let columns = [];
columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    isEmpty:true,
  },
  {
    title: '身份证',
    dataIndex: 'idcard',
    isEmpty:true,
  },
  {
    title: '年龄',
    dataIndex: 'callNo',
    isEmpty:true,
    sorter: true,
  },
  {
    title: '生日',
    dataIndex: 'updatedAt',
    isEmpty:true,
    sorter: true,
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
    title: "用户管理",
  };

  return res.json(result);
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
        ...body,
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, body);
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  if(method == "getInfo") {
    var getInfoList = tableListDataSource[tableListDataSource.indexOf(key)];
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
  'GET /userMessage/userMessage': getRule,
  'POST /userMessage/userMessage': postRule,
};
