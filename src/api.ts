import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = 'https://13.design.pages.academy/wtw';
export const API_TIMEOUT = 5000;

export function createAPI() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (!config.headers) {
        config.headers = {};
      }
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['X-Token'] = token;
      }
      return config;
    },
  );

  return api;
}

/**
 * Argument of type '(config: AxiosRequestConfig) => AxiosRequestConfig<any>' is not assignable to parameter of type '(value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>'.
  Type 'AxiosRequestConfig<any>' is not assignable to type 'InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>'.
    Type 'AxiosRequestConfig<any>' is not assignable to type 'InternalAxiosRequestConfig<any>'.
      Types of property 'headers' are incompatible.
        Type 'AxiosHeaders | (Partial<RawAxiosHeaders & { Accept: AxiosHeaderValue; "Content-Length": AxiosHeaderValue; "User-Agent": AxiosHeaderValue; "Content-Encoding": AxiosHeaderValue; Authorization: AxiosHeaderValue; } & { ...; }> & Partial<...>) | undefined' is not assignable to type 'AxiosRequestHeaders'.
          Type 'undefined' is not assignable to type 'AxiosRequestHeaders'.
            Type 'undefined' is not assignable to type 'Partial<RawAxiosHeaders & { Accept: AxiosHeaderValue; "Content-Length": AxiosHeaderValue; "User-Agent": AxiosHeaderValue; "Content-Encoding": AxiosHeaderValue; Authorization: AxiosHeaderValue; } & { ...; }>'.ts(2345)

 */
