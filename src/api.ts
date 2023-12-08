import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, API_TIMEOUT } from './constants';
import store from './store';

export function createAPI() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = store.getState().token;
      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }
      return config;
    },
  );

  return api;
}

