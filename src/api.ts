import axios, { AxiosRequestConfig } from 'axios';
import store from './store';

export const BASE_URL = 'https://13.design.pages.academy/wtw';
export const API_TIMEOUT = 5000;

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

