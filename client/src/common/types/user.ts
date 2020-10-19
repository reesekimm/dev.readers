import { IReview } from '@types';

export interface UserState {
  me: Me | null;
  logOutDone: boolean;
  logOutError: string | null;
  loadMyInfoDone: boolean;
  loadMyInfoError: string | null;
}

export interface User {
  // TODO: DB 연동후 number로 고정
  id: number | string;
  nickname: string;
}

export interface Review {
  id: number | string;
  isbn13: string;
}

export interface Comment {
  ReviewId: number;
  CommentId: number;
}

export interface Me {
  // TODO: DB 연동 후 id type number로 고정
  id: number | string;
  nickname: string;
  avatarUrl: string;
  Reviews: Review[];
  Likes: { id: IReview.ReviewId }[];
  Comments: { id: number }[];
  Followings: User[];
  Followers: User[];
}
