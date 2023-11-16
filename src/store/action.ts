import { createAction } from '@reduxjs/toolkit';
import { Film } from '../mocks/films';

export const changeGenre = createAction<string>('changeGenre');
export const setFilms = createAction<Film[]>('setFilms');
