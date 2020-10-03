import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_DEV_API;

export const login = (data) => axios.post('/api/login', data);

export const searchBook = ({ query, start }) =>
  axios.get(`${BASE_URL}/search/book?query=${query}&start=${start}`);
