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
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // // newPage
      // {
      //   name: 'newPage',
      //   icon: 'copy',
      //   path: '/newPage',
      //   routes: [
      //     // exception
      //     { 
      //       path: '/', 
      //       redirect: '/newPage/newPage1' 
      //     },
      //     { 
      //       path: '/newPage', 
      //       redirect: '/newPage/newPage1' 
      //     },
      //     {
      //       path: '/newPage/newPage1',
      //       name: 'newPage1',
      //       component: './NewPage/NewPage1',
      //     },
      //   ],
      // },
      // {
      //   name: 'currencyTable',
      //   icon: 'table',
      //   path: '/currencyTable',
      //   routes: [
      //     // exception
      //     {
      //       path: '/currencyTable', 
      //       redirect: '/currencyTable/currencyTable1' 
      //     },
      //     {
      //       path: '/currencyTable/currencyTable1',
      //       name: '通用模块1',
      //       component: './CurrencyTable/IntelligenceTable',
      //     },
      //     {
      //       path: '/currencyTable/currencyTable2',
      //       name: '通用模块2',
      //       component: './CurrencyTable/IntelligenceTable',
      //     },
      //   ],
      // },
      // {
      //   name: 'basicConfiguration',
      //   icon: 'schedule',
      //   path: '/basicConfiguration',
      //   routes: [
      //     // exception
      //     { 
      //       path: '/basicConfiguration', 
      //       redirect: '/basicConfiguration/listConfiguration' 
      //     },
      //     {
      //       path: '/basicConfiguration/listConfiguration',
      //       name: 'listConfiguration',
      //       component: './BasicConfiguration/ListConfiguration',
      //     },
      //   ],
      // },
      {
        name: 'userMessage',
        icon: 'table',
        path: '/userMessage',
        routes: [
          // exception
          {
            path: '/userMessage', 
            redirect: '/userMessage/userMessage' 
          },
          {
            path: '/userMessage/userMessage',
            name: 'userMessage',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/userMessage/roleMessage',
            name: 'roleMessage',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/userMessage/authorityMessage',
            name: 'authorityMessage',
            component: './CurrencyTable/IntelligenceTable',
          },
        ],
      },
      {
        name: 'systemMessage',
        icon: 'table',
        path: '/systemMessage',
        routes: [
          // exception
          {
            path: '/systemMessage', 
            redirect: '/systemMessage/systemSetup', 
          },
          {
            path: '/systemMessage/systemSetup',
            name: 'systemSetup',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/systemMessage/logMessage',
            name: 'logMessage',
            component: './CurrencyTable/IntelligenceTable',
          },
        ],
      },
      {
        name: 'dataMessage',
        icon: 'table',
        path: '/dataMessage',
        routes: [
          // exception
          {
            path: '/dataMessage', 
            redirect: '/dataMessage/institutionMessage', 
          },
          {
            path: '/dataMessage/institutionMessage',
            name: 'institutionMessage',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/customerData',
            name: 'customerData',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/channelData',
            name: 'channelData',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/customerAccount',
            name: 'customerAccount',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/customer',
            name: 'customer',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/brand',
            name: 'brand',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/OverduePayment',
            name: 'OverduePayment',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/SalesArea',
            name: 'SalesArea',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/dataMessage/CustomerContract',
            name: 'CustomerContract',
            component: './CurrencyTable/IntelligenceTable',
          },
        ],
      },
      {
        name: 'creditControlMessage',
        icon: 'table',
        path: '/creditControlMessage',
        routes: [
          // exception
          {
            path: '/creditControlMessage', 
            redirect: '/creditControlMessage/functionalConfig', 
          },
          {
            path: '/creditControlMessage/functionalConfig',
            name: 'functionalConfig',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/dataInitialization',
            name: 'dataInitialization',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/salesAccountData',
            name: 'salesAccountData',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/salesInvoiceData',
            name: 'salesInvoiceData',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/salesComparison',
            name: 'salesComparison',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/bankReceiptsData',
            name: 'bankReceiptsData',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/receivablesComparison',
            name: 'receivablesComparison',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/generatingVoucher',
            name: 'generatingVoucher',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/salesOverdueOrder',
            name: 'salesOverdueOrder',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/salesNotInvoiced',
            name: 'salesNotInvoiced',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/bankReceipts',
            name: 'bankReceipts',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/accountsCollection',
            name: 'accountsCollection',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/accountsAge',
            name: 'accountsAge',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/accountsAgeAnalysis',
            name: 'accountsAgeAnalysis',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/accountsTurnoverDays',
            name: 'accountsTurnoverDays',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/commodityMarginReminder',
            name: 'commodityMarginReminder',
            component: './CurrencyTable/IntelligenceTable',
          },
          {
            path: '/creditControlMessage/contractRenewalReminder',
            name: 'contractRenewalReminder',
            component: './CurrencyTable/IntelligenceTable',
          },
        ],
      },
      {
        name: 'advancePaymentManagement',
        icon: 'table',
        path: '/advancePaymentManagement',
        component: './CurrencyTable/IntelligenceTable',
      },
      {
        component: '404',
      },
    ],
  },
];