import { all, fork, takeLatest, take, call } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/review';

const getReview = createRequestSaga(actions.getReview, `api.getReview`);

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
  yield all([fork(watchGetReview), fork(watchClearReview)]);
}
