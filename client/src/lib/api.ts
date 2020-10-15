import axios from 'axios';

import { IReview } from '@types';

const BASE_URL = process.env.NEXT_PUBLIC_DEV_API;

axios.defaults.withCredentials = true;

export const loadMyInfo = () => axios.get(`${BASE_URL}/user`);

export const logout = () => axios.get(`${BASE_URL}/user/logout`);

export const addReview = (review) => axios.post(`${BASE_URL}/review/review`, review);

export const editReview = ({ id, rating, content }) =>
  axios.patch(`${BASE_URL}/review/${id}`, { rating, content });

export const deleteReview = (id: IReview.ReviewId) => axios.delete(`${BASE_URL}/review/${id}`);

export const addLike = (id: IReview.ReviewId) => axios.patch(`${BASE_URL}/review/${id}/like`);

export const cancelLike = (id: IReview.ReviewId) => axios.delete(`${BASE_URL}/review/${id}/like`);

export const getReview = ({ id, isbn13 }) =>
  axios.get(`${BASE_URL}/review?id=${id}&isbn13=${isbn13}`);

export const addComment = ({ ReviewId, content, UserId }) =>
  axios.post(`${BASE_URL}/reivew/${ReviewId}/comment`, { content, UserId });

export const editComment = ({ ReviewId, CommentId, content }) =>
  axios.patch(`${BASE_URL}/review/${ReviewId}/comment/${CommentId}`, content);

export const deleteComment = (data) =>
  axios.delete(`${BASE_URL}/reivew/${data.ReviewId}/comment/${data.CommentId}`);

export const searchBook = ({ query, page }) =>
  axios.get(`${BASE_URL}/search/book?query=${query}&page=${page}`);
