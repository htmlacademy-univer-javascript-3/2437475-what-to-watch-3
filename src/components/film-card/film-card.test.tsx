import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from '../app';
import { Card, Cards } from './film-card';
import { Film } from '../../types/films';

describe('Card', () => {
  const film: Film = {
    id: '1',
    name: 'Film 1',
    image: 'image.jpg',
    video: 'video.mp4',
    genre: 'Drama'
  };

  it('renders correctly', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <Card film={film} />
      </Router>
    );

    expect(getByText(film.name)).toBeInTheDocument();
    expect(getByAltText(film.name)).toBeInTheDocument();
  });

  it('renders the correct link', () => {
    const { getByText } = render(
      <Router>
        <Card film={film} />
      </Router>
    );

    const link = getByText(film.name);
    expect(link.getAttribute('href')).toBe(`${AppRoute.FilmPage}=${film.id}`);
  });
});

describe('Cards', () => {
  const films: Film[] = [
    {
      id: '1',
      name: 'Film 1',
      image: 'image1.jpg',
      video: 'video1.mp4',
      genre: 'Drama'
    },
    {
      id: '2',
      name: 'Film 2',
      image: 'image2.jpg',
      video: 'video2.mp4',
      genre: 'Comedy'
    },
  ];

  it('renders correctly', () => {
    const { getByText, getAllByAltText } = render(
      <Router>
        <Cards films={films}> </Cards>
      </Router>
    );

    expect(getByText(films[0].name)).toBeInTheDocument();
    expect(getByText(films[1].name)).toBeInTheDocument();
    expect(getAllByAltText(/film/i)).toHaveLength(2);
  });
});
