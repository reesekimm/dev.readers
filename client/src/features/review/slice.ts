import { createSlice } from '@reduxjs/toolkit';

import { IReview } from 'common/types';

export const initialState: IReview.ReviewState = {
  mainReviews: [],
  getReviewsDone: false,
  getReviewsError: null,
  hasMoreReviews: true,
  getUserReviewsDone: false,
  getUserReviewsError: null,
  getUserLikesDone: false,
  getUserLikesError: null,
  addReviewDone: false,
  addReviewError: null,
  editReviewDone: false,
  editReviewError: null,
  deleteReviewDone: false,
  deleteReviewError: null,
  selectedReviewId: null,
  addLikeDone: false,
  addLikeError: null,
  cancelLikeDone: false,
  cancelLikeError: null,
  Review: null,
  getReviewDone: false,
  getReviewError: null,
  addCommentDone: false,
  addCommentError: null,
  editCommentDone: false,
  editCommentError: null,
  deleteCommentDone: false,
  deleteCommentError: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getReviews: (state, action) => {
      state.getReviewsDone = false;
      state.getReviewsError = null;
    },
    getReviewsSuccess: (state, action) => {
      state.mainReviews = [...state.mainReviews, ...action.payload];
      state.getReviewsDone = true;
      state.hasMoreReviews = action.payload.length === 10;
    },
    getReviewsFailure: (state, action) => {
      state.getReviewsDone = true;
      state.getReviewsError = action.payload;
    },
    getUserReviews: (state, action) => {
      state.getUserReviewsDone = false;
      state.getUserReviewsError = null;
    },
    getUserReviewsSuccess: (state, action) => {
      state.mainReviews = [...state.mainReviews, ...action.payload];
      state.getUserReviewsDone = true;
      state.hasMoreReviews = action.payload.length === 10;
    },
    getUserReviewsFailure: (state, action) => {
      state.getUserReviewsDone = true;
      state.getUserReviewsError = action.payload;
    },
    getUserLikes: (state, action) => {
      state.getUserLikesDone = false;
      state.getUserLikesError = null;
    },
    getUserLikesSuccess: (state, action) => {
      state.mainReviews = [...state.mainReviews, ...action.payload];
      state.getUserLikesDone = true;
      state.hasMoreReviews = action.payload.length === 10;
    },
    getUserLikesFailure: (state, action) => {
      state.getUserLikesDone = true;
      state.getUserLikesError = action.payload;
    },
    addReview: (state, actions) => {
      state.addReviewDone = false;
      state.addReviewError = null;
    },
    addReviewSuccess: (state, action) => {
      state.mainReviews.unshift(action.payload);
      state.addReviewDone = true;
    },
    addReviewFailure: (state, action) => {
      state.addReviewDone = true;
      state.addReviewError = action.payload;
    },
    resetAddReviewState: (state) => {
      state.addReviewDone = false;
      state.addReviewError = null;
    },
    editReview: (state, action) => {
      state.editReviewDone = false;
      state.editReviewError = null;
    },
    editReviewSuccess: (state, action) => {
      const reviewToEdit = state.mainReviews.find((review) => review.id === action.payload.id);
      if (reviewToEdit !== undefined) {
        reviewToEdit.rating = action.payload.rating;
        reviewToEdit.content = action.payload.content;
      }
      state.editReviewDone = true;
      state.editReviewError = null;
    },
    editReviewFailure: (state, action) => {
      state.editReviewError = action.payload;
    },
    resetEditReviewState: (state) => {
      state.editReviewDone = false;
      state.editReviewError = null;
    },
    deleteReview: (state, action) => {
      state.deleteReviewDone = false;
      state.deleteReviewError = null;
    },
    deleteReviewSuccess: (state, action) => {
      const reviewIndex = state.mainReviews.findIndex(
        (review) => review.id === action.payload.ReviewId
      );
      state.mainReviews.splice(reviewIndex, 1);
      state.deleteReviewDone = true;
    },
    deleteReviewFailure: (state, action) => {
      state.deleteReviewError = action.payload;
    },
    resetDeleteReviewState: (state) => {
      state.deleteReviewDone = false;
      state.deleteReviewError = null;
    },
    addLike: (state, action) => {
      state.addLikeDone = false;
      state.addLikeError = null;
      state.selectedReviewId = action.payload;
    },
    addLikeSuccess: (state, action) => {
      const reviewToLike = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      reviewToLike?.Likers.push({ id: action.payload.UserId });
      state.addLikeDone = true;
      state.selectedReviewId = null;
    },
    addLikeFailure: (state, action) => {
      state.addLikeDone = true;
      state.addLikeError = action.payload;
      state.selectedReviewId = null;
    },
    cancelLike: (state, action) => {
      state.cancelLikeDone = false;
      state.cancelLikeError = null;
      state.selectedReviewId = action.payload;
    },
    cancelLikeSuccess: (state, action) => {
      const reviewToUnlike = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      const indexOfLiker = reviewToUnlike?.Likers.findIndex(
        (liker) => liker.id === action.payload.UserId
      );
      if (indexOfLiker !== undefined) reviewToUnlike?.Likers.splice(indexOfLiker, 1);
      state.cancelLikeDone = true;
      state.selectedReviewId = null;
    },
    cancelLikeFailure: (state, action) => {
      state.cancelLikeDone = true;
      state.cancelLikeError = action.payload;
      state.selectedReviewId = null;
    },
    getReview: (state, action) => {
      state.Review = null;
      state.getReviewDone = false;
      state.getReviewError = null;
    },
    getReviewSuccess: (state, action) => {
      state.getReviewDone = true;
      state.Review = action.payload;
    },
    getReviewFailure: (state, action) => {
      state.getReviewDone = true;
      state.getReviewError = action.payload;
    },
    clearReview: (state) => {
      state.Review = null;
    },
    addComment: (state, action) => {
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSuccess: (state, action) => {
      const reviewToAddComment = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      reviewToAddComment?.Comments.unshift(action.payload);
      state.addCommentDone = true;
    },
    addCommentFailure: (state, action) => {
      state.addCommentDone = true;
      state.addCommentError = action.payload;
    },
    editComment: (state, action) => {
      state.editCommentDone = false;
      state.editCommentError = null;
    },
    editCommentSuccess: (state, action) => {
      const reviewToUpdateComment = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      const commentToUpdate = reviewToUpdateComment?.Comments.find(
        (comment) => comment.id === action.payload.id
      );
      if (commentToUpdate) commentToUpdate.content = action.payload.content;
      state.editCommentDone = true;
    },
    editCommentFailure: (state, action) => {
      state.editCommentDone = true;
      state.editCommentError = action.payload;
    },
    deleteComment: (state, action) => {
      state.deleteCommentDone = false;
      state.deleteCommentError = null;
    },
    deleteCommentSuccess: (state, action) => {
      const reviewToDeleteComment = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      const indexOfComment = reviewToDeleteComment?.Comments.findIndex(
        (comment) => comment.id === action.payload.CommentId
      );
      if (indexOfComment !== undefined) reviewToDeleteComment?.Comments.splice(indexOfComment, 1);
    },
    deleteCommentFailure: (state, action) => {
      state.deleteCommentDone = true;
      state.deleteCommentError = action.payload;
    },
  },
});

export const { actions, reducer } = reviewSlice;
