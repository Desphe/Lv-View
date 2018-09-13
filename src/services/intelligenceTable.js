import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryIntelligenceTable(params,path) {
  return request(`${path}?${stringify(params)}`);
}

export async function removeIntelligenceTable(params, path) {
  return request(`${path}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addIntelligenceTable(params, path) {
  return request(`${path}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateIntelligenceTable(params, path) {
  return request(`${path}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function getIntelligenceTable(params, path) {
  return request(`${path}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'getInfo',
    },
  });
}