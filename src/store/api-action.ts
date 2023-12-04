import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Film } from '../mocks/films';
import { Detail } from '../mocks/details';
import { setLoading, setFilms, changeGenre, updateAuthorizationStatus, setToken } from './action';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '.';

interface serverFilmsItem {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
}

interface serverFilm {
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

function getRatingDescription(rating: number) {
  switch (true) {
    case (rating >= 0 && rating < 3):
      return 'Bad';
    case (rating >= 3 && rating < 5):
      return 'Normal';
    case (rating >= 5 && rating < 8):
      return 'Good';
    case (rating >= 8 && rating < 10):
      return 'Very good';
    case (rating === 10):
      return 'Awesome';
    default:
      return 'Invalid rating';
  }
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

  const serverResponce: serverFilm = await response.data as serverFilm;

  const detail: Detail = {
    filmId: filmId,
    genre: serverResponce.genre,
    year:  serverResponce.released ,
    director: serverResponce.director ,
    actors: serverResponce.starring ,
    duration: {
      hours: Math.floor(serverResponce.runTime / 60) ,
      minutes: serverResponce.runTime % 60
    },
    poster: serverResponce.posterImage,
    bigImage: serverResponce.backgroundImage,
    description: serverResponce.description ,
    rating: serverResponce.rating ,
    ratingDescription: getRatingDescription(serverResponce.rating) as string,
    votes: serverResponce.scoresCount, 
    video: serverResponce.videoLink
  };

  return detail;
});

export const getPromoFilm = createAsyncThunk('films/getPromoFilm', async (_, {extra: api}) => {
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.get('/promo');

  const serverPromoResponce: serverPromo = await response.data as serverPromo;

  const promo: Film = {
    id: serverPromoResponce.id,
    name: serverPromoResponce.name,
    image: serverPromoResponce.posterImage,
    video: serverPromoResponce.videoLink,
    genre: serverPromoResponce.genre
  };

  const promoDetail: Detail = {
    filmId: serverPromoResponce.id,
    genre: serverPromoResponce.genre,
    year:  serverPromoResponce.released ,
    director: '',
    actors: [],
    duration: {
      hours: 0 ,
      minutes: 0
    },
    poster: serverPromoResponce.posterImage,
    bigImage: serverPromoResponce.backgroundImage,
    description: '',
    rating: 0,
    ratingDescription: '',
    votes: 0,
    video: serverPromoResponce.videoLink
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
})

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const serverPromoResponces = await dispatch(getFilms());
    const films = serverPromoResponces.payload as Film[];

    dispatch(setFilms(films));
    dispatch(changeGenre('All genres'));

    dispatch(setLoading(false));
  }
);

export const getAuthStatus = createAsyncThunk('user/getLogin', async(token: string, { extra: api }) => {
  const apiInstance = api as AxiosInstance;
  try {
    const response = await apiInstance.get('/login', token as AxiosRequestConfig);
    return response;
  } catch (error) {
    // alert('Sorry, auth not auth');
    return undefined;
  }
});

export const signIn = createAsyncThunk('user/signIn', async(data: {email: string; password: string}, { extra: api }) => {
  const dispatch = useDispatch<AppDispatch>();
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.post('/login', data);
  if (response.status === 200) {
    dispatch(updateAuthorizationStatus(true));
    dispatch(setToken(response.data.token as string));
    return response.data;
  }

  return undefined;
});
