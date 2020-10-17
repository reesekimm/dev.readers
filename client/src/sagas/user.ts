import { all, fork, takeLatest, call, put } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/user';
import { actions as loadingActions } from '../features/loading';

function* loadMyInfo({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  try {
    const { data } = yield call(api.loadMyInfo);
    data.Reviews.forEach((review) => {
      review.isbn13 = review.Book.isbn13;
      delete review.Book;
    });
    yield put({
      type: success,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchLoadMyInfo() {
  yield takeLatest(actions.loadMyInfo, loadMyInfo);
}

const logOut = createRequestSaga(actions.logout, api.logout);

function* watchLogOut() {
  yield takeLatest(actions.logout, logOut);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLoadMyInfo), fork(watchLogOut)]);
}
