import { render } from '@testing-library/react';
import { DetailsTab } from './tab-details';

describe('DetailsTab', () => {
  const detail = {
    filmId: '1',
    director: 'Director Name',
    actors: ['Actor 1', 'Actor 2'],
    duration: {
      hours: 2,
      minutes: 30
    },
    genre: 'Action',
    year: 2021,
    poster: 'poster.jpg',
    bigImage: 'bigImage.jpg',
    description: 'Film description',
    rating: 8.5,
    ratingDescription: 'Very good',
    votes: 1000,
    video: 'video.mp4',
    isFavorite: true
  };

  test('renders director information', () => {
    const { getByText } = render(<DetailsTab detail={detail} />);
    const directorName = getByText('Director');
    const directorValue = getByText('Director Name');
    expect(directorName).toBeInTheDocument();
    expect(directorValue).toBeInTheDocument();
  });

  test('renders starring information', () => {
    const { getByText } = render(<DetailsTab detail={detail} />);
    const starring = getByText('Starring');
    const actor1 = getByText('Actor 1');
    const actor2 = getByText('Actor 2');
    expect(starring).toBeInTheDocument();
    expect(actor1).toBeInTheDocument();
    expect(actor2).toBeInTheDocument();
  });

  test('renders run time information', () => {
    const { getByText } = render(<DetailsTab detail={detail} />);
    const runTime = getByText('Run Time');
    const runTimeValue = getByText('2h 30m');
    expect(runTime).toBeInTheDocument();
    expect(runTimeValue).toBeInTheDocument();
  });

  test('renders genre information', () => {
    const { getByText } = render(<DetailsTab detail={detail} />);
    const genre = getByText('Genre');
    const genreValue = getByText('Action');
    expect(genre).toBeInTheDocument();
    expect(genreValue).toBeInTheDocument();
  });

  test('renders release year information', () => {
    const { getByText } = render(<DetailsTab detail={detail} />);
    const releaseYear = getByText('Released');
    const releaseYearValue = getByText('2021');
    expect(releaseYear).toBeInTheDocument();
    expect(releaseYearValue).toBeInTheDocument();
  });
});
