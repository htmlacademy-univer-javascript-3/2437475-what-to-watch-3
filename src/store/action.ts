import { createAction } from '@reduxjs/toolkit';
import { Film } from '../mocks/films';
import { Detail } from '../mocks/details';

export const changeGenre = createAction<string>('changeGenre');
export const setFilms = createAction<Film[]>('setFilms');
export const setDetails = createAction<Detail>('setDetails');
export const setLoading = createAction<boolean>('setLoading');

// export const setErrorMessage = createAction('SET_ERROR_MESSAGE', (message: string) => ({
//     payload: message,
//    }));
