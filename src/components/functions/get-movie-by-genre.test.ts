import { getMoviesByGenre } from './get-movie-by-genre';

describe('getMoviesByGenre', () => {
  const films = [
    { id: '1', name: 'Film 1', image: 'film1.jpg', video: 'film1.mp4', genre: 'Ужасы' },
    { id: '2', name: 'Film 2', image: 'film2.jpg', video: 'film2.mp4', genre: 'Ужасы' },
    { id: '3', name: 'Film 3', image: 'film3.jpg', video: 'film3.mp4', genre: 'Комедия' },
    { id: '4', name: 'Film 4', image: 'film4.jpg', video: 'film4.mp4', genre: 'Драма' }
  ];

  it('should return all films when genre is "All genres"', () => {
    const genre = 'All genres';
    const result = getMoviesByGenre(films, genre);
    expect(result).toEqual(films);
  });

  it('should return films with specified genre', () => {
    const genre = 'Ужасы';
    const result = getMoviesByGenre(films, genre);
    const expected = [
      { id: '1', name: 'Film 1', image: 'film1.jpg', video: 'film1.mp4', genre: 'Ужасы' },
      { id: '2', name: 'Film 2', image: 'film2.jpg', video: 'film2.mp4', genre: 'Ужасы' }
    ];
    expect(result).toEqual(expected);
  });

  it('should return an empty array when there are no films with specified genre', () => {
    const genre = 'Фантастика';
    const result = getMoviesByGenre(films, genre);
    expect(result).toEqual([]);
  });
});
