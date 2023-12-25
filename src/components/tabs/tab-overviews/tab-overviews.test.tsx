import { render } from '@testing-library/react';
import { OverviewTab } from './tab-overviews';

const overview = {
  filmId: '1',
  director: 'John Doe',
  actors: ['Actor 1', 'Actor 2'],
  duration: {
    hours: 2,
    minutes: 30,
  },
  genre: 'Action',
  year: 2021,
  poster: 'poster.jpg',
  bigImage: 'bigImage.jpg',
  description: 'Lorem ipsum dolor sit amet',
  rating: 8.5,
  ratingDescription: 'Very good',
  votes: 100,
  video: 'video.mp4',
  isFavorite: true,
};

test('renders correct overview information', () => {
  const { getByText } = render(<OverviewTab overview={overview} />);

  expect(getByText(overview.rating.toString())).toBeInTheDocument();
  expect(getByText(overview.ratingDescription)).toBeInTheDocument();
  expect(getByText(`${overview.votes} ratings`)).toBeInTheDocument();
  expect(getByText(overview.description)).toBeInTheDocument();
  expect(getByText(`Director: ${overview.director}`)).toBeInTheDocument();

  overview.actors.forEach((actor) => {
    expect(getByText(actor)).toBeInTheDocument();
  });
});
