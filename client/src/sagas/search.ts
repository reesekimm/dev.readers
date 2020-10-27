import { all, fork, takeLatest, take, call } from 'redux-saga/effects';

import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga';
import { actions as searchActions } from 'features/search';

/** Workers */
const searchBook = createRequestSaga(searchActions.searchBook, api.searchBook);

/** Watchers */
function* watchSearchBook() {
  yield takeLatest(searchActions.searchBook, searchBook);
}

function* watchClearResult() {
  while (true) {
    const action = yield take(searchActions.clearResult.toString());
    if (action) yield call(searchActions.clearResult);
  }
}

export default function* searchSaga(): Generator {
  yield all([fork(watchSearchBook), fork(watchClearResult)]);
}
