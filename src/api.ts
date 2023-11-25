import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://13.design.pages.academy/wtw';
const API_TIMEOUT = 5000;

export function createAPI() {
 const api = axios.create({
   baseURL: BASE_URL,
   timeout: API_TIMEOUT,
 });

 return api;
};

export const getFilms = createAsyncThunk('films/getFilms', async (_, { extra: api }) => {
    const apiInstance = api as AxiosInstance;
    const response = await apiInstance.get('/films');
    return response.data;
   });

export const getFilm = createAsyncThunk('films/getFilm', async (filmId: string, { extra: api }) => {
    const apiInstance = api as AxiosInstance;
    const response = await apiInstance.get(`/films/${filmId}`);
    return response.data;
   });