import request from '@/utils/request';

export async function querySliderMenus() {
  return request('/sliderMenu/sliderMenus');
}