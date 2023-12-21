import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Film } from "../../mocks/films";
import { getMyList } from "./api-actions-films";
import { updateAuthorizationStatus, setMyList } from "../reducer";

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
      return response;
    } catch (error) {
      return undefined;
    }
  });
  
  export const signIn = createAsyncThunk('user/signIn', async (data: {email: string; password: string}, {extra: api, dispatch}) => {
    const apiInstance = api as AxiosInstance;
    const response = await apiInstance.post<serverSignInRequest>('/login', data);
    if (response.status === 201) {
      dispatch(updateAuthorizationStatus(true));
      localStorage.setItem('token', response.data.token);
      const list = await dispatch(getMyList());
      dispatch(setMyList(list.payload as Film[]));
      return response.data;
    }
  
    return undefined;
  });
  
  export const signOut = createAsyncThunk('user/signOut', async (_, {extra: api, dispatch}) => {
    const apiInstance = api as AxiosInstance;
    const request = await apiInstance.delete('/logout');
    if (request.status == 204) {
      localStorage.removeItem('token');
      dispatch(updateAuthorizationStatus(false));
    }
    return request;
  })