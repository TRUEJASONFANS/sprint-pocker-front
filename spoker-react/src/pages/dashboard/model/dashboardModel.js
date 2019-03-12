import * as dashboardService from '../service/dashboardService';

export default {
  namespace: 'dashboard',
  state: {
    itemList: [],
    page: 1

  },
  reducers: {
    save(state, { payload: { data: list, page } }) {
      
      return { ...state, list, page };
    },
  },
  effects: {
    *fetch({ payload: page }, { call }) {
      yield call(dashboardService.fetch, page);
    },
    *create({ payload: newItem }, { call, select ,put}) {
      yield call(dashboardService.create, newItem);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *deleteOne({ payload: ticketNum }, { call, select, put }) {
      yield call(dashboardService.deleteOne, ticketNum);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    }
  }
}