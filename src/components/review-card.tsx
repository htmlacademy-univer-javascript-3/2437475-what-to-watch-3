import {ReactNode} from 'react';
import { Review } from '../mocks/reviews';

type PropsReviewCard = {
    review: Review;
}

type reviewsListProps = {
    reviews: Review[];
    children: ReactNode;
}

export function ReviewCard({review}: PropsReviewCard) {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.text}</p>

        <footer className="review__details">
          <cite className="review__author">{review.author}</cite>
          <time className="review__date" dateTime={review.reviewDate.getDate().toString()}>{review.reviewDate.getDate()}</time>
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
