import {ReactNode} from 'react';
import { Review } from '../../types/reviews';

enum Months {
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
}

type PropsReviewCard = {
    review: Review;
}

type reviewsListProps = {
    reviews: Review[];
    children: ReactNode;
}

export function ReviewCard({review}: PropsReviewCard) {
  const reviewDate = (new Date(review.reviewDate)).toLocaleDateString();
  const parts = reviewDate.split('.');
  const year = parts[2];
  const month = Number(parts[1]) - 1;
  const day = parts[0];
  
  const monthName = Months[month];
  
  const formattedDate = `${monthName} ${day}, ${year}`;
  return (
    <div className="review" data-testid="review-card">
      <blockquote className="review__quote">
        <p className="review__text">{review.text}</p>

        <footer className="review__details">
          <cite className="review__author">{review.author}</cite>
          <time className="review__date" dateTime={(new Date(review.reviewDate)).toLocaleDateString()}>
            {formattedDate}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export function ReviewCards({reviews, children}: reviewsListProps) {
  return (
    <div className="film-card__reviews-col">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
      {children}
    </div>
  );
}
