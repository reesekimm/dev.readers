import { all, fork } from 'redux-saga/effects';

import userSaga from './user';

export default function* rootSaga(): Generator {
  yield all([fork(userSaga)]);
}
