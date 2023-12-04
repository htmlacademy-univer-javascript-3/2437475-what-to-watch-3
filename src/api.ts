import axios from 'axios';
import { BASE_URL, API_TIMEOUT } from './constants';

export function createAPI() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
  });

  return api;
}

