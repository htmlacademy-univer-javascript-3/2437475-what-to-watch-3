import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Film } from '../mocks/films';
import { Detail } from '../mocks/details';

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
  // console.log(response);

  const serverFilmsResponse: serverFilmsItem[] = await response.data as serverFilmsItem[];

  const films: Film[] = serverFilmsResponse.map((item: serverFilmsItem) => ({
    id: item.id ,
    name: item.name ,
    image: item.previewImage ,
    video: item.previewVideoLink ,
    genre: item.genre
  }));

  // console.log(films);

  return films;
});

export const getFilm = createAsyncThunk('films/getFilm', async (filmId: string, { extra: api }) => {
  if (!filmId) {
    return null;
  }
  const apiInstance = api as AxiosInstance;
  const response = await apiInstance.get(`/films/${filmId}`);

  const loadingFilm: serverFilm = await response.data as serverFilm;

  const detail: Detail = {
    filmId: filmId,
    genre: loadingFilm.genre,
    year:  loadingFilm.released ,
    director: loadingFilm.director ,
    actors: loadingFilm.starring ,
    duration: {
      hours: Math.floor(loadingFilm.runTime / 60) ,
      minutes: loadingFilm.runTime % 60
    },
    bigImage: loadingFilm.backgroundImage,
    description: loadingFilm.description ,
    rating: loadingFilm.rating ,
    ratingDescription: getRatingDescription(loadingFilm.rating) as string,
    votes: loadingFilm.scoresCount
  };

  return detail;
});
