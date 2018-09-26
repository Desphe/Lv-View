/* eslint-disable linebreak-style,import/prefer-default-export,no-plusplus,no-script-url */
import { stringify } from 'qs';
import request from '@/utils/request';
import apiUrl from '@/utils/apiUrl'

// 获取分页数据
export async function loadSplitData(params,path) {
  return request(`${apiUrl.systemManage.loadSplitData}/${path}`,{
    method: 'POST',
    body:params,
  });
}
