import { render } from '@testing-library/react';
import { Review } from '../../types/reviews';
import { ReviewCard, ReviewCards } from './review-card';

const mockReview: Review = {
  id: '1',
  filmId: '1',
  rating: 5,
  author: 'John Doe',
  text: 'Great movie!',
  reviewDate: '2022-01-01',
};

const mockReviews: Review[] = [
  {
    id: '1',
    filmId: '1',
    rating: 5,
    author: 'John Doe',
    text: 'Great movie!',
    reviewDate: '2022-01-01',
  },
  {
    id: '2',
    filmId: '1',
    rating: 4,
    author: 'Jane Smith',
    text: 'Awesome film!',
    reviewDate: '2022-02-02',
  },
];

test('renders review text correctly', () => {
  const { getByText } = render(<ReviewCard review={mockReview} />);
  const reviewTextElement = getByText(/Great movie!/i);
  expect(reviewTextElement).toBeInTheDocument();
});

test('renders review author correctly', () => {
  const { getByText } = render(<ReviewCard review={mockReview} />);
  const reviewAuthorElement = getByText(/John Doe/i);
  expect(reviewAuthorElement).toBeInTheDocument();
});

test('renders review rating correctly', () => {
  const { getByText } = render(<ReviewCard review={mockReview} />);
  const reviewRatingElement = getByText(/5/i);
  expect(reviewRatingElement).toBeInTheDocument();
});

test('renders correct number of reviews', () => {
  const { getAllByTestId } = render(<ReviewCards reviews={mockReviews}> </ReviewCards>);
  const reviewElements = getAllByTestId('review-card');
  expect(reviewElements.length).toBe(mockReviews.length);
});

