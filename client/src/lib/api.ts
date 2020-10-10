import axios from 'axios';

import { IReview } from '@types';

const BASE_URL = process.env.NEXT_PUBLIC_DEV_API;

export const login = (data) => axios.post('/api/login', data);

export const addReview = (review) => axios.post(`${BASE_URL}/review`, review);

export const editReview = ({ id, rating, content }) =>
  axios.patch(`${BASE_URL}/review/${id}`, { rating, content });

export const deleteReview = (id: IReview.ReviewId) => axios.delete(`${BASE_URL}/review/${id}`);

export const addLike = (id: IReview.ReviewId) => axios.patch(`${BASE_URL}/review/${id}/like`);
export const cancelLike = (id: IReview.ReviewId) => axios.delete(`${BASE_URL}/review/${id}/like`);

export const getReview = ({ id, isbn13 }) =>
  axios.get(`${BASE_URL}/review?id=${id}&isbn13=${isbn13}`);

export const searchBook = ({ query, page }) =>
  axios.get(`${BASE_URL}/search/book?query=${query}&page=${page}`);
