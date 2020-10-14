import { all, fork, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/user';

const loadMyInfo = createRequestSaga(actions.loadMyInfo, api.loadMyInfo);

function* watchLoadMyInfo() {
  yield takeLatest(actions.loadMyInfo, loadMyInfo);
}

const logOut = createRequestSaga(actions.logout, `api.logout`);

function* watchLogOut() {
  yield takeLatest(actions.logout, logOut);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLoadMyInfo), fork(watchLogOut)]);
}
