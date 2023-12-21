import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { Review } from "../../mocks/reviews";

interface serverReview {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}

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
  
  export const postReview = createAsyncThunk('comments/postReview', async (data: {filmId: string; request: { comment: string; rating: number}}, {extra: api}) => {
    const apiInstance = api as AxiosInstance;
    const comment = data.request.comment;
    const rating = data.request.rating;
    const response = await apiInstance.post<serverReview>(`/comments/${data.filmId}`, {comment, rating});
  
    return response.data;
  });