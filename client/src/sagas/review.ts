import { all, fork, takeLatest, take, call, put, delay } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/review';
import { actions as userActions } from '../features/user';
import { actions as loadingActions } from '../features/loading';

function* addReview({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    yield delay(1000);
    yield put({
      type: success,
      payload,
    });
    yield put(userActions.addReview({ id: 'test', isbn13: payload.Book.isbn13 }));
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

const getReview = createRequestSaga(actions.getReview, `api.getReview`);

function* watchAddReview() {
  yield takeLatest(actions.addReview, addReview);
}

function* watchGetReview() {
  yield takeLatest(actions.getReview, getReview);
}

function* watchClearReview() {
  while (true) {
    const action = yield take(actions.clearReview.toString());
    if (action) yield call(actions.clearReview);
  }
}

export default function* reviewSaga(): Generator {
  yield all([fork(watchAddReview), fork(watchGetReview), fork(watchClearReview)]);
}
