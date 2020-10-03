import { delay, put, call } from 'redux-saga/effects';
import { actions } from '../features/loading';

export default function createRequestSaga(type, request) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;

  return function* (action): Generator {
    yield put(actions.start(type.toString()));
    console.log('[payload]', action.payload);
    try {
      const result = yield call(request, action.payload);
      // yield delay(1000);
      yield put({
        type: success,
        payload: result.data,
        // payload: action.payload,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: failure,
        payload: e.response.data,
      });
    }
    yield put(actions.finish(type.toString()));
  };
}
