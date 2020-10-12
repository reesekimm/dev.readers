import { all, fork, takeLatest, take, call, put, delay } from 'redux-saga/effects';
import shortId from 'shortid';

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
  yield takeLatest(actions.deleteReview, deleteReview);
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
  yield takeLatest(actions.addLike, addLike);
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
  yield takeLatest(actions.cancelLike, cancelLike);
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
  yield takeLatest(actions.addComment, addComment);
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
  yield takeLatest(actions.deleteComment, deleteComment);
}

export default function* reviewSaga(): Generator {
  yield all([
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
    fork(watchDeleteComment),
  ]);
}
