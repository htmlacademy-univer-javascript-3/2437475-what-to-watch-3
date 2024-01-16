import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { Film } from '../../types/films';
import { Detail } from '../../types/details';
import { AppDispatch } from '..';
import { ALL_GENRES, changeGenre, setFilms, setLoading, setServerStatus } from '../reducer';
import { getRatingDescription } from '../../components/functions/get-rating-description';

export interface serverFilmsItem {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
}

export interface serverFilm {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
    posterImage: string;
    backgroundImage: string;
    backgroundColor: string;
    videoLink: string;
    description: string;
    rating: number;
    scoresCount: number;
    director: string;
    starring: string[];
    runTime: number;
    released: number;
    isFavorite: boolean;
}

interface serverPromo {
    id: string;
    name: string;
    posterImage: string;
    backgroundImage: string;
    videoLink: string;
    genre: string;
    released: number;
    isFavorite: boolean;
}

export const getFilms = createAsyncThunk('films/getFilms', async (_, { extra: api, dispatch }) => {
  const apiInstance = api as AxiosInstance;
  try {
    const response = await apiInstance.get('/films');

    const serverFilmsResponse: serverFilmsItem[] = await response.data as serverFilmsItem[];

    const films: Film[] = serverFilmsResponse.map((item: serverFilmsItem) => ({
      id: item.id ,
      name: item.name ,
      image: item.previewImage ,
      video: item.previewVideoLink ,
      genre: item.genre
    }));

    dispatch(setServerStatus(true));

    return films;
  } catch(error) {
    dispatch(setServerStatus(false));
  }
  return undefined;
});

export const getFilm = createAsyncThunk('films/getFilm', async (filmId: string, { extra: api, dispatch }) => {
  if (!filmId) {
    return null;
  }
  const apiInstance = api as AxiosInstance;
  try {
    const response = await apiInstance.get(`/films/${filmId}`);

    const serverResponse: serverFilm = await response.data as serverFilm;

    const detail: Detail = {
      filmId: filmId,
      genre: serverResponse.genre,
      year:  serverResponse.released ,
      director: serverResponse.director ,
      actors: serverResponse.starring ,
      duration: {
        hours: Math.floor(serverResponse.runTime / 60) ,
        minutes: serverResponse.runTime % 60
      },
      poster: serverResponse.posterImage,
      bigImage: serverResponse.backgroundImage,
      description: serverResponse.description ,
      rating: parseFloat(serverResponse.rating.toFixed(1)),
      ratingDescription: getRatingDescription(serverResponse.rating) as string,
      votes: serverResponse.scoresCount,
      video: serverResponse.videoLink,
      isFavorite: serverResponse.isFavorite
    };

    dispatch(setServerStatus(true));

    return detail;
  } catch(error) {
    const status = (error as AxiosError).response?.status as number;
    if(status !== 404) {
      dispatch(setServerStatus(false));
    }
  }
  return undefined;
});

export const getPromoFilm = createAsyncThunk('films/getPromoFilm', async (_, {extra: api, dispatch}) => {
  const apiInstance = api as AxiosInstance;
  try{
    const response = await apiInstance.get('/promo');

    const serverPromoResponse: serverPromo = await response.data as serverPromo;

    const promo: Film = {
      id: serverPromoResponse.id,
      name: serverPromoResponse.name,
      image: serverPromoResponse.posterImage,
      video: serverPromoResponse.videoLink,
      genre: serverPromoResponse.genre
    };

    const promoDetail: Detail = {
      filmId: serverPromoResponse.id,
      genre: serverPromoResponse.genre,
      year:  serverPromoResponse.released ,
      director: '',
      actors: [],
      duration: {
        hours: 0,
        minutes: 0
      },
      poster: serverPromoResponse.posterImage,
      bigImage: serverPromoResponse.backgroundImage,
      description: '',
      rating: 0,
      ratingDescription: '',
      votes: 0,
      video: serverPromoResponse.videoLink,
      isFavorite: serverPromoResponse.isFavorite
    };

    dispatch(setServerStatus(true));

    return [promo, promoDetail];
  } catch(error) {
    dispatch(setServerStatus(false));
  }
  return undefined;

});

export const getSimilarFilms = createAsyncThunk('films/getSimilarFilms', async (filmId: string, {extra: api, dispatch}) => {
  const apiInstance = api as AxiosInstance;
  try {
    const response = await apiInstance.get(`/films/${filmId}/similar`);

    const serverSimilarFilmsResponse: serverFilmsItem[] = await response.data as serverFilmsItem[];

    const films: Film[] = serverSimilarFilmsResponse.map((item: serverFilmsItem) => ({
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
    if(status !== 404) {
      dispatch(setServerStatus(false));
    }
  }
  return undefined;
});

export const fetchFilms = createAsyncThunk<
  Film[],
  undefined,
  { dispatch: AppDispatch }
>('films/fetchFilms', async (_, { dispatch }) => {
  dispatch(setLoading(true));

  const serverFilmsResponse = await dispatch(getFilms());
  const films = serverFilmsResponse.payload as Film[];

  dispatch(setFilms(films));
  dispatch(changeGenre(ALL_GENRES));

  dispatch(setLoading(false));

  return films;
});

