import { parse } from 'url';

// mock tableListDataSource
let sliderMenus = [];
sliderMenus = [
  {
    name: 'currencyTable',
    icon: 'table',
    path: '/currencyTable',
    routes: [
      // exception
      { 
        path: '/currencyTable', 
        redirect: '/currencyTable/currencyTable1',
      },
      {
        path: '/currencyTable/currencyTable1',
        name: '通用模块1',
        component: '../CurrencyTable/IntelligenceTable',
      },
      {
        path: '/currencyTable/currencyTable2',
        name: '通用模块2',
        component: '../CurrencyTable/IntelligenceTable',
      },
    ],
  },
  // {
  //   name: 'configurationPage',
  //   icon: 'table',
  //   path: '/configurationPage',
  //   routes: [
  //     // exception
  //     { 
  //       path: '/configurationPage', 
  //       redirect: '/configurationPage/configurationPage1',
  //     },
  //     {
  //       path: '/configurationPage/configurationPage1',
  //       name: '第一个配置出来的页面',
  //       component: './CurrencyTable/IntelligenceTable',
  //     },
  //   ],
  // },
];

function getApi(req, res, u) {


  const result = {
    sliderMenus:sliderMenus,
  };

  return res.json(result);
}

export default {
  'GET /sliderMenu/sliderMenus': getApi,
};
