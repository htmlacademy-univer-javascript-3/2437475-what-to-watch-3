import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Film } from '../../types/films';
import { getMyList } from './api-actions-favorite';
import { setMyList, setServerStatus, updateAuthorizationStatus } from '../reducer';

interface serverSignInRequest {
    name: string;
    avatarUrl: string;
    email: string;
    token: string;
}

export const getAuthStatus = createAsyncThunk('user/getLogin', async(token: string, { extra: api, dispatch }) => {
  const apiInstance = api as AxiosInstance;
  try {
    const response = await apiInstance.get('/login', token as AxiosRequestConfig);
    dispatch(updateAuthorizationStatus(true));

    dispatch(setServerStatus(true));
    return response;
  } catch (error) {
    const status = (error as AxiosError).response?.status as number;
    if (status !== 401) {
      dispatch(setServerStatus(false));
    }
    return undefined;
  }
});

export const signIn = createAsyncThunk('user/signIn', async (data: {email: string; password: string}, {extra: api, dispatch}) => {
  const apiInstance = api as AxiosInstance;
  try {
    const response = await apiInstance.post<serverSignInRequest>('/login', data);
    if (response.status === 201) {
      dispatch(updateAuthorizationStatus(true));
      localStorage.setItem('token', response.data.token);
      const list = await dispatch(getMyList());
      dispatch(setMyList(list.payload as Film[]));

      dispatch(setServerStatus(true));
      return response.data;
    }
  } catch(error) {
    const status = (error as AxiosError).response?.status as number;
    if (status !== 400) {
      dispatch(setServerStatus(false));
    }
  }

  return undefined;
});

export const signOut = createAsyncThunk('user/signOut', async (_, {extra: api, dispatch}) => {
  const apiInstance = api as AxiosInstance;
  try {
    const request = await apiInstance.delete('/logout');
    if (request.status === 204) {
      localStorage.removeItem('token');
      dispatch(updateAuthorizationStatus(false));

      dispatch(setServerStatus(true));
    }
    return request;
  } catch(error) {
    dispatch(setServerStatus(false));
  }
});

