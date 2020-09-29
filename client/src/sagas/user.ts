import { all, fork, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/user';

const logIn = createRequestSaga(actions.login, api.login);

function* watchLogIn() {
  yield takeLatest(actions.login, logIn);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLogIn)]);
}
