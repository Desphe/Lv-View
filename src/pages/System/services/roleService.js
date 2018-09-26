import { stringify } from 'qs';
import request from '@/utils/request';
import apiUrl from '@/utils/apiUrl';

export async function loadSplitData(params){
    console.info('加载角色数据参数：',params);
    return request(apiUrl.systemManage.loadRoleSplitData,{
        method: 'POST',
        body: params,
    });
}

// 获取角色详情
export async function loadRoleDetail(params){
    console.info('获取角色信息',params);
    return request(apiUrl.systemManage.getRoleDetail,{
        method: 'POST',
        body: params,
    });
}

//获取菜单
export async function loadMenuData(params){
    console.info('获取角色信息',params);
    return request(`${apiUrl.systemManage.loadSplitData}/Menu/LoadSplitData`,{
        method: 'POST',
        body: params,
    });
}

// 更新角色信息
export async function editRoleData(params){
    console.info('更新角色信息',params);
    return request(apiUrl.systemManage.editRoleDetail,{
        method: 'POST',
        body: params,
    });
}

export async function deleteRoleByIds(params){
    console.info('删除角色信息',params);
    return request(apiUrl.systemManage.deleteRoleByIds,{
        method: 'POST',
        body: params,
    });
}
