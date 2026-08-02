import axios from 'axios';

// TODO: Configure axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});
