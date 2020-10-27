import { all, fork, take, call, put } from 'redux-saga/effects';

import { actions as modalActions } from 'features/modal';
import { actions as reviewActions } from 'features/review';

function* watchOpenLoginModal() {
  while (true) {
    const action = yield take(modalActions.openLoginModal.toString());
    if (action) yield call(modalActions.openLoginModal);
  }
}

function* watchCloseLoginModal() {
  while (true) {
    const action = yield take(modalActions.closeLoginModal.toString());
    if (action) yield call(modalActions.closeLoginModal);
  }
}

function* watchOpenWriteReviewModal() {
  while (true) {
    const action = yield take(modalActions.openWriteReviewModal.toString());
    if (action) yield call(modalActions.openWriteReviewModal, action.payload);
  }
}

function* watchCloseWriteReviewModal() {
  while (true) {
    const action = yield take(modalActions.closeWriteReviewModal.toString());
    if (action) yield call(modalActions.closeWriteReviewModal);
  }
}

function* watchOpenReviewDetailModal() {
  while (true) {
    const action = yield take(modalActions.openReviewDetailModal.toString());
    if (action) {
      yield call(modalActions.openReviewDetailModal, action.payload);
      yield put(reviewActions.getReview(action.payload));
    }
  }
}

function* watchCloseReviewDetailModal() {
  while (true) {
    const action = yield take(modalActions.closeReviewDetailModal.toString());
    if (action) {
      yield call(modalActions.closeReviewDetailModal);
      yield put(reviewActions.clearReview());
    }
  }
}

export default function* searchSaga(): Generator {
  yield all([
    fork(watchOpenLoginModal),
    fork(watchCloseLoginModal),
    fork(watchOpenWriteReviewModal),
    fork(watchCloseWriteReviewModal),
    fork(watchOpenReviewDetailModal),
    fork(watchCloseReviewDetailModal),
  ]);
}
