export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      // newPage
      {
        name: 'newPage',
        icon: 'copy',
        path: '/newPage',
        routes: [
          // exception
          { 
            path: '/', 
            redirect: '/newPage/newPage1' 
          },
          { 
            path: '/newPage', 
            redirect: '/newPage/newPage1' 
          },
          {
            path: '/newPage/newPage1',
            name: 'newPage1',
            component: './NewPage/NewPage1',
          },
        ],
      },
      {
        name: 'currencyTable',
        icon: 'table',
        path: '/currencyTable',
        routes: [
          // exception
          { 
            path: '/currencyTable', 
            redirect: '/currencyTable/currencyTable1' 
          },
          {
            path: '/currencyTable/currencyTable1',
            name: 'currencyTable1',
            component: './CurrencyTable/CurrencyTable1',
          },
        ],
      },
      {
        name: 'basicConfiguration',
        icon: 'schedule',
        path: '/basicConfiguration',
        routes: [
          // exception
          { 
            path: '/basicConfiguration', 
            redirect: '/basicConfiguration/listConfiguration' 
          },
          {
            path: '/basicConfiguration/listConfiguration',
            name: 'listConfiguration',
            component: './BasicConfiguration/ListConfiguration',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
