import { IReview } from 'common/types';

export interface UserState {
  me: Me | null;
  userInfo: Me | null;
  logOutDone: boolean;
  logOutError: string | null;
  loadMyInfoDone: boolean;
  loadMyInfoError: string | null;
  loadUserInfoDone: boolean;
  loadUserInfoError: string | null;
  deleteAccountDone: boolean;
  deleteAccountError: string | null;
}

export interface User {
  id: number;
  nickname: string;
  avatarUrl: string;
}

export interface Review {
  id: number;
  isbn13: string;
}

export interface Comment {
  ReviewId: number;
  CommentId: number;
}

export interface Me {
  id: number;
  nickname: string;
  avatarUrl: string;
  Reviews: Review[];
  Likes: { id: IReview.ReviewId }[];
  Comments: { id: number }[];
  Followings: User[];
  Followers: User[];
}
