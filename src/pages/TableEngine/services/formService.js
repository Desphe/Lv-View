/* eslint-disable linebreak-style,import/prefer-default-export,no-plusplus,no-script-url */
import { stringify } from 'qs';
import request from '@/utils/request';
import apiUrl from '@/utils/apiUrl'

export async function loadFormConfig(params) {
  console.info(`分页获取数据code:`,params);
  return request(apiUrl.commonBuild.loadFormConfig,{
    method: 'POST',
    body:params,
  });
}

export async function loadFormData(params) {
  console.info(`分页获取数据code:`,params);
  return request(apiUrl.commonBuild.loadFormData,{
    method: 'POST',
    body:params,
  });
}

export async function deleteFormData(params) {
  console.info(`删除数据:`,params);
  return request(apiUrl.commonBuild.deleteFormData,{
    method: 'POST',
    body:params,
  });
}

export async function UpdateFormData(params) {
  console.info(`更新数据，新增/修改:`,params);
  return request(apiUrl.commonBuild.updateFormData,{
    method: 'POST',
    body:params,
  });
}
