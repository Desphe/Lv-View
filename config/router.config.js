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
      // dashboard
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
        component: '404',
      },
    ],
  },
];
