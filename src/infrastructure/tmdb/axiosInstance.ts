import axios from 'axios';
import { config } from '../../config/config.js';

export const axiosInstance = axios.create({
  baseURL: config.TMDB.BASE_URL,
  params: {
    api_key: config.TMDB.API_KEY,
  },
});
