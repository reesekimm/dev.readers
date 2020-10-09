import { all, fork, takeLatest, take, call, put, delay } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions } from '../features/review';
import { actions as userActions } from '../features/user';
import { actions as loadingActions } from '../features/loading';

/** 리뷰 작성 */

function* addReview({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    yield delay(1000);
    yield put({
      type: success,
      payload,
    });
    yield put(userActions.addReview({ id: 'test', isbn13: payload.Book.isbn13 }));
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchAddReview() {
  yield takeLatest(actions.addReview, addReview);
}

/** 리뷰 수정 */

const editReview = createRequestSaga(actions.editReview, `api.editReview`);

function* watchEditReview() {
  yield takeLatest(actions.editReview, editReview);
}

/** 리뷰 삭제 */

function* deleteReview({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    yield delay(1000);
    yield put({
      type: success,
      payload,
    });
    yield put(userActions.deleteReview(payload));
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchDeleteReview() {
  yield takeLatest(actions.deleteReview, deleteReview);
}

/** 좋아요 */

function* likeReview({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    yield delay(1000);
    yield put({
      type: success,
      payload: { ReviewId: payload, UserId: 1 },
    });
    yield put(userActions.addLike({ id: payload }));
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchLikeReview() {
  yield takeLatest(actions.likeReview, likeReview);
}

/** 내가 작성한 리뷰 가져오기 */

const getReview = createRequestSaga(actions.getReview, `api.getReview`);

function* watchGetReview() {
  yield takeLatest(actions.getReview, getReview);
}

/** 내가 작성한 리뷰 삭제 */

function* watchClearReview() {
  while (true) {
    const action = yield take(actions.clearReview.toString());
    if (action) yield call(actions.clearReview);
  }
}

function* watchResetAddReviewState() {
  while (true) {
    const action = yield take(actions.resetAddReviewState.toString());
    if (action) yield call(actions.resetAddReviewState);
  }
}

function* watchResetEditReviewState() {
  while (true) {
    const action = yield take(actions.resetEditReviewState.toString());
    if (action) yield call(actions.resetEditReviewState);
  }
}

function* watchResetDeleteReviewState() {
  while (true) {
    const action = yield take(actions.resetDeleteReviewState.toString());
    if (action) yield call(actions.resetDeleteReviewState);
  }
}

export default function* reviewSaga(): Generator {
  yield all([
    fork(watchAddReview),
    fork(watchResetAddReviewState),
    fork(watchEditReview),
    fork(watchResetEditReviewState),
    fork(watchDeleteReview),
    fork(watchResetDeleteReviewState),
    fork(watchLikeReview),
    fork(watchGetReview),
    fork(watchClearReview),
  ]);
}
