import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryListConfiguration(params) {
  return request(`/basicConfiguration/listConfiguration?${stringify(params)}`);
}

export async function removeListConfiguration(params) {
  return request('/basicConfiguration/listConfiguration', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addListConfiguration(params) {
  return request('/basicConfiguration/listConfiguration', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateListConfiguration(params) {
  return request('/basicConfiguration/listConfiguration', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function getListConfiguration(params) {
  return request('/basicConfiguration/listConfiguration', {
    method: 'POST',
    body: {
      ...params,
      method: 'getInfo',
    },
  });
}