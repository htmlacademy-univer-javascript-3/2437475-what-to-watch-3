import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from '../store/reducer';
import { AppRoute } from './app';
import { AppDispatch } from '../store';
import { postReview } from '../store/api-action';
import { PageNotFound } from './pages/not-found-page';

export function AddReviewForm() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];

  const films = useSelector((state: AppState) => state.films);
  const film = films.find((filmInFilms) => filmInFilms.id === filmId);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewPosted, setReviewPosted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (reviewPosted) {
      navigate(`${AppRoute.FilmPage}=${filmId as string}`);
    }
  }, [filmId, reviewPosted, navigate]);

  if (!film || !filmId) {
    return <PageNotFound/>;
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (!filmId || !film || !reviewText || !rating) {
        return null;
      }

      if (reviewText.length < 50) {
        // console.error('Minimum 50 characters required');
        return null;
      }

      if (rating < 1 || rating > 10) {
        // console.error('Incorrect rating');
        return null;
      }

      const data = {
        filmId: filmId,
        request: {
          comment: reviewText,
          rating: rating
        }
      };
      await dispatch(postReview(data));
    } catch(error) {
      //
    } finally {
      setReviewPosted(true);
    }
  }

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value, 10));
  };

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
    </form>
  );
}
