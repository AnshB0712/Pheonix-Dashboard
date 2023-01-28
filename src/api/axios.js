import axios from 'axios';

export const BASE_URL = 'https://pheonix-server-two.onrender.com';

const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default customAxios;
