import { all, fork, take, call, put } from 'redux-saga/effects';

import { actions } from '../features/modal';
import { actions as reviewActions } from '../features/review';

function* watchOpenWriteReviewModal() {
  while (true) {
    const action = yield take(actions.openWriteReviewModal.toString());
    if (action) yield call(actions.openWriteReviewModal, action.payload);
  }
}

function* watchCloseWriteReviewModal() {
  while (true) {
    const action = yield take(actions.closeWriteReviewModal.toString());
    if (action) yield call(actions.closeWriteReviewModal);
  }
}

function* watchOpenReviewDetailModal() {
  while (true) {
    const action = yield take(actions.openReviewDetailModal.toString());
    if (action) {
      yield call(actions.openReviewDetailModal, action.payload);
      yield put(reviewActions.getReview(action.payload));
    }
  }
}

function* watchCloseReviewDetailModal() {
  while (true) {
    const action = yield take(actions.closeReviewDetailModal.toString());
    if (action) {
      yield call(actions.closeReviewDetailModal);
      yield call(reviewActions.clearReview);
    }
  }
}

export default function* searchSaga(): Generator {
  yield all([
    fork(watchOpenWriteReviewModal),
    fork(watchCloseWriteReviewModal),
    fork(watchOpenReviewDetailModal),
    fork(watchCloseReviewDetailModal),
  ]);
}
