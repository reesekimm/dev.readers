import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_DEV_API;

export const login = (data) => axios.post('/api/login', data);

export const addReview = (data) => axios.post(`${BASE_URL}/review`, data);
export const getReview = ({ id, isbn13 }) =>
  axios.get(`${BASE_URL}/review?id=${id}&isbn13=${isbn13}`);

export const searchBook = ({ query, page }) =>
  axios.get(`${BASE_URL}/search/book?query=${query}&page=${page}`);
