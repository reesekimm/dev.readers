import { all, fork, takeLatest, take, call } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/search';

/** Workers */
const searchBook = createRequestSaga(actions.searchBook, api.searchBook);

/** Watchers */
function* watchSearchBook() {
  yield takeLatest(actions.searchBook, searchBook);
}

function* watchClearResult() {
  while (true) {
    const action = yield take(actions.clearResult.toString());
    if (action) yield call(actions.clearResult);
  }
}

export default function* searchSaga(): Generator {
  yield all([fork(watchSearchBook), fork(watchClearResult)]);
}
