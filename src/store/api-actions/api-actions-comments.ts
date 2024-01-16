import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { Review } from '../../types/reviews';
import { setServerStatus } from '../reducer';

interface serverReview {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}

export const getReviews = createAsyncThunk('comments/getReviews', async (filmId: string, {extra: api, dispatch}) => {
  const apiInstance = api as AxiosInstance;
  try {
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

  dispatch(setServerStatus(true));

  return reviews;
} catch(error) {
  const status = (error as AxiosError).response?.status as number;
    if(status !== 404) {
      dispatch(setServerStatus(false));
    }
  }
  return undefined;
});

export const postReview = createAsyncThunk('comments/postReview', async (data: {filmId: string; request: { comment: string; rating: number}}, {extra: api, dispatch}) => {
  const apiInstance = api as AxiosInstance;
  try {
  const comment = data.request.comment;
  const rating = data.request.rating;
  const response = await apiInstance.post<serverReview>(`/comments/${data.filmId}`, {comment, rating});
    
  dispatch(setServerStatus(true));
  return response.data;
  } catch(error) {
    const status = (error as AxiosError).response?.status as number;
    if(status !== 404 && status !== 401 && status !== 400 ) {
      dispatch(setServerStatus(false));
    }
  }
  return undefined;
});
