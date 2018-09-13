import { querySliderMenus } from '@/services/sliderMenus';

export default {
  namespace: 'sliderMenus',

  state: {
    data: {
      sliderMenus: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySliderMenus, payload={});
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      console.log(action)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
