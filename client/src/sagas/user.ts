import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga';
import { actions as userActions } from 'features/user';

function* loadMyInfo({ type }: PayloadAction) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  try {
    const { data } = yield call(api.loadMyInfo);
    data.Reviews.forEach((review: any) => {
      review.isbn13 = review.Book.isbn13;
      delete review.Book;
    });
    data.Likes.forEach((like: { Like: unknown }) => {
      delete like.Like;
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
}

function* watchLoadMyInfo() {
  yield takeLatest(userActions.loadMyInfo, loadMyInfo);
}

const loadUserInfo = createRequestSaga(userActions.loadUserInfo, api.loadUserInfo);

function* watchLoadUserInfo() {
  yield takeLatest(userActions.loadUserInfo, loadUserInfo);
}

const logOut = createRequestSaga(userActions.logout, api.logout);

function* watchLogOut() {
  yield takeLatest(userActions.logout, logOut);
}

const deleteAccount = createRequestSaga(userActions.deleteAccount, api.deleteAccount);

function* watchDeleteAccount() {
  yield takeLatest(userActions.deleteAccount, deleteAccount);
}

export default function* userSaga(): Generator {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadUserInfo),
    fork(watchLogOut),
    fork(watchDeleteAccount),
  ]);
}
