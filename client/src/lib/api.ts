import axios from 'axios';

import { IReview } from '@types';

const BASE_URL = process.env.NEXT_PUBLIC_DEV_API;

axios.defaults.withCredentials = true;

export const loadMyInfo = () => axios.get(`${BASE_URL}/user`);

export const logout = () => axios.get(`${BASE_URL}/user/logout`);

export const getReviews = (lastId) => axios.get(`${BASE_URL}/reviews?lastId=${lastId}`);

export const addReview = (review) => axios.post(`${BASE_URL}/review/review`, review);

export const editReview = ({ id, rating, content }) =>
  axios.patch(`${BASE_URL}/review/${id}`, { id, rating, content });

export const deleteReview = (id: IReview.ReviewId) => axios.delete(`${BASE_URL}/review/${id}`);

export const addLike = (id: IReview.ReviewId) => axios.patch(`${BASE_URL}/review/${id}/like`);

export const cancelLike = (id: IReview.ReviewId) => axios.delete(`${BASE_URL}/review/${id}/like`);

export const getReview = (id: IReview.ReviewId) => axios.get(`${BASE_URL}/review?id=${id}`);

export const addComment = ({ ReviewId, content }) =>
  axios.post(`${BASE_URL}/review/${ReviewId}/comment`, { content });

export const editComment = ({ ReviewId, CommentId, content }) =>
  axios.patch(`${BASE_URL}/review/${ReviewId}/comment/${CommentId}`, content);

export const deleteComment = (CommentId) => axios.delete(`${BASE_URL}/review/comment/${CommentId}`);

export const searchBook = ({ query, page }) =>
  axios.get(`${BASE_URL}/search/book?query=${query}&page=${page}`);
