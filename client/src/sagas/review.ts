import { all, fork, takeLatest, take, call, put, throttle } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { actions as reviewActions } from '../features/review';
import { actions as userActions } from '../features/user';
import { actions as loadingActions } from '../features/loading';

/** 리뷰 로드 */

const getReviews = createRequestSaga(reviewActions.getReviews, api.getReviews);

function* watchGetReviews() {
  yield throttle(3000, reviewActions.getReviews, getReviews);
}

/** 특정 사용자 리뷰 목록 로드 */

const getUserReviews = createRequestSaga(reviewActions.getUserReviews, api.getUserReviews);

function* watchGetUserReviews() {
  yield throttle(3000, reviewActions.getUserReviews, getUserReviews);
}

/** 특정 사용자 좋아요 목록 로드 */

const getUserLikes = createRequestSaga(reviewActions.getUserLikes, api.getUserLikes);

function* watchGetUserLikes() {
  yield throttle(3000, reviewActions.getUserLikes, getUserLikes);
}

/** 리뷰 작성 */

function* addReview({ type, payload }: any) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  try {
    const { data } = yield call(api.addReview, payload);
    yield put({
      type: success,
      payload: data,
    });
    yield put(userActions.addReview({ id: data.id, isbn13: data.Book.isbn13 }));
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
  yield takeLatest(reviewActions.addReview, addReview);
}

/** 리뷰 수정 */

const editReview = createRequestSaga(reviewActions.editReview, api.editReview);

function* watchEditReview() {
  yield takeLatest(reviewActions.editReview, editReview);
}

/** 리뷰 삭제 */

function* deleteReview({ type, payload }: any) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  try {
    const { data } = yield call(api.deleteReview, payload);
    yield put({
      type: success,
      payload: data,
    });
    yield put(userActions.deleteReview(data));
    yield put(userActions.cancelLike(data));
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
  yield takeLatest(reviewActions.deleteReview, deleteReview);
}

/** 좋아요 */

function* addLike({ type, payload }: any) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  try {
    const {
      data: { ReviewId, UserId },
    } = yield call(api.addLike, payload);
    yield put(userActions.addLike({ id: ReviewId }));
    yield put({
      type: success,
      payload: { ReviewId, UserId },
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchAddLike() {
  yield takeLatest(reviewActions.addLike, addLike);
}

/** 좋아요 취소  */

function* cancelLike({ type, payload }: any) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  try {
    const {
      data: { ReviewId, UserId },
    } = yield call(api.cancelLike, payload);
    yield put(userActions.cancelLike({ id: ReviewId }));
    yield put({
      type: success,
      payload: { ReviewId, UserId },
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchCancelLike() {
  yield takeLatest(reviewActions.cancelLike, cancelLike);
}

/** 특정 리뷰(1개) 로드하여 review/Review에 할당 */

const getReview = createRequestSaga(reviewActions.getReview, api.getReview);

function* watchGetReview() {
  yield takeLatest(reviewActions.getReview, getReview);
}

/** review/Review 상태 리셋 */

function* watchClearReview() {
  while (true) {
    const action = yield take(reviewActions.clearReview.toString());
    if (action) yield call(reviewActions.clearReview);
  }
}

/** toast popup 상태관리용 saga - BaseTemplate 참조 */

function* watchResetAddReviewState() {
  while (true) {
    const action = yield take(reviewActions.resetAddReviewState.toString());
    if (action) yield call(reviewActions.resetAddReviewState);
  }
}

function* watchResetEditReviewState() {
  while (true) {
    const action = yield take(reviewActions.resetEditReviewState.toString());
    if (action) yield call(reviewActions.resetEditReviewState);
  }
}

function* watchResetDeleteReviewState() {
  while (true) {
    const action = yield take(reviewActions.resetDeleteReviewState.toString());
    if (action) yield call(reviewActions.resetDeleteReviewState);
  }
}

/** 댓글 작성 */

function* addComment({ type, payload }: any) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  try {
    const { data } = yield call(api.addComment, payload);
    yield put(userActions.addComment({ id: data.id }));
    yield put({
      type: success,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchAddComment() {
  yield takeLatest(reviewActions.addComment, addComment);
}

/** 댓글 수정 */

const editComment = createRequestSaga(reviewActions.editComment, api.editComment);

function* watchEditComment() {
  yield takeLatest(reviewActions.editComment, editComment);
}

/** 댓글 삭제 */

function* deleteComment({ type, payload }: any) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  try {
    const {
      data: { CommentId },
    } = yield call(api.deleteComment, payload.CommentId);
    yield put(userActions.deleteComment(CommentId));
    yield put({
      type: success,
      payload: { ReviewId: payload.ReviewId, CommentId },
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: failure,
      payload: e.response.data,
    });
  }
  yield put(loadingActions.finish(type.toString()));
}

function* watchDeleteComment() {
  yield takeLatest(reviewActions.deleteComment, deleteComment);
}

export default function* reviewSaga(): Generator {
  yield all([
    fork(watchGetReviews),
    fork(watchGetUserReviews),
    fork(watchGetUserLikes),
    fork(watchAddReview),
    fork(watchResetAddReviewState),
    fork(watchEditReview),
    fork(watchResetEditReviewState),
    fork(watchDeleteReview),
    fork(watchResetDeleteReviewState),
    fork(watchAddLike),
    fork(watchCancelLike),
    fork(watchGetReview),
    fork(watchClearReview),
    fork(watchAddComment),
    fork(watchEditComment),
    fork(watchDeleteComment),
  ]);
}
