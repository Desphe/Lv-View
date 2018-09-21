import { parse } from 'url';

// mock tableListDataSource
let sliderMenus = [];
sliderMenus = [
  {
    name:'app.analysis.search-users',
    path:'/system',
    icon:"dashboard",
    locale:"menu.system",
    children:[
      {
        name:'menu.system.menuManage',
        path:'/system/menuManage',
        icon:"dashboard",
        locale:"menu.system.menuManage",
      },
      {
        name:'menu.system.user',
        path:'/system/user',
        icon:"dashboard",
        locale:"menu.system.user",
      },
      {
        name:'menu.system.role',
        path:'/system/role',
        icon:"dashboard",
        locale:"menu.system.role",
      },
      {
        name:'menu.system.funmodule',
        path:'/system/funmodule',
        icon:"dashboard",
        locale:"menu.system.funmodule",
      },
      {
        name:'menu.system.language',
        path:'/system/language',
        icon:"dashboard",
        locale:"menu.system.language",
      },
    ]
  },
  {
    name:'app.analysis.search-users',
    path:'/build',
    icon:"dashboard",
    locale:"menu.build",
    children:[
      {
        name:'menu.build.listConfig',
        path:'/build/list_build/1',
        icon:"dashboard",
        locale:"menu.build.listBuild",
      },
      {
        name:'menu.dashboard.analysis',
        path:'/build/list_build/dept',
        icon:"dashboard",
        locale:"menu.dashboard.analysis",
      },
      {
        name:'menu.build.listConfig',
        path:'/build/list_config',
        icon:"dashboard",
        locale:"menu.build.listConfig",
      },
      {
        name:'menu.build.dataCompare',
        path:'/build/data_compare',
        icon:"dashboard",
        locale:"menu.build.dataCompare",
      }
    ]
  }
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
