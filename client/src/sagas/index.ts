import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import searchSaga from './search';

export default function* rootSaga(): Generator {
  yield all([fork(userSaga), fork(searchSaga)]);
}
