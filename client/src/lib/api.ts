/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

import { BASE_URL } from 'common/constants';
import { IReview, ISearch } from 'common/types';
import { Request } from './createRequestSaga';

axios.defaults.withCredentials = true;

export const loadMyInfo: Request = () => axios.get(`${BASE_URL}/user`);
export const loadUserInfo: Request = (nickname: string) =>
  axios.get(`${BASE_URL}/user/${nickname}`);
export const logout: Request = () => axios.get(`${BASE_URL}/user/logout`);
export const deleteAccount: Request = () => axios.delete(`${BASE_URL}/user`);

export const getReviews: Request = (lastId: number | null) =>
  axios.get(`${BASE_URL}/reviews?lastId=${lastId}`);
export const getUserReviews: Request = ({ nickname, lastId }: IReview.GetReviews) =>
  axios.get(`${BASE_URL}/user/${nickname}/reviews?lastId=${lastId}`);
export const getUserLikes: Request = ({ nickname, lastId }: IReview.GetReviews) =>
  axios.get(`${BASE_URL}/user/${nickname}/likes?lastId=${lastId}`);

export const addReview: Request = (review: IReview.Review) =>
  axios.post(`${BASE_URL}/review/review`, review);
export const editReview: Request = ({ id, rating, content }: IReview.EditReview) =>
  axios.patch(`${BASE_URL}/review/${id}`, { id, rating, content });
export const deleteReview: Request = (id: number) => axios.delete(`${BASE_URL}/review/${id}`);

export const addLike: Request = (id: number) => axios.patch(`${BASE_URL}/review/${id}/like`);
export const cancelLike: Request = (id: number) => axios.delete(`${BASE_URL}/review/${id}/like`);

export const getReview = (id: number) => axios.get(`${BASE_URL}/review?id=${id}`);

export const addComment: Request = ({ ReviewId, content }: IReview.AddComment) =>
  axios.post(`${BASE_URL}/review/${ReviewId}/comment`, { content });
export const editComment: Request = ({ CommentId, content }: IReview.EditComment) =>
  axios.patch(`${BASE_URL}/review/comment/${CommentId}`, { content });
export const deleteComment: Request = (CommentId: number) =>
  axios.delete(`${BASE_URL}/review/comment/${CommentId}`);
export const searchBook: Request = ({ query, page }: ISearch.SearchBook) =>
  axios.get(`${BASE_URL}/search/book?query=${query}&page=${page}`);
