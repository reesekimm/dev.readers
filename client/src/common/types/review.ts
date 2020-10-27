import { IBook, IUser } from '@types';

export type ReviewId = number;

export type CreatedAt = string;

export interface Comment {
  id: number;
  ReviewId: ReviewId;
  User: IUser.User;
  content: string;
  createdAt: CreatedAt;
}

export interface CommentInfo {
  ReviewId: ReviewId;
  content: string;
}

export interface Liker {
  id: number;
}

export interface ReviewInfo {
  id: ReviewId;
  Book: IBook.Book;
  rating: number;
  content: string;
}

export interface Review {
  id: ReviewId;
  User: IUser.User;
  Book: IBook.Book;
  rating: number;
  content: string;
  createdAt: CreatedAt;
  Comments: Comment[];
  Likers: Liker[];
}

export type Reviews = Review[];

export interface ReviewState {
  mainReviews: Reviews;
  getReviewsDone: boolean;
  getReviewsError: string | null;
  hasMoreReviews: boolean;
  getUserReviewsDone: boolean;
  getUserReviewsError: string | null;
  getUserLikesDone: boolean;
  getUserLikesError: string | null;
  addReviewDone: boolean;
  addReviewError: string | null;
  editReviewDone: boolean;
  editReviewError: string | null;
  deleteReviewDone: boolean;
  deleteReviewError: string | null;
  selectedReviewId: ReviewId | null;
  addLikeDone: boolean;
  addLikeError: string | null;
  cancelLikeDone: boolean;
  cancelLikeError: string | null;
  Review: Review | null;
  getReviewDone: boolean;
  getReviewError: string | null;
  addCommentDone: boolean;
  addCommentError: string | null;
  editCommentDone: boolean;
  editCommentError: string | null;
  deleteCommentDone: boolean;
  deleteCommentError: string | null;
}

/** api argument types */

export interface GetReviews {
  nickname: string;
  lastId: number | null;
}

export interface EditReview {
  id: number;
  rating: number;
  content: string | number;
}

export interface AddComment {
  ReviewId: number;
  content: string | number;
}

export interface EditComment {
  CommentId: number;
  content: string | number;
}
