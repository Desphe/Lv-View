/* eslint-disable linebreak-style,import/prefer-default-export,no-plusplus,no-script-url */
import { stringify } from 'qs';
import request from '@/utils/request';
import apiUrl from '@/utils/apiUrl'

// 加载初始化业务列表配置
export async function loadInitData(params) {
  console.info(`业务表格code:`,params);
  return request(apiUrl.commonBuild.loadTbConfig,{
    method: 'POST',
    body:params,
  });
}
// 获取分页数据
export async function loadSplitData(params) {
  console.info(`分页获取数据code:`,params);
  return request(apiUrl.commonBuild.loadTbSpiltData,{
    method: 'POST',
    body:params,
  });
}
