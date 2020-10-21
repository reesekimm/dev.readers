import { delay, put, call } from 'redux-saga/effects';
import { actions } from '../features/loading';

export default function createRequestSaga(type, request) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;

  return function* (action): Generator {
    yield put(actions.start(type.toString()));
    try {
      let result;
      if (typeof request === 'string') {
        yield delay(1000);
      } else {
        result = yield call(request, action.payload);
      }
      yield put({
        type: success,
        payload: result ? result.data : action.payload,
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
