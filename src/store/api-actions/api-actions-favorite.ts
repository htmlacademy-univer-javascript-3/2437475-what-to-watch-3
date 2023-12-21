import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch } from '..';
import { Film } from '../../mocks/films';
import { serverFilmsItem } from './api-actions-films';
import { setMyList, setLoading } from '../reducer';

export const getMyList = createAsyncThunk('favorite/getMyList', async (_, {extra: api}) => {
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.get('/favorite');

  const serverMyList: serverFilmsItem[] = await response.data as serverFilmsItem[];

  const films: Film[] = serverMyList.map((item: serverFilmsItem) => ({
    id: item.id ,
    name: item.name ,
    image: item.previewImage ,
    video: item.previewVideoLink ,
    genre: item.genre
  }));

  return films;
});

export const postFilmInMyList = createAsyncThunk('favorite/postFilmInMyList', async (data: {filmId: string; status: number}, {dispatch, extra: api}) => {
  const apiInstance = api as AxiosInstance;
  await apiInstance.post(`/favorite/${data.filmId}/${data.status}`);

  const myListServer = await dispatch(getMyList());
  const myList = myListServer.payload;

  dispatch(setMyList(myList as Film[]));

  return myList as Film[];
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
