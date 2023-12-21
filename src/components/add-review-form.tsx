import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from '../store/reducer';
import { AppRoute } from './app';
import { AppDispatch } from '../store';
import { PageNotFound } from './pages/not-found-page';
import { createSelector } from '@reduxjs/toolkit';
import { postReview } from '../store/api-actions/api-actions-comments';

enum ReviewLength {
  Min = 50,
  Max = 400
}

enum StarsCount {
  Max = 10,
  Min = 1
}

export function AddReviewForm() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];

  const filmSelector = useMemo(() =>
    createSelector(
      (state: AppState) => state.films,
      (films) => films.find((filmInFilms) => filmInFilms.id === filmId)
    ),
  [filmId]
  );
  const film = useSelector(filmSelector);


  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewPosted, setReviewPosted] = useState(false);
  const [errorMessage, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (reviewPosted) {
      navigate(`${AppRoute.FilmPage}=${filmId as string}`);
    }
  }, [filmId, reviewPosted, navigate]);

  const handleRatingChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value, 10));
  }, []);

  const submitReview = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!filmId || !film || !reviewText || !rating) {
        return;
      }

      if (reviewText.length < ReviewLength.Min || reviewText.length > ReviewLength.Max) {
        setError(`Minimum ${ReviewLength.Min} and maximum ${ReviewLength.Max} characters required`);
        return;
      }

      if (rating < StarsCount.Min || rating > StarsCount.Max) {
        setError('Incorrect rating');
        return;
      }

      const data = {
        filmId: filmId,
        request: {
          comment: reviewText,
          rating: rating
        }
      };
      dispatch(postReview(data));
      setReviewPosted(true);
    } catch (error) {
      setError('Failed to post review');
    } finally {
      // setReviewPosted(true);
    }
  }, [dispatch, filmId, film, reviewText, rating]);

  if (!film || !filmId) {
    return <PageNotFound/>;
  }

  if(reviewPosted) {
    return null;
  }

  return (
    <form className="add-review__form" onSubmit={submitReview}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" checked={rating === 10} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" checked={rating === 9} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" checked={rating === 8} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" checked={rating === 7} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" checked={rating === 6} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" checked={rating === 5} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" checked={rating === 4} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked={rating === 3} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" checked={rating === 2} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" checked={rating === 1} onChange={handleRatingChange} />
          <label className="rating__label" htmlFor="star-1">Rating 1 </label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={reviewPosted}>Post</button>
        </div>
      </div>
      {(
        <div style={{ textAlign: 'center' }}>
          <p style={{color: 'darkpink'}}>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
