import { all, fork, takeLatest, take, call, put, delay, throttle } from 'redux-saga/effects';
import shortId from 'shortid';

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

/** 리뷰 작성 */

function* addReview({ type, payload }) {
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

const editReview = createRequestSaga(reviewActions.editReview, `api.editReview`);

function* watchEditReview() {
  yield takeLatest(reviewActions.editReview, editReview);
}

/** 리뷰 삭제 */

function* deleteReview({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    const { data } = yield call(api.deleteReview, payload);
    yield put({
      type: success,
      payload: data,
    });
    yield put(userActions.deleteReview(payload));
    yield put(userActions.cancelLike(payload));
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

function* addLike({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    yield delay(1000);
    yield put(userActions.addLike({ id: payload }));
    yield put({
      type: success,
      payload: { ReviewId: payload, UserId: 1 },
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

function* cancelLike({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    yield delay(1000);
    yield put(userActions.cancelLike({ id: payload }));
    yield put({
      type: success,
      payload: { ReviewId: payload, UserId: 1 },
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

/** 내가 작성한 리뷰 가져오기 */

const getReview = createRequestSaga(reviewActions.getReview, `api.getReview`);

function* watchGetReview() {
  yield takeLatest(reviewActions.getReview, getReview);
}

/** 내가 작성한 리뷰 삭제 */

function* watchClearReview() {
  while (true) {
    const action = yield take(reviewActions.clearReview.toString());
    if (action) yield call(reviewActions.clearReview);
  }
}

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

function* addComment({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  const commentId = shortId.generate();
  try {
    yield delay(1000);
    yield put(userActions.addComment({ ReviewId: payload.ReviewId, CommentId: commentId }));
    yield put({
      type: success,
      payload: {
        id: commentId,
        ReviewId: payload.ReviewId,
        User: { id: 1, nickname: 'Reese' },
        content: payload.content,
        createdAt: '2020-09-06T07:47:13.000Z',
      },
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

const editComment = createRequestSaga(reviewActions.editComment, `api.editComment`);

function* watchEditComment() {
  yield takeLatest(reviewActions.editComment, editComment);
}

/** 댓글 삭제 */

function* deleteComment({ type, payload }) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;
  yield put(loadingActions.start(type.toString()));
  console.log('[payload]', payload);
  try {
    yield delay(1000);
    yield put(userActions.deleteComment(payload));
    yield put({
      type: success,
      payload,
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
