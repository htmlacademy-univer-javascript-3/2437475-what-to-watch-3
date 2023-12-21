import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Film } from '../../mocks/films';
import { Detail } from '../../mocks/details';
import { AppDispatch } from '..';
import { ALL_GENRES, changeGenre, setFilms, setLoading } from '../reducer';
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

export const getFilms = createAsyncThunk('films/getFilms', async (_, { extra: api }) => {
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.get('/films');

  const serverFilmsResponse: serverFilmsItem[] = await response.data as serverFilmsItem[];

  const films: Film[] = serverFilmsResponse.map((item: serverFilmsItem) => ({
    id: item.id ,
    name: item.name ,
    image: item.previewImage ,
    video: item.previewVideoLink ,
    genre: item.genre
  }));

  return films;
});

export const getFilm = createAsyncThunk('films/getFilm', async (filmId: string, { extra: api }) => {
  if (!filmId) {
    return null;
  }
  const apiInstance = api as AxiosInstance;
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

  return detail;
});

export const getPromoFilm = createAsyncThunk('films/getPromoFilm', async (_, {extra: api}) => {
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.get('/promo');

  const serverPromoResponse: serverPromo = await response.data as serverPromo;

  const promo: Film = {
    id: serverPromoResponse.id,
    name: serverPromoResponse.name,
    image: serverPromoResponse.posterImage,
    video: serverPromoResponse.videoLink,
    genre: serverPromoResponse.genre
  };

  const responseDetail = await apiInstance.get(`/films/${promo.id}`);

  const serverPromoDetailResponse: serverFilm = await responseDetail.data as serverFilm;

  const promoDetail: Detail = {
    filmId: serverPromoDetailResponse.id,
    genre: serverPromoDetailResponse.genre,
    year:  serverPromoDetailResponse.released ,
    director: serverPromoDetailResponse.director,
    actors: serverPromoDetailResponse.starring,
    duration: {
      hours: Math.floor(serverPromoDetailResponse.runTime / 60) ,
      minutes: serverPromoDetailResponse.runTime % 60
    },
    poster: serverPromoDetailResponse.posterImage,
    bigImage: serverPromoDetailResponse.backgroundImage,
    description: serverPromoDetailResponse.description,
    rating: parseFloat(serverPromoDetailResponse.rating.toFixed(1)),
    ratingDescription: getRatingDescription(serverPromoDetailResponse.rating) as string,
    votes: serverPromoDetailResponse.scoresCount,
    video: serverPromoDetailResponse.videoLink,
    isFavorite: serverPromoDetailResponse.isFavorite
  };

  return [promo, promoDetail];

});

export const getSimilarFilms = createAsyncThunk('films/getSimilarFilms', async (filmId: string, {extra: api}) => {
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.get(`/films/${filmId}/similar`);

  const serverSimilarFilmsResponse: serverFilmsItem[] = await response.data as serverFilmsItem[];

  const films: Film[] = serverSimilarFilmsResponse.map((item: serverFilmsItem) => ({
    id: item.id ,
    name: item.name ,
    image: item.previewImage ,
    video: item.previewVideoLink ,
    genre: item.genre
  }));

  return films;
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

