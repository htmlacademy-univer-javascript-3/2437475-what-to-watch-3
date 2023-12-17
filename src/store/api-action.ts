import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Film } from '../mocks/films';
import { Detail } from '../mocks/details';
import { Review } from '../mocks/reviews';
import { AppDispatch } from '.';
import { ALL_GENRES, changeGenre, setFilms, setLoading, setMyList, updateAuthorizationStatus } from './reducer';

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

interface serverReview {
  id: string;
date: string;
user: string;
comment: string;
rating: number;
}

interface serverSignInRequest {
    name: string;
    avatarUrl: string;
    email: string;
    token: string;
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
    video: serverResponce.videoLink,
    isFavorite: serverResponce.isFavorite
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
    rating: serverPromoDetailResponse.rating,
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

export const getMyList = createAsyncThunk('films/getMyList', async (_, {extra: api}) => {
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

export const postFilmInMyList = createAsyncThunk('films/postFilmInMyList', async (data: {filmId: string; status: number}, {dispatch, extra: api}) => {
  const apiInstance = api as AxiosInstance;
  await apiInstance.post(`/favorite/${data.filmId}/${data.status}`);

  const myListServer = await dispatch(getMyList());
  const myList = myListServer.payload;

  dispatch(setMyList(myList as Film[]));

  return myList as Film[];

});

export const getReviews = createAsyncThunk('comments/getReviews', async (filmId: string, {extra: api}) => {
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.get(`/comments/${filmId}`);

  const serverReviewsResponse: serverReview[] = await response.data as serverReview[];

  const reviews: Review[] = serverReviewsResponse.map((item: serverReview) => ({
    id: item.id,
    filmId: filmId,
    rating: item.rating,
    author: item.user,
    text: item.comment,
    reviewDate: item.date
  }));

  return reviews;
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


export const getAuthStatus = createAsyncThunk('user/getLogin', async(token: string, { extra: api, dispatch }) => {
  const apiInstance = api as AxiosInstance;
  //console.log(typeof token);
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

export const postReview = createAsyncThunk('comments/postReview', async (data: {filmId: string; request: { comment: string; rating: number}}, {extra: api}) => {
  const apiInstance = api as AxiosInstance;
  const comment = data.request.comment;
  const rating = data.request.rating;
  const response = await apiInstance.post<serverReview>(`/comments/${data.filmId}`, {comment, rating});

  return response.data;
});
