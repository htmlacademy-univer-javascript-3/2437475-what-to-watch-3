import axios from 'axios';

const BASE_URL = 'https://13.design.pages.academy/wtw';
const API_TIMEOUT = 5000;

export function createAPI() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
  });

  return api;
}

