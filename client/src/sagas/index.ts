import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import reviewSaga from './review';
import searchSaga from './search';
import modalSaga from './modal';

export default function* rootSaga(): Generator {
  yield all([fork(userSaga), fork(reviewSaga), fork(searchSaga), fork(modalSaga)]);
}
