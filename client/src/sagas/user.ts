import { all, fork, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/user';

const logOut = createRequestSaga(actions.logout, `api.logout`);

function* watchLogOut() {
  yield takeLatest(actions.logout, logOut);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLogOut)]);
}
