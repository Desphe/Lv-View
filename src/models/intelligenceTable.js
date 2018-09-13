import { queryIntelligenceTable, removeIntelligenceTable, addIntelligenceTable, updateIntelligenceTable, getIntelligenceTable } from '@/services/intelligenceTable';

export default {
  namespace: 'intelligenceTable',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload ,path }, { call, put }) {
      const response = yield call(queryIntelligenceTable, payload={}, path);
      yield put({
        type: 'save',
        path: path,
        payload: response,
      });
    },
    *add({ payload, path, callback }, { call, put }) {
      const response = yield call(addIntelligenceTable, payload, path);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, path, callback }, { call, put }) {
      const response = yield call(removeIntelligenceTable, payload, path);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, path, callback }, { call, put }) {
      const response = yield call(updateIntelligenceTable, payload, path);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *getInfo({ payload, path, callback }, { call, put }) {
      const response = yield call(getIntelligenceTable, payload, path);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
        title:"通用模块1",
      };
    },
  },
};
