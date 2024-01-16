import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch } from '..';
import { Film } from '../../types/films';
import { serverFilmsItem } from './api-actions-films';
import { setMyList, setLoading, setServerStatus } from '../reducer';

export const getMyList = createAsyncThunk('favorite/getMyList', async (_, {extra: api, dispatch}) => {
  const apiInstance = api as AxiosInstance;
  try {
    const response = await apiInstance.get('/favorite');

    const serverMyList: serverFilmsItem[] = await response.data as serverFilmsItem[];

    const films: Film[] = serverMyList.map((item: serverFilmsItem) => ({
      id: item.id ,
      name: item.name ,
      image: item.previewImage ,
      video: item.previewVideoLink ,
      genre: item.genre
    }));

    dispatch(setServerStatus(true));

    return films;
  } catch(error) {
    const status = (error as AxiosError).response?.status as number;
    if(status !== 401) {
      dispatch(setServerStatus(false));
    }
  }
  return undefined;
});

export const postFilmInMyList = createAsyncThunk('favorite/postFilmInMyList', async (data: {filmId: string; status: number}, {dispatch, extra: api}) => {
  const apiInstance = api as AxiosInstance;
  try {
    await apiInstance.post(`/favorite/${data.filmId}/${data.status}`);

    const myListServer = await dispatch(getMyList());
    const myList = myListServer.payload;

    dispatch(setMyList(myList as Film[]));
    dispatch(setServerStatus(true));

    return myList as Film[];
  } catch(error) {
    const status = (error as AxiosError).response?.status as number;
    if(status !== 400 && status !== 401 && status !== 404 && status !== 409) {
      dispatch(setServerStatus(false));
    }
  }
});

export const fetchMyList = createAsyncThunk<
Film[],
undefined,
{dispatch: AppDispatch }
>('films/fetchMyList', async (_, { dispatch }) => {
  dispatch(setLoading(true));

  const serverList = await dispatch(getMyList());
  const list = serverList.payload as Film[];
  dispatch(setMyList(list));

  dispatch(setLoading(false));

  return list;
});
