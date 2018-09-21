import { stringify } from 'qs';
import request from '@/utils/request';
import apiUrl from '@/utils/apiUrl';

export async function loadSplitData(params){
    console.info('加载用户数据参数：',params);
    return request(apiUrl.systemManage.loadUserSplitData,{
        method: 'POST',
        body: params,
    });
    
    /* return {
        code:200,
        message:'',
        result:{
            list:[
                {
                    key:1,
                    id:1,
                    login_name:'yanjc',
                    user_name:'燕俊丞',
                    state:'1',
                    create_time:'2018-09-17 11:21:00',
                    create_user:'admin'
                },
                {
                    key:2,
                    id:2,
                    login_name:'risfeng',
                    user_name:'张三',
                    state:'0',
                    create_time:'2018-09-17 11:21:00',
                    create_user:'admin'
                }
            ],
            pagination:{
                total:120
            }
        }
    } */
}

// 获取用户角色
export async function loadUserRole(params){
    console.info('获取用户角色信息',params);
    return request(`${apiUrl.systemManage.getUserRoleDetail}?${stringify(params)}`);
    /* return {
        code:200,
        message:'',
        result:{
            list:[
                {key:'1',title:'角色1'},
                {key:'2',title:'角色2'},
                {key:'3',title:'角色3'},
                {key:'4',title:'角色4'},
            ],
            targets:['1','3']
        }
    } */
}

// 获取用户部门
export async function loadUserDept(params){
    console.info('获取用户部门信息',params);
    return {
        code:200,
        message:'',
        result:[
            {key:'1',title:'部门1'},
            {key:'2',title:'部门2'},
            {key:'3',title:'部门3'},
            {key:'4',title:'部门4'},
        ]
    }
}

// 获取用户信息
export async function loadUserDataById(params){
    console.info('获取用户信息',params);
    console.info('获取用户信息',params);
    console.info('获取用户信息',params);
    // return request(`${apiUrl.systemManage.getUserDetail}?${stringify(params)}`);
    return request(`http://192.168.0.108:8080/api/User/GetUserDetail/1`);
    /* return {
        code:200,
        message:'成功',
        result:{
            login_name:'yanjc',
            user_name:'燕俊丞',
            email:'yanjc@163.com',
            phone:'13916688975',
            state:'1',
            sort:0,
            dept_id:'1'
        }
    } */
}

// 更新用户信息
export async function editUserData(params){
    console.info('更新用户信息',params);
    return request(apiUrl.systemManage.editUserData,{
        method: 'POST',
        body: params,
    });
    /* return {
        code:200,
        message:'成功',
    } */
}

export async function changeUserStateByIds(params){
    console.info('删除用户信息',params);
    return request(apiUrl.systemManage.changeUserState,{
        method: 'POST',
        body: params,
    });
    /* return {
        code:200,
        message:'成功',
    } */
}
