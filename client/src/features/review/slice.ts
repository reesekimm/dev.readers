import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortId from 'shortid';

import { IReview, IBook, IUser } from '@types';
import reviews from '../../assets/reviews';

export const initialState: IReview.ReviewState = {
  mainReviews: [],
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

const generateDummyReview = (data) => {
  return {
    ...data,
    id: shortId.generate(),
    User: {
      id: 1,
      nickname: 'reese',
    },
    createdAt: '2020-08-30T08:52:15.000Z',
    Comments: [],
    Likers: [],
  };
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, actions) => {
      state.addReviewDone = false;
      state.addReviewError = null;
    },
    addReviewSuccess: (state, action: PayloadAction<IReview.Review>) => {
      state.mainReviews.unshift(generateDummyReview(action.payload));
      state.addReviewDone = true;
    },
    addReviewFailure: (state, action: PayloadAction<string>) => {
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
      const reviewIndex = state.mainReviews.findIndex((review) => review.id === action.payload.id);
      state.mainReviews[reviewIndex].rating = action.payload.rating;
      state.mainReviews[reviewIndex].content = action.payload.content;
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
    deleteReview: (state, action: PayloadAction<IReview.ReviewId>) => {
      state.deleteReviewDone = false;
      state.deleteReviewError = null;
    },
    deleteReviewSuccess: (state, action) => {
      const reviewIndex = state.mainReviews.findIndex((review) => review.id === action.payload);
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
    addLike: (state, action: PayloadAction<IReview.ReviewId>) => {
      state.addLikeDone = false;
      state.addLikeError = null;
      state.selectedReviewId = action.payload;
    },
    addLikeSuccess: (state, action) => {
      const reviewToLike = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      reviewToLike.Likers.push({ id: action.payload.UserId });
      state.addLikeDone = true;
      state.selectedReviewId = null;
    },
    addLikeFailure: (state, action) => {
      state.addLikeDone = true;
      state.addLikeError = action.payload;
      state.selectedReviewId = null;
    },
    cancelLike: (state, action: PayloadAction<IReview.ReviewId>) => {
      state.cancelLikeDone = false;
      state.cancelLikeError = null;
      state.selectedReviewId = action.payload;
    },
    cancelLikeSuccess: (state, action) => {
      const reviewToUnlike = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      const indexOfLiker = reviewToUnlike.Likers.findIndex(
        (liker) => liker.id === action.payload.UserId
      );
      reviewToUnlike.Likers.splice(indexOfLiker, 1);
      state.cancelLikeDone = true;
      state.selectedReviewId = null;
    },
    cancelLikeFailure: (state, action) => {
      state.cancelLikeDone = true;
      state.cancelLikeError = action.payload;
      state.selectedReviewId = null;
    },
    getReview: (state, action: PayloadAction<IBook.ISBN>) => {
      state.Review = null;
      state.getReviewDone = false;
      state.getReviewError = null;
    },
    getReviewSuccess: (state, action: PayloadAction<IBook.ISBN>) => {
      state.getReviewDone = true;
      state.Review = reviews.find((review) => review.Book.isbn13 === '9788966262595');
    },
    getReviewFailure: (state, action: PayloadAction<string>) => {
      state.getReviewDone = true;
      state.getReviewError = action.payload;
    },
    clearReview: (state) => {
      state.Review = null;
    },
    addComment: (state, action: PayloadAction<IReview.CommentInfo>) => {
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSuccess: (state, action: PayloadActions<IReview.Comment>) => {
      const reviewToAddComment = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      reviewToAddComment?.Comments.push(action.payload);
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
      const commentToUpdate = reviewToUpdateComment.Comments.find(
        (comment) => comment.id === action.payload.CommentId
      );
      commentToUpdate.content = action.payload.content;
      state.editCommentDone = true;
      state.editCommentError = null;
    },
    editCommentFailure: (state, action) => {
      state.editCommentDone = true;
      state.editCommentError = action.payload;
    },
    deleteComment: (state, action: PayloadActions<IUser.Comment>) => {
      state.deleteCommentDone = false;
      state.deleteCommentError = null;
    },
    deleteCommentSuccess: (state, action: PayloadActions<IUser.Comment>) => {
      const reviewToDeleteComment = state.mainReviews.find(
        (review) => review.id === action.payload.ReviewId
      );
      const indexOfComment = reviewToDeleteComment?.Comments.findIndex(
        (comment) => comment.id === action.payload.CommentId
      );
      reviewToDeleteComment?.Comments.splice(indexOfComment, 1);
    },
    deleteCommentFailure: (state, action) => {
      state.deleteCommentDone = true;
      state.deleteCommentError = action.payload;
    },
  },
});

export const { actions, reducer } = reviewSlice;
